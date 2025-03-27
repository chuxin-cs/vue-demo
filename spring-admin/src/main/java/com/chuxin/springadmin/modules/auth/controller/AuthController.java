package com.chuxin.springadmin.modules.auth.controller;

import com.chuxin.springadmin.common.result.R;
import com.chuxin.springadmin.common.security.model.AuthenticationToken;
import com.chuxin.springadmin.modules.auth.model.CaptchaInfo;
import com.chuxin.springadmin.modules.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Tag(name = "01.认证中心")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "获取登录验证码")
    @GetMapping("/captcha")
    public R<CaptchaInfo> getCaptcha() {
        CaptchaInfo captcha = authService.getCaptcha();
        return R.success(captcha);
    }

    @Operation(summary = "账号密码登录")
    @PostMapping("/login")
    public R<AuthenticationToken> login(
            @Parameter(description = "用户名", example = "admin") @RequestParam String username,
            @Parameter(description = "密码", example = "1234567") @RequestParam String password
    ) {
        AuthenticationToken authenticationToken = authService.login(username,password);
        return R.success(authenticationToken);
    }
}
