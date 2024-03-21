package ssafy.ggame.domain.topic.service;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ssafy.ggame.domain.topic.dto.HotTopicDto;
import ssafy.ggame.global.common.BaseResponse;
import ssafy.ggame.global.common.StatusCode;
import ssafy.ggame.global.exception.BaseException;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
public class CrawlingService {

    public ResponseEntity<Object> getCrawlingData(String keyword){
        List<HotTopicDto> hotTopicDtoList = new ArrayList<>();

        try {
            ChromeOptions options = new ChromeOptions();
            options.addArguments("headless");

            System.out.println("Crawling Start: " + keyword);

            WebDriver driver = new ChromeDriver(options);

            // driver.get 하는 과정이 오래 걸림.. ㅠㅠ
            String URL = "https://www.gamemeca.com/search.php?gc=news&q=" + keyword;
            driver.get(URL);

            // 크롤링하려는 웹 페이지가 로딩 되는 시간을 기다림
            driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

            List<WebElement> news = driver.findElements(By.cssSelector("#content > div.news-list > div.content-left > ul > li"));
            for (WebElement n : news) {
                String link = n.findElement(By.cssSelector("a")).getAttribute("href");
                String img = n.findElement(By.cssSelector("a > img")).getAttribute("src");
                String title = n.findElement(By.cssSelector("div.cont_thumb > strong > a")).getText();
                String desc = n.findElement(By.cssSelector("div.desc_thumb")).getText();
                HotTopicDto hotTopicDto = HotTopicDto.builder()
                        .hotTopicLink(link)
                        .hotTopicImg(img)
                        .hotTopicTitle(title)
                        .hotTopicShortDesc(desc)
                        .build();

                hotTopicDtoList.add(hotTopicDto);
            }
            driver.quit();
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BaseException(StatusCode.CRAWLING_FAILED));
        }
        if(hotTopicDtoList.isEmpty()) throw new BaseException(StatusCode.CRAWLING_NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(hotTopicDtoList));

    }
}
