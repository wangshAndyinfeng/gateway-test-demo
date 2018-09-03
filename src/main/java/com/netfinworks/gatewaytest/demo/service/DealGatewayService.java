package com.netfinworks.gatewaytest.demo.service;

import com.kjtpay.gateway.common.domain.base.RequestBase;
import com.netfinworks.gatewaytest.demo.service.base.ExtServiceBase;
import org.apache.commons.httpclient.NameValuePair;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DealGatewayService extends ExtServiceBase {

    public Map<String, Object> post(RequestBase requestBase, String url){
        NameValuePair[] params = new NameValuePair[10];
        params[0] = new NameValuePair("request_no", requestBase.getRequestNo());
        params[1] = new NameValuePair("service", requestBase.getService());
        params[2] = new NameValuePair("version", requestBase.getVersion());
        params[3] = new NameValuePair("partner_id", requestBase.getPartnerId());
        params[4] = new NameValuePair("charset", requestBase.getCharset());
        params[5] = new NameValuePair("sign_type", requestBase.getSignType());
        params[6] = new NameValuePair("sign", requestBase.getSign());
        params[7] = new NameValuePair("timestamp", requestBase.getTimestamp());
        params[8] = new NameValuePair("format", requestBase.getFormat());
        params[9] = new NameValuePair("biz_content", requestBase.getBizContent());
        return httpsRequestToAliJsonObject(url, params);
    }
}
