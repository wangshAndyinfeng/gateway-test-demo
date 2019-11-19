package com.netfinworks.gatewaytest.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.kjtpay.gateway.common.domain.base.RequestBase;
import com.kjtpay.gateway.common.util.security.SecurityService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * <p></p >
 *
 * @author wangsihuo
 * @version $Id: HaiyikeController, v1.0 2019/11/18 0018 16:42 wangsihuo Exp $
 */
@Controller
public class HaiyikeController extends Base{

    private static final Logger LOGGER = LoggerFactory.getLogger(HaiyikeController.class);

    @Resource(name="securityServiceHyk")
    private SecurityService securityServiceHyk;

    @ResponseBody
    @RequestMapping( value = "/gateway/hykWechat/encrypt.do", method = RequestMethod.POST)
    public Map encrypt(@RequestParam(value = "charset", required = true) String charset,
                       @RequestParam(value = "service", required = true) String service,
                       @RequestParam(value = "sign_type", required = true) String signType,
                       @RequestParam(value = "req", required = true) String req) {
        Map resp = new HashMap();
        LOGGER.info("转换前json："+req);
        if(StringUtils.isNotBlank(req)){
            JSONObject bizReq = null;
            //因js转出的嵌套json有\，使用gson转成请求类会报错，故需要转换一下
            String result = encrypt(signType, req, charset);
            LOGGER.info("encrypt方法操作结果："+result);
            resp.put("code","0000");
            resp.put("message","");
            resp.put("result",result);
            return resp;
        }


        resp.put("code","9999");
        resp.put("message","请求参数填写出错或必填参数未填写");
        return resp;
    }

    /**
     * 使用json字符串形式加密
     * @param signType
     * @param oriText
     * @param charset
     * @return
     */
    private String encrypt(String signType, String oriText, String charset){
        LOGGER.info("调用encrypt方法,signType:{},oriText:{},charset:{}：",signType,oriText,charset);
        //演示使用字符串形式加密
        if("RSA".equals(signType)){
            //RSA加密
            return securityServiceHyk.encrypt(oriText, charset);
        }else if("ITRUS".equals(signType)){
            return securityServiceHyk.encrypt(oriText, charset);
        }else{
            return "加密出错";
        }

    }


    /**
     * 商户签名
     * @param signData
     * @return
     */
    @ResponseBody
    @RequestMapping( value = "/gateway/hykWechat/sign.do", method = RequestMethod.POST)
    public Map sign(@RequestParam(value = "signData", required = true) String signData) {

        Map resp = new HashMap();
        if(StringUtils.isNotBlank(signData)){

            LOGGER.info("海易科签名开始："+signData);
            @SuppressWarnings("unchecked")
            Map<String,String> req = JSON.parseObject(signData, HashMap.class);

            String charset = req.get("charset");
            String signType = req.get("sign_type");
            if(StringUtils.isNotBlank(charset) && StringUtils.isNotBlank(signType)){
                String service = req.get("service");
                    //演示使用请求对象签名
                    RequestBase requestBase = convertRequestBaseParm(req);
                    if("RSA".equals(signType)){
                        //RSA签名
                        String signResult =  securityServiceHyk.sign(requestBase, charset);
                        resp.put("code","0000");
                        resp.put("message","");
                        resp.put("result",signResult);
                        return resp;
                    }else if("ITRUS".equals(signType)){
                        String signResult =  securityServiceHyk.sign(requestBase, charset);
                        resp.put("code","0000");
                        resp.put("message","");
                        resp.put("result",signResult);
                        return resp;
                    }
            }
        }
        resp.put("code","9999");
        resp.put("message","请求参数填写出错或必填参数未填写");
        return resp;
    }
}
