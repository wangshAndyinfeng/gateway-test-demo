package com.netfinworks.gatewaytest.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.kjtpay.gateway.common.domain.VerifyResult;
import com.kjtpay.gateway.common.domain.base.RequestBase;
import com.kjtpay.gateway.common.domain.base.ResponseParameter;
import com.kjtpay.gateway.common.util.security.SecurityService;
import com.netfinworks.gatewaytest.demo.ro.ServiceNameConstant;
import com.netfinworks.gatewaytest.demo.service.DealGatewayService;
import com.netfinworks.gatewaytest.demo.service.FileOutputService;
import com.netfinworks.gatewaytest.demo.service.MySecurityService;
import com.netfinworks.gatewaytest.demo.util.RSA;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Array;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * Created by kluoij on 2016/11/23.
 */
@Controller
public class GatewayDemoController extends Base {

    private static final Logger LOGGER = LoggerFactory.getLogger(GatewayDemoController.class);



    @Resource(name="securityService")
    private MySecurityService securityService;

    @Resource(name="securityService2")
    private SecurityService securityService2;

    @Resource
    private DealGatewayService service;

    @Resource
    private FileOutputService fileService;
    /**
     * 加密
     * @param charset
     * @param service
     * @param signType
     * @param req
     * @return
     */
    @ResponseBody
    @RequestMapping( value = "/gateway/encrypt.do", method = RequestMethod.POST)
    public Map encrypt(@RequestParam(value = "charset", required = true) String charset,
                          @RequestParam(value = "service", required = true) String service,
                          @RequestParam(value = "sign_type", required = true) String signType,
                          @RequestParam(value = "req", required = true) String req) {
        Map resp = new HashMap();
        LOGGER.info("转换前json："+req);
        if(StringUtils.isNotBlank(req)){

            JSONObject bizReq = null;
            //因js转出的嵌套json有\，使用gson转成请求类会报错，故需要转换一下
//            bizReq = convertParm(service, req);
//
//            if(bizReq != null){
//                LOGGER.info("转换后json："+bizReq.toString());

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
            return securityService2.encrypt(oriText, charset);
        }else if("ITRUS".equals(signType)){
            return securityService.encrypt(oriText, charset);
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
    @RequestMapping( value = "/sign.do", method = RequestMethod.POST)
    public Map sign(@RequestParam(value = "signData", required = true) String signData) {

        Map resp = new HashMap();
        if(StringUtils.isNotBlank(signData)){

            LOGGER.info("商户签名开始："+signData);
            @SuppressWarnings("unchecked")
            Map<String,String> req = JSON.parseObject(signData, HashMap.class);

            String charset = req.get("charset");
            String signType = req.get("sign_type");
            if(StringUtils.isNotBlank(charset) && StringUtils.isNotBlank(signType)){

                String service = req.get("service");

                if("instant_trade".equals(service) || "ensure_trade".equals(service)){
                    //演示使用请求map方式签名
                    if("RSA".equals(signType)){
                        //RSA签名
                        LOGGER.info("RSA--商户签名入参："+req);
                       String signResult = securityService2.sign(req, charset);
                        LOGGER.info("RSA--商户签名结果："+signResult);
                        resp.put("code","0000");
                        resp.put("message","");
                        resp.put("result",signResult);
                        return resp;
                    }else if("ITRUS".equals(signType)){
                        LOGGER.info("ITRUS--商户签名入参："+req);
                        String signResult = securityService.sign(req, charset);
                        LOGGER.info("ITRUS--商户签名出参："+req);
                        resp.put("code","0000");
                        resp.put("message","");
                        resp.put("result",signResult);
                        return resp;
                    }

                }else{

                    //演示使用请求对象签名
                    RequestBase requestBase = convertRequestBaseParm(req);

                    if("RSA".equals(signType)){
                        //RSA签名
                        String signResult =  securityService2.sign(requestBase, charset);
                        resp.put("code","0000");
                        resp.put("message","");
                        resp.put("result",signResult);
                        return resp;
                    }else if("ITRUS".equals(signType)){
                        String signResult =  securityService.sign(requestBase, charset);
                        resp.put("code","0000");
                        resp.put("message","");
                        resp.put("result",signResult);
                        return resp;
                    }

                }

            }
        }


        resp.put("code","9999");
        resp.put("message","请求参数填写出错或必填参数未填写");
        return resp;
    }


    /**
     * 从java访问gateway
     * @param signData
     * @return
     */
    @ResponseBody
    @RequestMapping( value = "/gateway.do", method = RequestMethod.POST)
    public Map toGateway(@RequestParam(value = "signData", required = true) String signData) {
        Map resp = new HashMap();
        if (StringUtils.isNotBlank(signData)) {
            @SuppressWarnings("unchecked")
            Map<String, String> req = JSON.parseObject(signData, HashMap.class);
            //演示使用请求对象签名
            RequestBase requestBase = convertRequestBaseParm(req);
            Map<String, Object> response = service.post(requestBase, req.get("url"));
            if(response != null && response.get("form")!=null){
                return response;
            }
            VerifyResult verifyResult = verify(response);
            if (verifyResult.isSuccess()) {
                resp.put("code", response.get("code").equals("S10000") ? "0000" : response.get("sub_code"));
                resp.put("result",response.get("biz_content"));
                resp.put("verifymsg", "验签通过");
                resp.put("msg",response.get("msg"));
                resp.put("submsg",response.get("sub_msg"));
            } else {
                resp.put("code","0000");
                resp.put("result",response.get("biz_content"));
                resp.put("verifymsg","验签不通过");
            }
        } else {
            resp.put("code","9999");
            resp.put("msg","入参出错");
        }
        return resp;
    }



    /**
     * gateWay 验签
     * @param responseParameter
     * @return
     */
    private VerifyResult verify(ResponseParameter responseParameter){
        LOGGER.info("gateWay 验签开始："+JSON.toJSONString(responseParameter));
        if(null == responseParameter || StringUtils.isBlank(responseParameter.getSignType()) || StringUtils.isBlank(responseParameter.getCharset())){
            return null;
        }

        VerifyResult result = null;

        if("RSA".equals(responseParameter.getSignType())){
            //RSA验签
            result = securityService2.verify(responseParameter, responseParameter.getSign(), responseParameter.getCharset());
        }else if("ITRUS".equals(responseParameter.getSignType())){
            result = securityService.verify(responseParameter, responseParameter.getSign(), responseParameter.getCharset());
        }
        LOGGER.info("gateWay 验签结果："+JSON.toJSONString(result));
        return result;
    }


    /**
     * ,pns验签
     * @param map
     * @returnmap
     */
    private VerifyResult verify(Map map){
        if(null == map || StringUtils.isBlank((String)map.get("sign_type")) || StringUtils.isBlank((String)map.get("charset"))){
            return null;
        }
        Object obj = map.get("biz_content");
        Gson gson = new Gson();
        //转换验签后重新装入
        if(map.get("biz_content")!=null){
            map.put("biz_content",gson.toJson(map.get("biz_content")));
        }
        VerifyResult result = null;
        if("RSA".equals((String)map.get("sign_type"))){
            //RSA验签
            result = securityService2.verify(map, (String)map.get("sign"),(String)map.get("charset"));
        }else if("ITRUS".equals((String)map.get("sign_type"))){


            result = securityService.verify(map, (String)map.get("sign"),(String)map.get("charset"));
        }
        map.put("biz_content",obj);
        return result;
    }


    /**
     * 商户验签
     * @param verifyData
     * @return
     * @throws UnsupportedEncodingException
     */
    @SuppressWarnings("unchecked")
    @ResponseBody
    @RequestMapping( value = "/verify.do", method = RequestMethod.POST)
    public String verify(
            @RequestParam(value = "verifyData", required = true) String verifyData) throws UnsupportedEncodingException {

        if(StringUtils.isNotBlank(verifyData)){

            VerifyResult result = null;

            Gson gson = new Gson();
            Map<String, String> responseParameter = new HashMap<String, String>();
            responseParameter = gson.fromJson(verifyData, responseParameter.getClass());

            String bizContent = responseParameter.get("biz_content")==null ? null : JSON.toJSONString(responseParameter.get("biz_content"));
            responseParameter.remove("biz_content");
            responseParameter.put("biz_content", bizContent);

            String signType = responseParameter.get("sign_type");
            String charset = responseParameter.get("charset");
            String sign = responseParameter.get("sign");

            if("RSA".equals(signType)){
                //RSA验签
                result = securityService2.verify(responseParameter, sign, charset);
            }else if("ITRUS".equals(signType)){
                result = securityService.verify(responseParameter, sign, charset);
            }

            if(result!=null){
                if(result.isSuccess()){
                    return "验签通过";
                }else{
                    return "验签失败！";
                }

            }else{
                return "验签异常！";
            }

        }

        return "商户验签参数不正确！";
    }


    /**
     * 转换参数
     * @param service
     * @param reqParm
     * @return
     */
    public JSONObject convertParm(String service, String reqParm){

        if(ServiceNameConstant.INSTANT_TRADE.equals(service)){
            return convertInstantTradeParm(reqParm);

        }else if(ServiceNameConstant.ENSURE_TRADE.equals(service)){
            return convertInstantTradeParm(reqParm);

        }else if("trade_settle".equals(service)){
            List<String> fieldNameList = new ArrayList<String>();
            fieldNameList.add("royalty_info");
            return convertWithSpecialParm(reqParm, fieldNameList);

        }else if(ServiceNameConstant.ENTRY_ACCOUNT_OFFLINE.equals(service)){
            return convertWithSpecialParm(reqParm, null);

        }else if("batch_bank_witholding".equals(service)){
            List<String> fieldNameList = new ArrayList<String>();
            fieldNameList.add("withholding_list");
            return convertWithSpecialParm(reqParm, fieldNameList);

        }else if(ServiceNameConstant.TRADE_BANK_WITHOLDING.equals(service)){
            List<String> fieldNameList = new ArrayList<String>();
            fieldNameList.add("royalty_info");
            return convertWithSpecialParm(reqParm, fieldNameList);

        }else if(ServiceNameConstant.TRADE_CLOSE.equals(service)){
            return convertWithSpecialParm(reqParm, null);

        }else if(ServiceNameConstant.TRADE_QUERY.equals(service)){
            return convertWithSpecialParm(reqParm, null);

        }else if(ServiceNameConstant.TRADE_REFUND.equals(service)){
            List<String> fieldNameList = new ArrayList<String>();
            fieldNameList.add("royalty_info");
            return convertWithSpecialParm(reqParm, fieldNameList);

        }else if("batch_transfer_account".equals(service)){
            List<String> fieldNameList = new ArrayList<String>();
            fieldNameList.add("transfer_list");
            return convertWithSpecialParm(reqParm, fieldNameList);

        }else if(ServiceNameConstant.TRANSFER_TO_ACCOUNT.equals(service)){
            return convertWithSpecialParm(reqParm, null);

        }else if(ServiceNameConstant.TRANSFER_TO_CARD.equals(service)){
            return convertWithSpecialParm(reqParm, null);

        }else if("batch_transfer_card".equals(service)){
            List<String> fieldNameList = new ArrayList<String>();
            fieldNameList.add("transfer_list");
            return convertWithSpecialParm(reqParm, fieldNameList);
        }else if(ServiceNameConstant.CARD_BIN_QUERY.equals(service)){
            return convertWithSpecialParm(reqParm, null);
        }




        return null;

    }


    /**
     * 转换给定参数名的参数，将给定参数的JSON字符串格式转换成JSON对象数组格式
     * @param reqParm
     * @param fieldNameList
     * @return
     */
    public JSONObject convertWithSpecialParm(String reqParm, List<String> fieldNameList){

        JSONObject reqJson = JSONObject.parseObject(reqParm);

        if(!CollectionUtils.isEmpty(fieldNameList)){

            for(String fieldName : fieldNameList){
                String fieldValue = reqJson.getString(fieldName);
                if(StringUtils.isNotBlank(fieldValue)){
                    JSONArray fieldValueJSONArray = JSONArray.parseArray(fieldValue);
                    reqJson.put(fieldName, fieldValueJSONArray);
                }
            }

        }

        return reqJson;
    }


    /**
     * 转换即时到账参数
     * @param req
     * @return
     */
    public JSONObject convertInstantTradeParm(String req){
        JSONObject tradeReq = JSONObject.parseObject(req);
        //设置复杂属性
        //转换支付方式pay_method
        String pay_method = tradeReq.getString("pay_method");
        JSONObject payMethod = JSONObject.parseObject(pay_method);
        tradeReq.put("pay_method", payMethod);

        //转换终端信息域terminal_info
        String terminal_info = tradeReq.getString("terminal_info");
        JSONObject terminalInfo = JSONObject.parseObject(terminal_info);
        tradeReq.put("terminal_info", terminalInfo);
        //转换商户自定义域merchant_custom
        String merchant_custom = tradeReq.getString("merchant_custom");
        JSONObject merchantCustom = JSONObject.parseObject(merchant_custom);
        tradeReq.put("merchant_custom", merchantCustom);

        //转换交易信息trade_info
        String trade_info = tradeReq.getString("trade_info");

        if(StringUtils.isNotBlank(trade_info)){
            JSONArray tradeInfo = JSONArray.parseArray(trade_info);


//			//转换交易扩展参数trade_ext
//			String trade_ext = tradeInfo.getString("trade_ext");
//			if(StringUtils.isNotBlank(trade_ext)){
//				JSONObject tradeExt = JSONObject.parseObject(trade_ext);
//				tradeInfo.put("trade_ext", tradeExt);
//			}

            //转换分账列表royalty_info
            for(int i=0;i<tradeInfo.size();i++){
                JSONObject job = tradeInfo.getJSONObject(i);
                String royalty_info = job.getString("royalty_info");
                if(StringUtils.isNotBlank(royalty_info)){
                    JSONArray royaltyInfos = JSONArray.parseArray(royalty_info);
                    job.put("royalty_info", royaltyInfos);
                }
            }

            tradeReq.put("trade_info", tradeInfo);

            return tradeReq;
        }

        return null;
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



    /**
     * RSA密钥生成
     * @param keyType
     * @param length
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping( value = "/genKeyPair.do", method = RequestMethod.POST)
    public String genKeyPair(@RequestParam(value = "keyType", required = false) String keyType,
                             @RequestParam(value = "length", required = false) Integer length) throws Exception {

        if(!("PKCS#1".equalsIgnoreCase(keyType) || "PKCS#8".equalsIgnoreCase(keyType))){
            return "密钥格式错误";
        }

        if(!(1024 == length || 2048 == length)){
            return "密钥长度错误";
        }

        Map<String, Object> keyMap = RSA.genKeyPair(length);

        if(keyMap != null){
            String publicKey = RSA.getPublicKey(keyMap);
            String privateKey = RSA.getPrivateKey(keyMap, keyType);

            System.out.println("publicKey:"+publicKey);
            System.out.println("privateKey:"+privateKey);

            JSONObject jSONObject = new JSONObject();
            jSONObject.put("publicKey", publicKey);
            jSONObject.put("privateKey", privateKey);
            return jSONObject.toJSONString();
        }

        return null;
    }


    /**
     * RSA密钥校验
     * @param keyPair
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping( value = "/verifyKeyPair.do", method = RequestMethod.POST)
    public String verifyKeyPair(@RequestParam(value = "keyPair", required = false) String keyPair) {
        try{
            System.out.println("keyPair："+keyPair);
            if(StringUtils.isNotBlank(keyPair)){

                JSONObject keyPairJson = JSONObject.parseObject(keyPair);
                String sign = RSA.sign("test", keyPairJson.getString("privateKey"), "utf-8");
                boolean isOk = RSA.verify("test", sign, keyPairJson.getString("publicKey"), "utf-8");

                if(isOk){
                    return "校验成功";
                }else{
                    return "校验失败";
                }
            }
        }catch(Exception e){
            return "校验失败";
        }

        return "请正确输入公钥和私钥";
    }



    /**
     * 异步通知消息接收接口 并写入txt文件
     * @return
     * @throws Exception
     */
    @RequestMapping( value = "/receivePnsData.do", method = RequestMethod.POST)
    public String receivePnsData(HttpServletRequest request, HttpServletResponse response) {
        LOGGER.info("异步通知消息接收接口-- 异步消息开始："+request);
        Map<?, ?> parameters = request.getParameterMap();

        Map<String, String> formattedParameters = new HashMap<String, String>(parameters.size());

        for (Map.Entry<?, ?> entry : parameters.entrySet()) {
            if ((entry.getValue() == null) || (Array.getLength(entry.getValue()) == 0)) {
                formattedParameters.put((String) entry.getKey(), null);
            } else {
                formattedParameters.put((String) entry.getKey(), StringUtils.trim((String) Array.get(entry.getValue(), 0)));
            }
        }
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String str = format.format(date);
        fileService.saveDataToFile(str+"pnsNotify",JSON.toJSONString(formattedParameters));

//        verify(formattedParameters);
        return "SUCCESS";
    }


    /**
     * 异步消息结果 ajax访问
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping( value = "/readPnsData.do", method = RequestMethod.POST)
    public JSONArray readPnsData(@RequestParam(value = "date", required = false) String dateString) {
        LOGGER.info("ajax访问-- 异步消息开始："+dateString);
        long lt = new Long(dateString);
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date(lt);
        String str = format.format(date);

        JSONArray result = fileService.getDatafromFile(str+"pnsNotify");
        LOGGER.info("ajax访问-- 异步消息结果："+JSON.toJSONString(result));
//        verify(formattedParameters);
        return result;
    }




}