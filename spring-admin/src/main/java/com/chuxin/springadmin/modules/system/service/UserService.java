package com.chuxin.springadmin.modules.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chuxin.springadmin.modules.system.model.dto.UserAuthInfo;
import com.chuxin.springadmin.modules.system.model.entity.User;

public interface UserService extends IService<User> {

    /**
     * 根据用户名获取认证信息
     *
     * @param username 用户名
     * @return {@link UserAuthInfo}
     */

    UserAuthInfo getUserAuthInfo(String username);
}
