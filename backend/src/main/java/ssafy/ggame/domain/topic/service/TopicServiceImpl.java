package ssafy.ggame.domain.topic.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.game.dto.GameSaleCardDto;
import ssafy.ggame.domain.game.repository.GameCustomRepository;
import ssafy.ggame.domain.prefer.repository.PreferCustomRepository;
import ssafy.ggame.domain.topic.dto.SaleGameDto;
import ssafy.ggame.domain.topic.dto.TopicNewsResDto;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {
    private final PreferCustomRepository preferRepository;
    private final GameCustomRepository gameCustomRepository;
    private final WebDriver driver;

    //선호 게임 기사 가져오기

    @Override
    public List<TopicNewsResDto> hotTopic(Integer userId) {
        List<String> preferGameNames = preferRepository.findPreferGameNames(userId);
        List<TopicNewsResDto> hotTopicDtoList = new ArrayList<>();
        if (preferGameNames.isEmpty()) {//선호 게임이 없으면
            //인기게임 10개 조회해서 가져옴
            //인기게임 추가 로직 필요
        } else {//있으면
            int size = preferGameNames.size();
            int newsSize = size > 10 ? 5 : 10;
            for (String gameName : preferGameNames) { //데이터 추가
                getCrawlingData(gameName, newsSize, hotTopicDtoList);
            }
        }
        //날짜기준 내림차순 정렬
        hotTopicDtoList.sort(Comparator.comparing(TopicNewsResDto::getHotTopicDate).reversed());

        return hotTopicDtoList;
    }

    @Override
    public List<SaleGameDto> salesInfo(Integer userId) {
        //repo에서 세일하는 게임들을 가져온다.
        Map<Integer, List<GameSaleCardDto>> saleGames = gameCustomRepository.findSaleGames(userId);
        List<SaleGameDto> result = new ArrayList<>();
        //SaleGameDto에 알맞게 담아냄
        saleGames.keySet().forEach(percent ->
                result.add(
                        SaleGameDto.builder()
                                .salePercent(percent)
                                .cardDtoList(saleGames.get(percent))
                                .build()
                )
        );
        return result;
    }

    //크롤링 데이터
    public void getCrawlingData(String keyword, int size, List<TopicNewsResDto> hotTopicDtoList) {
        try {
            //시작 URL
            String URL = "https://www.gamemeca.com/search.php?q=" + keyword;
            driver.get(URL);

            // 크롤링하려는 웹 페이지가 로딩 되는 시간을 기다림
            driver.manage().timeouts().implicitlyWait(Duration.ofMillis(10));


            // 게임 정보로 이동
            WebElement elements = driver.findElement(By.cssSelector("#content > div.news-list > div.content-left > ul.list_gamedata.search > li > a"));
            elements.click();

            //새창으로 이동
            changeWindow();

            //뉴스로 이동
            WebElement gameNew = driver.findElement(By.cssSelector("#content > div.content-left > div.db-sub-menu > ul > li:nth-child(2) > a"));
            gameNew.click();


            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");


            List<WebElement> news = driver.findElements(By.cssSelector("#content > div.content-left > div.news-list > ul > li"));
            for (int i = 0; i < size; i++) {
                WebElement n = news.get(i);
                String link = n.findElement(By.cssSelector("a")).getAttribute("href");
                String img = n.findElement(By.cssSelector("a > img")).getAttribute("src");
                String title = n.findElement(By.cssSelector("div.cont_thumb > strong > a")).getText();
                String desc = n.findElement(By.cssSelector("div.desc_thumb")).getText();
                String dateString = n.findElement(By.cssSelector("div.day_news")).getText();
                LocalDate date = LocalDate.parse(dateString, formatter);
                TopicNewsResDto hotTopicDto = TopicNewsResDto.builder()
                        .hotTopicLink(link)
                        .hotTopicImg(img)
                        .hotTopicTitle(title)
                        .hotTopicShortDesc(desc)
                        .hotTopicDate(date)
                        .build();
                hotTopicDtoList.add(hotTopicDto);
            }
        } catch (NoSuchElementException e) {
            return; //해당하는 요소들이 없으면 그냥 return
        } catch (Exception e) {
            throw new BaseException(StatusCode.CRAWLING_FAILED);
        }

    }

    private void changeWindow() {
        // 현재 창의 핸들을 저장
        String currentWindowHandle = driver.getWindowHandle();

        // 현재 창 닫기
        driver.close();

        Set<String> handles = driver.getWindowHandles();

        // 새로운 창으로 전환
        for (String handle : handles) {
            if (!handle.equals(currentWindowHandle)) {
                driver.switchTo().window(handle);
                break;
            }
        }
    }
}
