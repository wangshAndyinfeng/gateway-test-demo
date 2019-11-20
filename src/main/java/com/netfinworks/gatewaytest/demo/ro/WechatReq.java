package com.netfinworks.gatewaytest.demo.ro;

/**
 * <p></p >
 *
 * @author wangsihuo
 * @version $Id: WechatReq, v1.0 2019/11/19 0019 12:54 wangsihuo Exp $
 */
public class WechatReq {

    private static final long serialVersionUID = -9218765974595306206L;
    private String charset;
    private String service;
    private String signType;
    private String req;

    public String getCharset() {
        return charset;
    }

    public void setCharset(String charset) {
        this.charset = charset;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getSignType() {
        return signType;
    }

    public void setSignType(String signType) {
        this.signType = signType;
    }

    public String getReq() {
        return req;
    }

    public void setReq(String req) {
        this.req = req;
    }
}
