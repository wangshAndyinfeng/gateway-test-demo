package com.netfinworks.gatewaytest.demo.controller;

import com.kjtpay.gateway.common.domain.base.RequestBase;
import com.netfinworks.gatewaytest.demo.util.exception.ErrorCodeException;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Created by kluoij on 2016/11/23.
 */
public class Base {

    @Resource
    protected Properties configProperties;

    final static String frontVersion = "20170608";

    /**
     * 统一异常处理
     * @param request
     * @param e
     * @return
     */
    @ExceptionHandler
    public ModelAndView exception(HttpServletRequest request, Exception e) {
        Map<String, Object> data = new HashMap<String, Object>();
        String errorMessage;
        if(e instanceof ErrorCodeException){
        	ErrorCodeException errorCodeException = (ErrorCodeException)e;
        	if(StringUtils.isNotBlank(errorCodeException.getMemo())) {
        		errorMessage = errorCodeException.getMemo();
        	} else {
        		 errorMessage = errorCodeException.getErrorMsg();
        	}
        } else {
            errorMessage = e.getMessage();
        }
        data.put("errorMessage", errorMessage);
        if(request.getRequestURI().indexOf(".json") !=-1){
            data.put("sucess", false);
            return new ModelAndView(new MappingJackson2JsonView(), data);
        }else{
            data.put("staticAddress", String.valueOf(configProperties.get("staticAddress")));
            data.put("frontVersion", frontVersion);
            return new ModelAndView("/500", data);
        }



    }


    /**
     * 转换公共请求参数
     * @param req
     * @return
     */
    public RequestBase convertRequestBaseParm(Map<String,String> req){
        if(!CollectionUtils.isEmpty(req)){
            RequestBase requestBase = new RequestBase();
            requestBase.setRequestNo(req.get("request_no"));
            requestBase.setService(req.get("service"));
            requestBase.setVersion(req.get("version"));
            requestBase.setPartnerId(req.get("partner_id"));
            requestBase.setCharset(req.get("charset"));
            requestBase.setSignType(req.get("sign_type"));
            requestBase.setSign(req.get("sign"));
            requestBase.setTimestamp(req.get("timestamp"));
            requestBase.setFormat(req.get("format"));
            requestBase.setBizContent(req.get("biz_content"));

            return requestBase;
        }

        return null;
    }
}
