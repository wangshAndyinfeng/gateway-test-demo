package com.netfinworks.gatewaytest.demo.controller;

import com.meidusa.fastjson.JSONObject;
import com.netfinworks.gatewaytest.demo.ro.WeiXinRequest;
import com.netfinworks.gatewaytest.demo.util.httpclient.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 *
 */
@Controller
public class WxProject extends Base {

    private static final Logger LOGGER = LoggerFactory.getLogger(WxProject.class);

    @RequestMapping(value = "/getOpenId.json")
    @ResponseBody
    public JSONObject getOpenIdByXiaoChengxu(@RequestBody WeiXinRequest weiXinRequest ){
        LOGGER.info("获取微信小程序openId"+JSONObject.toJSON(weiXinRequest));
        Assert.isNull(weiXinRequest,"请求参数不能为空");
        Assert.isNull(weiXinRequest.getGetUrl(),"请求url不能为空");
        JSONObject jsonObject = null;
        String s = HttpGetService.sendGet(weiXinRequest.getGetUrl());
        jsonObject = JSONObject.parseObject(s);
        return jsonObject;
    }
}