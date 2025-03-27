package com.chuxin.springadmin.modules.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chuxin.springadmin.modules.system.model.entity.Config;

public interface ConfigService extends IService<Config> {
    /**
     * 获取系统配置
     * @param key 配置键
     * @return 配置值
     */
    Object getSystemConfig(String key);

}
