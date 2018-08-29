package com.netfinworks.gatewaytest.demo.service;

import com.kjtpay.gateway.common.util.security.SecurityService;
import com.kjtpay.gateway.common.util.security.generation.ITrusSecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * 重写获取证书地址的方法
 * @author lijian
 * @date 2018/8/28 17:24
 */
public class MySecurityService extends SecurityService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MySecurityService.class);

    public MySecurityService(String certFileName, String pfxFileName, String keyPassword) {
        LOGGER.info("certFileName{},pfxFileName{},keyPassword{}",certFileName,pfxFileName,keyPassword);
        try {
            File certFile = ResourceUtils.getFile("classpath:cafiles/"+certFileName);
            File pfxFile = ResourceUtils.getFile("classpath:cafiles/"+pfxFileName);
            LOGGER.info("cert文件全路径="+certFile.getAbsolutePath());
            LOGGER.info("pfx文件全路径="+pfxFile.getAbsolutePath());
            super.setSecurity(ITrusSecurityService.getInstance(certFile.getAbsolutePath(),
                    pfxFile.getAbsolutePath(), keyPassword));
        } catch (FileNotFoundException e) {
            LOGGER.error("文件无法找到.",e);
            e.printStackTrace();
        }
    }
}