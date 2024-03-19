package ssafy.ggame.domain.userTag.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class UserTagId implements Serializable {
    private Integer userId;
    private Short tagId;

    // 기본 생성자, getters, setters, hashCode(), equals() 구현
}