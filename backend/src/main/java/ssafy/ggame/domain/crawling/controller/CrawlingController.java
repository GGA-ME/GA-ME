package ssafy.ggame.domain.crawling.controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ssafy.ggame.domain.crawling.dto.HotTopicDto;
import ssafy.ggame.domain.crawling.service.CrawlingService;

import java.time.Duration;
import java.util.List;

@Controller
@RequestMapping("/api/crawling")
@RequiredArgsConstructor
public class CrawlingController {

    private final CrawlingService crawlingService;
    @GetMapping("/{keyword}")
    public ResponseEntity<Object> getCrawling(@PathVariable String keyword) {
        return this.crawlingService.getCrawlingData(keyword);
    }
}
