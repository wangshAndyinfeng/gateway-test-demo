

//登帐服务网关接口
var entry_account_offline = {"out_trade_no":"(字母数字下划线，与快捷通交易订单号(trade_no)二选一),非空",
    "bank_code":"银行编码,非空",
    "amount":"金额,非空",
    "member_id":"快捷通会员ID,非空",
    "biz_product_code":"业务产品码,非空",
    "notify_url":"异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态"};


//协议支付-签约触发短信验证 card_register_apply 公共请求参数中版本号使用1.1
var card_register_apply = {"bank_account_name":"银行卡账户名，不能包含数字,非空",
    "certificates_type":"证件类型,非空",
    "certificates_number":"证件号码，与证件类型匹配使用",
    "bank_card_no":"银行卡号，字母数字,非空",
    "cvv2":"安全码，信用卡必传",
    "valid_date":"信用卡有效期YYYY/MM",
    "phone_num":"手机号码,非空",
    "pay_product_code":"支付产品码,非空",
    "extension":"备注"};

// 协议支付-签约确认
var card_register_advance = {"token_id":"银行卡协议号,非空",
    "verify_code":"手机验证码,非空",
    "extension":"备注"};

//协议支付-签约结果查询 公共请求参数中版本号使用1.1
var card_register_query = {"bank_card_no":"银行卡号，字母数字,非空",
    "pay_product_code":"支付产品码,非空"};


// 协议支付-解约
var card_register_abandon = {"token_id":"银行卡号，字母数字,非空"};


//  协议支付-支付申请
var certification_pay = {"payer_identity_type":"买家标识类型，买家快捷通会员标识类型，默认1 1-快捷通会员ID 2-快捷通会员登录号",
    "payer_identity":"买家会员ID或登录账号 如没有快捷通会员ID和登录账号，则填写固定值：anonymous ,非空",
    "payer_platform_type":"买家平台类型，固定值：1",
    "payer_ip":"买家公网IP地址，用户在商户平台下单时候的ip地址，非商户服务器的ip地址，公网IP,6-32位,非空",
    "pay_method":"支付方式，根据不同的业务场景选择合适的支付方式，参考支付方式参数PayMethod,非空",
    "biz_product_code":"业务产品码支持列表,非空",
    "token_id":"协议号： 银行卡签约授权中返回的token_id,非空",
    "timeout_express":"订单允许的最晚付款时间，该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：10m～7d。m-分钟，h-小时，d-天。默认2h。该参数数值不接受小数点，如 1.5h，可转换为 90m",
    "trade_info":"交易信息，交易信息参数TradeInfo,非空",
    "terminal_info":"终端信息域，存放终端类型(terminal_type，取值参考附录 终端类型列表)、ip(ip)等信息字段,非空",
    "merchant_custom":"商户自定义域：商户业务分类(merchant_biz_type)、商户合并标记号（合并账单）(merchant_merge_flag)会在交易记录，统一账单、日账单体现商户特色业务。\n",
    "return_url":"快捷通处理完请求后，当前页面自动跳转到商户网站里指定页面的http/https路径"};


//  协议支付--支付确认
var certification_pay_confirm = {"phone_check_code":"手机验证码,非空",
    "pay_token":"支付接口返回的支付token（有效期5分钟）,非空"};

//协议支付- 签约并支付申请
var card_register_and_pay = {"payer_identity_type":"买家标识类型，买家快捷通会员标识类型，默认1 1-快捷通会员ID 2-快捷通会员登录号",
    "payer_identity":"买家会员ID或登录账号 如没有快捷通会员ID和登录账号，则填写固定值：anonymous ,非空",
    "payer_platform_type":"买家平台类型，固定值：1",
    "payer_ip":"买家公网IP地址，用户在商户平台下单时候的ip地址，非商户服务器的ip地址，公网IP,6-32位,非空",
    "pay_method":"支付方式，根据不同的业务场景选择合适的支付方式，参考支付方式参数PayMethod,非空",
    "biz_product_code":"业务产品码支持列表,非空",
    "bank_card_no":"银行卡号，字母数字,非空",
    "phone_num":"手机号码,非空",
    "bank_card_name":"银行卡账户名，不能包含数字,非空",
    "cvv2":"安全码，信用卡必传",
    "valid_date":"信用卡有效期YYYY/MM",
    "certificates_type":"证件类型参考附录证件类型,非空",
    "certificates_number":"证件号码,非空",
    "timeout_express":"订单允许的最晚付款时间，该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：10m～7d。m-分钟，h-小时，d-天。默认2h。该参数数值不接受小数点，如 1.5h，可转换为 90m",
    "trade_info":"交易信息，交易信息参数TradeInfo,非空",
    "terminal_info":"终端信息域，存放终端类型(terminal_type，取值参考附录 终端类型列表)、ip(ip)等信息字段,非空",
    "merchant_custom":"商户自定义域：商户业务分类(merchant_biz_type)、商户合并标记号（合并账单）(merchant_merge_flag)会在交易记录，统一账单、日账单体现商户特色业务。\n",
    "return_url":"快捷通处理完请求后，当前页面自动跳转到商户网站里指定页面的http/https路径"};

// 协议支付- 签约并支付确认
var card_register_and_pay_confirm = {"phone_check_code":"手机验证码,非空",
    "pay_token":"支付接口返回的支付token（有效期5分钟）,非空",
    "token_id":"签约协议号,非空"};


// 退款接口
var trade_refund = {"out_trade_no":"平台(商户)退款订单号，字母数字下划线，确保每笔订单唯一,非空",
    "orig_out_trade_no":"平台(商户)原始订单号，快捷通合作平台(商户) 原始的网站唯一订单号,非空",
    "refund_amount":"退款金额，15位以内最大保留2位精度数字，支持部分退款，退款金额不能大于交易金额如：50.00,非空",
    "currency":"币种，默认人民币CNY",
    "deposit_amount":"金额保留字段(退款订金金额)，15位以内最大保留2位精度数字",
    "gold_coin":"金额保留字段(退款金币金额)，15位以内最大保留2位精度数字",
    "ensure_amount":"金额保留字段（退款担保金额），15位以内最大保留2位精度数字。退款金额>=退款担保金额",
    "royalty_info":"分润账号集，最多支持10个分润账号参考分润账号参数",
    "notify_url":"异步回调地址，交易处理完后快捷通异步回调商户的通知地址，通知退款成功或失败"
};


// 交易关闭接口
var trade_close = {"out_trade_no":"与trade_no二选一平台(商户)订单号，字母数字下划线,非空",
    "trade_no":"与out_trade_no二选一快捷通交易订单号，字母数字下划线,非空"}

    //交易查询接口
var trade_query = {"out_trade_no":"与trade_no二选一平台(商户)订单号，字母数字下划线,非空",
        "trade_no":"与out_trade_no二选一快捷通交易订单号，字母数字下划线,非空"}

//银行卡bin查询接口
var card_bin_query = {"bank_card_no":"银行卡号，字母数字,非空"}