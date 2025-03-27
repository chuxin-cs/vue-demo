package com.chuxin.springadmin.common.security.exception;

import com.chuxin.springadmin.common.result.ResultCode;
import com.chuxin.springadmin.common.util.ResponseUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class MyAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        int status = response.getStatus();
        if (status == HttpServletResponse.SC_NOT_FOUND) {
            // 资源不存在
            ResponseUtils.writeErrMsg(response, ResultCode.USER_RESOURCE_NOT_FOUND);
        } else {
            if (authException instanceof BadCredentialsException) {
                // 用户名或密码错误
                ResponseUtils.writeErrMsg(response, ResultCode.USER_PASSWORD_ERROR, authException.getMessage());
            } else {
                // 登录异常
                ResponseUtils.writeErrMsg(response, ResultCode.USER_LOGIN_EXCEPTION, authException.getMessage());
            }
        }
    }
}
