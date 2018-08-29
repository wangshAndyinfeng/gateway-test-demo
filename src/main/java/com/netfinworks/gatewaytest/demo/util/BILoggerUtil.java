package com.netfinworks.gatewaytest.demo.util;

import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.meidusa.fastjson.JSON;
import com.meidusa.fastjson.JSONObject;
import com.netfinworks.common.lang.StringUtil;
import com.netfinworks.common.util.DateUtil;

/**
 * 请求日志落地打印BI专属log工具类
 * Created by raoxianyin on 2018/4/14.
 */
public class BILoggerUtil {
	/**请求日志落地打印BI专属log**/
    private static final Logger LOGGER = LoggerFactory.getLogger("BI");
    
    /**接口服务名称**/
    private static final String SERVICE = "service";
    /**接口版本**/
    private static final String VERSION = "version";
    /**平台ID**/
    private static final String PARTNER_ID = "partner_id";
    /**签名类型**/
    private static final String SIGN_TYPE = "sign_type";
    /**一级返回码**/
    public static final String CODE = "code";
    /**二级返回码**/
    public static final String SUB_CODE = "sub_code";
    /**一级描述**/
    public static final String MSG = "msg";
    /**二级描述**/
    public static final String SUB_MSG = "sub_msg";
    
    /**数据源系统名称**/
    private static final String SOURCE_NAME = "mag";
    /**请求参数日志类型值**/
    private static final String TYPE_VALUE_REQ = "req";
    /**响应参数日志类型值**/
    private static final String TYPE_VALUE_RESP = "resp";
    /**业务入参类型值**/
    public static final String BIZ_IN_TYPE = "biz_in";
    /**业务出参类型值**/
    public static final String BIZ_OUT_TYPE = "biz_out";
    
    public static final String MAG_SUCCESS_RTN = "S10000";
    
    private BILoggerUtil(){}
    
    /**
     * 根据请求参数获取traceId 从out_trade_no、request_no和batch_no中获取若没有返回为空
     * @param request
     * @return
     */
    public static String getTraceId(String outTradeId,String partnerId){
    	String traceId = UUID.randomUUID().toString().replaceAll("-", "");
        if(!StringUtils.isEmpty(outTradeId)) {
    		traceId += "-"+outTradeId;
    	} else {
    		traceId += "-"+partnerId;
    	}
        return traceId;
    }
    
    /**
     * 打印请求基本参数日志信息
     * @param traceId
     * @param request
     */
    public static void printRequest(String requestLogTime,String traceId,String sourceIp,HttpServletRequest request){
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("traceId", traceId);
        jSONObject.put("source", SOURCE_NAME);
        jSONObject.put("source_ip",sourceIp);
        jSONObject.put("log_time",requestLogTime);
        String service = request.getParameter(SERVICE);
        if(StringUtil.isEmpty(service)){
        	jSONObject.put(SERVICE,"service_null");
        } else {
        	jSONObject.put(SERVICE,service);
        }
        String version = request.getParameter(VERSION);
        if(StringUtil.isEmpty(version)){
        	jSONObject.put(VERSION,"version_null");
        } else {
        	jSONObject.put(VERSION,version);
        }
        String partnerId = request.getParameter(PARTNER_ID);
        if(StringUtil.isEmpty(partnerId)){
        	jSONObject.put(PARTNER_ID,"partner_null");
        } else {
        	jSONObject.put(PARTNER_ID,partnerId);
        }
        String singType = request.getParameter(SIGN_TYPE);
        if(StringUtil.isEmpty(singType)){
        	jSONObject.put(SIGN_TYPE,"sign_type_null");
        } else {
        	jSONObject.put(SIGN_TYPE,singType);
        }
        jSONObject.put("type", TYPE_VALUE_REQ);
        LOGGER.info(jSONObject.toJSONString());
    }
    
    /**
     * 打印业务参数日志信息
     * @param traceId
     * @param type 业务入参：biz_in 业务出参：biz_out
     * @param outerTradeNo
     * @param data
     */
    public static void printBizContent(String traceId, String type, String tradeNo, String data){
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("traceId", traceId);
        jSONObject.put("type", type);
        JSONObject parametersJSON = JSON.parseObject(data);
        String outerTradeNo = StringUtils.EMPTY;
        if(parametersJSON != null) {
        	parametersJSON.remove("sign");
        	parametersJSON.remove("account_name");
        	parametersJSON.remove("card_no");
        	parametersJSON.remove("netBankFormUrl");
        	parametersJSON.remove("certificates_number");
        	parametersJSON.remove("stackTrace");
        	parametersJSON.remove("payer_card_no");
        	parametersJSON.remove("mobilePhoneNo");
        	parametersJSON.remove("new_bankcard_no");
        	if(parametersJSON.containsKey("transfer_list")) {
        		String transferListStr = parametersJSON.getString("transfer_list");
        		parametersJSON.put("transfer_list", transferListStr.replaceAll("~\\d{11}~", "~*********~"));
        	}
        	jSONObject.put("data", parametersJSON);
        	if(StringUtil.isBlank(tradeNo)) {
            	if(StringUtil.isNotBlank(parametersJSON.getString("outer_trade_no"))){
                	outerTradeNo = parametersJSON.getString("outer_trade_no");
                } else if(StringUtil.isNotBlank(parametersJSON.getString("batch_no"))){
                	outerTradeNo = parametersJSON.getString("batch_no");
                }
            } else {
            	outerTradeNo = tradeNo;
            }
        }
        jSONObject.put("log_time",DateUtil.format(new Date(),"yyyy-MM-dd HH:mm:ss.SSS"));
        jSONObject.put("outer_trade_no",outerTradeNo);
        LOGGER.info(jSONObject.toJSONString());
    }
    
    /**
     * 打印响应基本参数日志信息
     * @param traceId
     * @param responseContent
     */
    public static void printResponse(String requestLogTime,String traceId,String sourceIp,String responseContent){
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("traceId",traceId);
        jSONObject.put("source",SOURCE_NAME);
        jSONObject.put("source_ip",sourceIp);
        jSONObject.put("log_time",DateUtil.format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"));
        jSONObject.put("request_log_time",requestLogTime);
        JSONObject responseJSON = (JSONObject)JSON.parse(responseContent);
        String code = responseJSON.getString(CODE);
        String responseSubCode = responseJSON.getString(SUB_CODE);
        jSONObject.put(CODE, StringUtil.isNotBlank(code) ? code : "code_null");
        jSONObject.put(MSG, StringUtil.isNotBlank(responseJSON.getString(MSG)) ? responseJSON.getString(MSG) : "msg_null");
        jSONObject.put(SUB_CODE, StringUtil.isNotBlank(responseSubCode) ? responseJSON.getString(SUB_CODE) : "sub_code_null");
        jSONObject.put(SUB_MSG, StringUtil.isNotBlank(responseJSON.getString(SUB_MSG)) ? responseJSON.getString(SUB_MSG) : "sub_msg_null");
        String status = "status_null";
        String respStatus = responseJSON.getString("status");
        String payStatus = responseJSON.getString("pay_status");
        if(StringUtil.isNotBlank(respStatus)) {
        	status = respStatus;
        } else if(StringUtil.isNotBlank(payStatus)) {
        	if(payStatus.equals("F") || payStatus.equals("S")) {
        		status = payStatus;
        	} else {
        		status = "P";
        	}
        } else if(StringUtil.isNotBlank(code)) {
        	status = code.substring(0,1);
        }
        jSONObject.put("status",status);
        jSONObject.put("type", TYPE_VALUE_RESP);
        LOGGER.info(jSONObject.toJSONString());
    }
}