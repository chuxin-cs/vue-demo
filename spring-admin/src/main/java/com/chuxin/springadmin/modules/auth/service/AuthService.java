package com.chuxin.springadmin.modules.auth.service;

import com.chuxin.springadmin.common.security.model.AuthenticationToken;
import com.chuxin.springadmin.modules.auth.model.CaptchaInfo;

public interface AuthService {
    /**
     * 获取验证码
     * @return 验证码
     */
    CaptchaInfo getCaptcha();

    /**
     * 登录
     *
     * @param username 用户名
     * @param password 密码
     * @return 登录结果
     */
    AuthenticationToken login(String username, String password);
}
