package com.netfinworks.gatewaytest.demo.service.base;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.kjtpay.gateway.common.domain.base.ResponseParameter;
import com.meidusa.fastjson.JSONObject;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpProtocolHandler;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpRequest;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpResponse;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpResultType;
import org.apache.commons.httpclient.NameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * <p>外部系统接口服务基类</p>
 * @author leelun
 * @version $Id: ExtServiceBase.java, v 0.1 2013-12-19 上午9:55:15 lilun Exp $
 */
public class ExtServiceBase {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExtServiceBase.class);

    /**
     * @param requestUrl
     * @return
     */
    protected JSONObject httpsRequestToJsonObject(String requestUrl, NameValuePair[] params) {
        JSONObject jsonObject = null;
        try {
            HttpProtocolHandler httpProtocolHandler = HttpProtocolHandler.getInstance();
            HttpRequest request = new HttpRequest(HttpResultType.BYTES);
            request.setMethod(HttpRequest.METHOD_POST);
            request.setUrl(requestUrl);
            request.setCharset("UTF-8");
            request.setParameters(params);
            HttpResponse response = httpProtocolHandler.execute(request, null, null);
            if (response == null) {
                return null;
            }
            String strResult = response.getStringResult();
            jsonObject = JSONObject.parseObject(strResult);
        } catch (Exception e) {
        	LOGGER.error("https请求异常.caused:",e);
        }
        return jsonObject;
    }

    protected ResponseParameter<String> httpsRequestToAliJsonObject(String requestUrl, NameValuePair[] params) {
        ResponseParameter<String> result = null;
        try {
            HttpProtocolHandler httpProtocolHandler = HttpProtocolHandler.getInstance();
            HttpRequest request = new HttpRequest(HttpResultType.BYTES);
            request.setMethod(HttpRequest.METHOD_POST);
            request.setUrl(requestUrl);
            request.setCharset("UTF-8");
            request.setParameters(params);
            HttpResponse response = httpProtocolHandler.execute(request, null, null);
            if (response == null) {
                return null;
            }
            String strResult = response.getStringResult();
            Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().enableComplexMapKeySerialization().create();
            result = gson.fromJson(strResult,ResponseParameter.class);
        } catch (Exception e) {
            LOGGER.error("https请求异常.caused:",e);
        }
        return result;
    }
}
