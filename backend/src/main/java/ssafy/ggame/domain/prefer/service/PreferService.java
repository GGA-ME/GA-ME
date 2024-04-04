package ssafy.ggame.domain.prefer.service;

import ssafy.ggame.domain.prefer.dto.PreferRequestDto;

public interface PreferService {
    boolean savePrefer(PreferRequestDto requestDto);
    boolean deletePrefer(PreferRequestDto requestDto);

}
