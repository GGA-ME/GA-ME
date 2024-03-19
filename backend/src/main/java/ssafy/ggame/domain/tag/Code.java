package ssafy.ggame.domain.tag;

public enum Code {
    // Category
    CAT("CAT", "카테고리"),

    // 장르
    GEN("GEN", "장르");

    private final String code;
    private String codeName;

    Code(String code, String codeName){
        this.code = code;
        this.codeName = codeName;
    }




}
