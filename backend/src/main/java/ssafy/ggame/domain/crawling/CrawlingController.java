package ssafy.ggame.domain.crawling;

import lombok.RequiredArgsConstructor;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.Duration;
import java.util.List;

@Controller
@RequestMapping("/api/crawling")
@RequiredArgsConstructor
public class CrawlingController {
    // spring Bean으로 만들어서 스프링이 driver를 관리하게 만들어줌
    private final WebDriver driver;

    @GetMapping("/{keyword}")
    public void getCrawling(@PathVariable String keyword) {
        System.out.println("Crawling Start: " + keyword);
        String url = "https://www.gamemeca.com/search.php?gc=news&q=" + keyword;
        // driver.get 하는 과정이 오래 걸림.. ㅠㅠ
        driver.get(url);
        // 크롤링하려는 웹 페이지가 로딩 되는 시간을 기다림
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

        List<WebElement> news = driver.findElements(By.cssSelector("#content > div.news-list > div.content-left > ul > li"));
        StringBuilder sb = new StringBuilder();
        for(WebElement n: news){
            String link = n.findElement(By.cssSelector("a")).getAttribute("href");
            String img = n.findElement(By.cssSelector("a > img")).getAttribute("src");
            String title = n.findElement(By.cssSelector("div.cont_thumb > strong > a")).getText();
            String desc = n.findElement(By.cssSelector("div.desc_thumb")).getText();
            sb.append("링크: ").append(link).append("\n").append("썸네일: ").append(img).append("\n").append("제목: ").append(title).append("\n").append("내용: ").append(desc).append("\n");
            System.out.println(sb.toString());
            sb.setLength(0);
        }

        driver.quit();
    }
}
