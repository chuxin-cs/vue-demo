package com.chuxin.springadmin.modules.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chuxin.springadmin.common.constant.RedisConstants;
import com.chuxin.springadmin.modules.system.mapper.ConfigMapper;
import com.chuxin.springadmin.modules.system.model.entity.Config;
import com.chuxin.springadmin.modules.system.service.ConfigService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConfigServiceImpl extends ServiceImpl<ConfigMapper, Config> implements ConfigService {

    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 获取系统配置
     *
     * @param key 配置键
     * @return 配置值
     */
    @Override
    public Object getSystemConfig(String key) {
        if (StringUtils.isNotBlank(key)) {
            return redisTemplate.opsForHash().get(RedisConstants.SYSTEM_CONFIG_KEY, key);
        }
        return null;
    }
}
