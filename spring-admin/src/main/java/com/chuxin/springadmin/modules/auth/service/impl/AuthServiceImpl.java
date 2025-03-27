package com.chuxin.springadmin.modules.auth.service.impl;

import cn.hutool.captcha.AbstractCaptcha;
import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.core.util.IdUtil;
import com.chuxin.springadmin.common.config.property.CaptchaProperties;
import com.chuxin.springadmin.common.constant.SecurityConstants;
import com.chuxin.springadmin.common.security.manager.TokenManager;
import com.chuxin.springadmin.common.security.model.AuthenticationToken;
import com.chuxin.springadmin.modules.auth.enums.CaptchaTypeEnum;
import com.chuxin.springadmin.modules.auth.model.CaptchaInfo;
import com.chuxin.springadmin.modules.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import cn.hutool.captcha.generator.CodeGenerator;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final TokenManager tokenManager;

    private final Font captchaFont;
    private final CodeGenerator codeGenerator;
    private final CaptchaProperties captchaProperties;
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 获取验证码
     *
     * @return 验证码
     */
    @Override
    public CaptchaInfo getCaptcha() {

        // 1、从配置中获取验证码类型
        String captchaType = captchaProperties.getType();
        // 2、从配置中获取验证码图片的宽度
        int width = captchaProperties.getWidth();
        // 3、从配置中获取验证码图片的高度
        int height = captchaProperties.getHeight();
        // 4、从配置中获取验证码图片的干扰线数量
        int interfereCount = captchaProperties.getInterfereCount();
        // 5、从配置中获取验证码的长度
        int codeLength = captchaProperties.getCode().getLength();

        // 声明一个抽象验证码对象
        AbstractCaptcha captcha;
        // 根据配置的验证码类型创建相应的验证码对象
        if (CaptchaTypeEnum.CIRCLE.name().equalsIgnoreCase(captchaType)) {
            // 创建圆形验证码
            captcha = CaptchaUtil.createCircleCaptcha(width, height, codeLength, interfereCount);
        } else if (CaptchaTypeEnum.GIF.name().equalsIgnoreCase(captchaType)) {
            // 创建GIF验证码
            captcha = CaptchaUtil.createGifCaptcha(width, height, codeLength);
        } else if (CaptchaTypeEnum.LINE.name().equalsIgnoreCase(captchaType)) {
            // 创建线条验证码
            captcha = CaptchaUtil.createLineCaptcha(width, height, codeLength, interfereCount);
        } else if (CaptchaTypeEnum.SHEAR.name().equalsIgnoreCase(captchaType)) {
            // 创建扭曲验证码
            captcha = CaptchaUtil.createShearCaptcha(width, height, codeLength, interfereCount);
        } else {
            // 如果配置的验证码类型不合法，抛出异常
            throw new IllegalArgumentException("Invalid captcha type: " + captchaType);
        }

        // 设置验证码的生成器
        captcha.setGenerator(codeGenerator);
        // 设置验证码文本的透明度
        captcha.setTextAlpha(captchaProperties.getTextAlpha());
        // 设置验证码的字体
        captcha.setFont(captchaFont);

        // 获取生成的验证码文本
        String captchaCode = captcha.getCode();
        // 获取验证码图片的Base64编码数据
        String imageBase64Data = captcha.getImageBase64Data();

        // 生成一个唯一的验证码键
        String captchaKey = IdUtil.fastSimpleUUID();
        // 将验证码文本缓存到Redis中，用于登录校验
        redisTemplate.opsForValue().set(SecurityConstants.CAPTCHA_CODE_PREFIX + captchaKey, captchaCode, captchaProperties.getExpireSeconds(), TimeUnit.SECONDS);

        // 返回
        return CaptchaInfo.builder().captchaKey(captchaKey).captchaBase64(imageBase64Data).build();
    }

    /**
     * 用户名密码登录
     *
     * @param username 用户名
     * @param password 密码
     * @return 访问令牌
     */
    @Override
    public AuthenticationToken login(String username, String password) {
        // 1. 创建用于密码认证的令牌（未认证）
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username.trim(), password);

        // 2. 执行认证（认证中）
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 3. 认证成功后生成 JWT 令牌，并存入 Security 上下文，供登录日志 AOP 使用（已认证）
        AuthenticationToken authenticationTokenResponse =
                tokenManager.generateToken(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authenticationTokenResponse;
    }
}
