package com.chuxin.springadmin.modules.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.chuxin.springadmin.modules.system.model.dto.UserAuthInfo;
import com.chuxin.springadmin.modules.system.model.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    /**
     * 根据用户名获取认证信息
     * @param username 用户名
     * @return 认证信息
     */
    UserAuthInfo getUserAuthInfo(String username);
}
