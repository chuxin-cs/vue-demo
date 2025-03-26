package com.chuxin.springadmin.modules.auth.service;

import com.chuxin.springadmin.common.result.R;
import com.chuxin.springadmin.modules.auth.model.CaptchaInfo;

public interface AuthService {
    /**
     * 获取验证码
     * @return 验证码
     */
    CaptchaInfo getCaptcha();
}
