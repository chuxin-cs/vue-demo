package com.chuxin.springadmin.modules.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chuxin.springadmin.modules.system.mapper.UserMapper;
import com.chuxin.springadmin.modules.system.model.dto.UserAuthInfo;
import com.chuxin.springadmin.modules.system.model.entity.User;
import com.chuxin.springadmin.modules.system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

//    private final RoleService roleService;

    /**
     * 根据用户名获取认证信息
     *
     * @param username 用户名
     * @return 用户认证信息 {@link UserAuthInfo}
     */
    @Override
    public UserAuthInfo getUserAuthInfo(String username) {
        UserAuthInfo userAuthInfo = this.baseMapper.getUserAuthInfo(username);
        if (userAuthInfo != null) {
            Set<String> roles = userAuthInfo.getRoles();
            // 获取最大范围的数据权限
//            Integer dataScope = roleService.getMaximumDataScope(roles);
            userAuthInfo.setDataScope(2);
        }
        return userAuthInfo;
    }
}
