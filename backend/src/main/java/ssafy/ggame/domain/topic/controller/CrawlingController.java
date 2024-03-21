package ssafy.ggame.domain.topic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ssafy.ggame.domain.topic.service.CrawlingService;

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
