package com.netfinworks.gatewaytest.demo.service.base;

import com.alibaba.fastjson.JSON;
import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.kjtpay.gateway.common.domain.base.ResponseParameter;
import com.meidusa.fastjson.JSONObject;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpProtocolHandler;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpRequest;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpResponse;
import com.netfinworks.gatewaytest.demo.util.httpclient.HttpResultType;
import org.apache.commons.httpclient.NameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

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

    protected Map<String, Object> httpsRequestToAliJsonObject(String requestUrl, NameValuePair[] params) {
        try {
            HttpProtocolHandler httpProtocolHandler = HttpProtocolHandler.getInstance();
            final HttpRequest request = new HttpRequest(HttpResultType.BYTES);
            request.setMethod(HttpRequest.METHOD_POST);
            request.setUrl(requestUrl);
            request.setCharset("UTF-8");
            request.setParameters(params);
            HttpResponse response = httpProtocolHandler.execute(request, null, null);
            if (response == null) {
                return null;
            }
            String strResult = response.getStringResult();
            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(
                            new TypeToken<Map<String, Object>>(){}.getType(),
                            new JsonDeserializer<Map<String, Object>>() {
                                @Override
                                public Map<String, Object> deserialize(
                                        JsonElement json, Type typeOfT,
                                        JsonDeserializationContext context) throws JsonParseException {
                                    Map<String, Object> treeMap = new HashMap<String, Object>();
                                    JsonObject jsonObject = json.getAsJsonObject();
                                    Set<Map.Entry<String, JsonElement>> entrySet = jsonObject.entrySet();
                                    for (Map.Entry<String, JsonElement> entry : entrySet) {
                                        JsonElement value = entry.getValue();
                                        if(value instanceof JsonPrimitive) {
                                            String result = value.toString();
                                            treeMap.put(entry.getKey(),result.substring(1,result.length()-1));
                                        } else {
                                            treeMap.put(entry.getKey(), value);
                                        }
                                    }
                                    return treeMap;
                                }
                            }).create();
            Map<String, Object> map = gson.fromJson(strResult,new TypeToken<Map<String, Object>>(){}.getType());
            return map;
        } catch (Exception e) {
            LOGGER.error("https请求异常.caused:",e);
            return null;
        }
    }
}
