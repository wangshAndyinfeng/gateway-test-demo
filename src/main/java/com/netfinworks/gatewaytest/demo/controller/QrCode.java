package com.netfinworks.gatewaytest.demo.controller;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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


/**
 * Created by kluoij on 2016/11/23.
 */
@Controller
public class QrCode extends Base {

    private static final Logger LOGGER = LoggerFactory.getLogger(QrCode.class);
    @Resource
    private QrcodeService qrcodeService;


    @RequestMapping(value = "/qrcode/pay.htm")
    public ModelAndView pay(@RequestParam(value = "code", defaultValue = "") String code,
                            @RequestParam(value = "appid", defaultValue = "") String appid,
                            @RequestParam(value = "secret", defaultValue = "") String secret,
                            @RequestParam(value = "auth_code", defaultValue = "") String authCode,
                            @RequestParam(value = "redirect_url", required = false) String redirectUrl,
                            HttpServletResponse res, HttpServletRequest req) throws Exception {
    	try {
    		String traceId = BILoggerUtil.getTraceId(null,appid);
    		Map<String, Object> data = new HashMap<String, Object>();
            data.put("frontVersion", frontVersion);
            LOGGER.info("调用pay请求,接收参数appid:{},secret:{},code:{},auth_code:{},redirect_url:{}",appid,secret,code,authCode,redirectUrl);
            data.put("staticAddress", String.valueOf(configProperties.get("staticAddress")));
            boolean isAlipay = false;
            String queryString = "";
            if(StringUtil.isNotBlank(redirectUrl)){
                if(StringUtil.isBlank(code) && StringUtil.isBlank(authCode)) {

                    queryString = "redirect_url=" + URLEncoder.encode(redirectUrl, "UTF-8");

                    LOGGER.info("redirect_url, step1:{}", queryString);
                }else {
                    redirectUrl = URLDecoder.decode(redirectUrl, "UTF-8");
                    LOGGER.info("redirect_url, step2");
                    res.sendRedirect(redirectUrl + "?"+ queryString + "&code=" + code + "&auth_code=" + authCode);
                    return null;
                }
            }
            if(isWetChat(req)) {
                String openId = qrcodeService.getOpenId(queryString, code,appid,secret, res, req);
                data.put("openid", openId);
            }else{
                //支付错误
            }
            data.put("isAlipay", isAlipay);
            return new ModelAndView("/pay", data);
    	} finally {
    		MDC.remove("traceId");
    	}
    }





    /**
     *
     * @param req
     * @return
     * @throws Exception
     */
    private boolean isWetChat(HttpServletRequest req) throws Exception{
        String userAgent = req.getHeader("user-agent");
        if(userAgent == null){
            throw new Exception("请使用支付宝或者微信支付");
        }
        userAgent = userAgent.toLowerCase();
        if(userAgent.indexOf("alipay") != -1){
            return false;
        }else if(userAgent.indexOf("micromessenger") != -1){
            return true;
        }else{
            LOGGER.error("user-agent error:{}", userAgent);
            throw new Exception("请使用支付宝或者微信支付");
        }
    }
}