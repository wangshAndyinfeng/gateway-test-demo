package com.netfinworks.gatewaytest.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by hpw on 2016/11/24.
 */
@Service
public class QrcodeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(QrcodeService.class);
    @Resource
    private WeChatService weChatService;




    /**
     * 微信取得code 换取openid
     *
     * @param code
     * @param req
     * @param req
     * @return
     * @throws Exception
     */
    public String getOpenId(String queryString, String code, String appid, String secret, HttpServletResponse res, HttpServletRequest req) throws Exception {
        return weChatService.getOpenId(queryString, code,appid,secret, res, req);
    }

}