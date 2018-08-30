//网银支付
var unionpay = {
    "pay_product_code": "&支付产品码20：网银-借记卡31：网银-信用卡30：网银-综合40：网银-B2B 24：低成本网银（借记）25：低成本网银（贷记",
    "amount": "&应付金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "bank_code": "&银行/机构编码，参考附录 银行机构列表"
};

//收银台支付默认为空就行
//var 收银台进行支付

//条码-主扫
var WECHAT = {
    "pay_product_code": "64&支付产品码64:主扫-借记卡65:主扫-综合",
    "amount": "0.01&应付金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "target_organization": "WECHAT&目标机构WECHAT:微信ALIPAY:支付宝UPOP:银联"
};

//条码-公众号
var WECHATSMQ = {
    "pay_product_code": "64&支付产品码66:公众号/小程序/服务窗-借记卡67:公众号/小程序/服务窗-综合",
    "amount": "0.01&应付金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "target_organization": "WECHAT&目标机构WECHAT:微信ALIPAY:支付宝UPOP:银联",
    "app_id": "&公众号appid",
    "open_id": "&微信用户标识必填",
    "buyer_id": "&支付宝用户标识必填"
};

//余额支付
var WECHATAPP = {
    "pay_product_code": "01&支付产品码01：快捷通账户余额",
    "amount": "0.01&应付金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "member_id": "&买家会员ID,快捷通会员ID"
};

//基金支付
var WECHATH5 = {
    "pay_product_code": "06&支付产品码06：基金-对私07：基金-对公",
    "amount": "0.01&应付金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "bank_code": "HTF&银行/机构编码， HTF-汇添富基金",
    "req_code": "KJT&请求方代号，KJT ",
    "fre_consume_seq": "123&基金份额冻结号",
};

//协议支付
var ALIPAY = {
    "pay_product_code": "51&51-快捷借记卡，52-快捷贷记卡",
    "amount": "0.01&应付金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "token_id": "&协议号用协议支付-签约触发短信验证,协议支付-签约确认获得该值,参考:1.协议支付-签约触发短信验证 2.协议支付-签约确认 3.协议支付-签约结果查询 如过该参数有值,签约并支付及后面的参数都无效",
    "signing_pay": "&签约并支付:需要使用时固定传:Y,新卡第一次签约快捷通时使用,加上下面的银行卡四要素参数进行签约支付.第二次使用必须传tonken_id参数.",
    "bank_card_no": "&银行卡号，字母数字signing_pay=Y时必填",
    "phone_num": "&手机号码，数字signing_pay=Y时必填",
    "bank_account_name": "&银行卡账户名，不能包含数字signing_pay=Y时必填",
    "certificates_type": "&证件类型参考附录证件类型signing_pay=Y时必填",
    "certificates_number": "&证件号码signing_pay=Y时必填"


};

//直接支付
var ALIPAYSMQ = {
    "pay_product_code": "&支付产品码36：支付宝-扫码支付",
    "amount": "&应付金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "bank_card_no": "&银行卡号，字母数字",
    "phone_num": "&手机号码，数字",
    "bank_account_name": "&银行卡账户名，不能包含数字",
    "certificates_type": "01&证件类型参考附录证件类型signing_pay=Y时必填",
    "certificates_number": "&证件号码signing_pay=Y时必填",
    "cvv2": "&安全码，信用卡必传",
    "valid_date": "2020/11&信用卡有效期YYYY/MM"
};
