package ssafy.ggame.domain.crawling;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
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
public class CrawlingController {
    @GetMapping("/{keyword}")
    public void getCrawling(@PathVariable String keyword) {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless");

        System.out.println("Crawling Start: " + keyword);
        String URL = "https://www.gamemeca.com/search.php?gc=news&q=" + keyword;
        WebDriver driver = new ChromeDriver(options);
        driver.get(URL);
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
