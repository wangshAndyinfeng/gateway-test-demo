package com.netfinworks.gatewaytest.demo.controller;

import com.netfinworks.common.lang.StringUtil;
import com.netfinworks.gatewaytest.demo.service.QrcodeService;
import com.netfinworks.gatewaytest.demo.util.BILoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by kluoij on 2016/11/23.
 */
@Controller
public class MainController extends Base {

    private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);
    @Resource
    private QrcodeService qrcodeService;

    @RequestMapping(value = "/qrcode/ready.htm")
    public ModelAndView ready(HttpServletResponse res, HttpServletRequest req){
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("frontVersion", frontVersion);
        data.put("staticAddress", String.valueOf(configProperties.get("staticAddress")));
        return new ModelAndView("/ready",data);
    }


    @RequestMapping(value = "/qrcode/open.htm")
    public ModelAndView open(HttpServletResponse res, HttpServletRequest req){
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("frontVersion", frontVersion);
        data.put("staticAddress", String.valueOf(configProperties.get("staticAddress")));
        return new ModelAndView("/open",data);
    }



}