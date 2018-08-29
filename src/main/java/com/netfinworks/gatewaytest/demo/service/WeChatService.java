package com.netfinworks.gatewaytest.demo.service;

import com.meidusa.fastjson.JSONObject;
import com.netfinworks.common.lang.StringUtil;
import com.netfinworks.gatewaytest.demo.service.base.ExtServiceBase;
import org.apache.commons.httpclient.NameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.Properties;

/**
 * Created by hpw on 2017/2/13.
 */
@Service
public class WeChatService extends ExtServiceBase {

    private static final Logger LOGGER = LoggerFactory.getLogger(WeChatService.class);

    @Resource
    protected Properties configProperties;

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
//        String appid = "wxba7178cc76cb5f2d";
//        String secret = "81d283ba11c106dc8424120e3105b2ce";
        if (StringUtil.isBlank(code)) {
            queryString = "appid="+appid+"&secret="+secret+"";
            String redirectUrl = URLEncoder.encode("http://" + req.getServerName() + req.getRequestURI() + "?" + queryString, "UTF-8");
            String codeUrl = String.valueOf(configProperties.get("wetChat.code.url"));
            String getCodeUrl = codeUrl + "?appid=" + appid + "&redirect_uri=" + redirectUrl + "&response_type=code&scope=snsapi_base&state=demo#wechat_redirect";
            LOGGER.info("请求code url:{}", getCodeUrl);
            res.sendRedirect(getCodeUrl);
            return "";
        }
        String openId = "";
        String getOpenIdUrl = String.valueOf(configProperties.get("wetChat.open.url"));

        NameValuePair[] params = new NameValuePair[4];
        params[0] = new NameValuePair("appid", appid);
        params[1] = new NameValuePair("secret", secret);
        params[2] = new NameValuePair("code", code);
        params[3] = new NameValuePair("grant_type", "authorization_code");

        LOGGER.info("请求open url:{}", getOpenIdUrl);
        JSONObject jsonObject = httpsRequestToJsonObject(getOpenIdUrl, params);
        LOGGER.info("wechat open jsonObject:{}",jsonObject);
        Object errorCode = jsonObject.get("errcode");
        if (errorCode != null) {
            LOGGER.error("code[{}]不合法",errorCode);
        } else {
            openId = jsonObject.getString("openid");
        }
        return openId;
    }


}
