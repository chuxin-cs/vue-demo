package com.chuxin.springadmin.common.config.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "security")
public class SecurityProperties {
    /**
     * 会话方式
     */
    private SessionProperty session;

    /**
     * JWT 配置
     */
    private JwtProperty jwt;

    /**
     * 白名单 URL 集合
     */
    private String[] ignoreUrls;

    private String[] unsecuredUrls;

    /**
     * 会话属性
     */
    @Data
    public static class SessionProperty {
        private String type;
    }

    /**
     * JWT 配置
     */
    @Data
    public static class JwtProperty {

        /**
         * JWT 密钥
         */
        private String key;

        /**
         * 访问令牌有效期(单位：秒)
         */
        private Integer accessTokenTimeToLive;

        /**
         * 刷新令牌有效期(单位：秒)
         */
        private Integer refreshTokenTimeToLive;

    }
}
