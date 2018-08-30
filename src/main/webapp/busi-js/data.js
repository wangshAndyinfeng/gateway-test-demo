
var data1={"instant_trade":instant_trade,
    "ensure_trade":ensure_trade,
    "query_member_name":query_member_name,
    "query_support_bank_and_limit_list":query_support_bank_and_limit_list,
    "query_account_balance_list":query_account_balance_list,
    "entry_account_offline":entry_account_offline,
    "card_register_apply":card_register_apply,
    "card_register_advance":card_register_advance,
    "card_register_query":card_register_query,
    "card_register_abandon":card_register_abandon,
    "certification_pay":certification_pay,
    "certification_pay_confirm":certification_pay_confirm,
    "card_register_and_pay":card_register_and_pay,
    "card_register_and_pay_confirm":card_register_and_pay_confirm,
    "trade_refund":trade_refund,
    "trade_close":trade_close,
    "trade_query":trade_query,
    "card_bin_query":card_bin_query
};


var enToCN={"instant_trade":"即时到账",
    "ensure_trade":"担保交易",
    "query_member_name":"会员名称查询",
    "query_support_bank_and_limit_list":"限额查询",
    "query_account_balance_list":"余额查询",
    "entry_account_offline":"登帐服务网关接口",
    "card_register_apply":"协议支付-签约触发短信验证",
    "card_register_advance":"协议支付-签约确认",
    "card_register_query":"协议支付-签约结果查询",
    "card_register_abandon":"协议支付-解约",
    "certification_pay":"协议支付-支付申请",
    "certification_pay_confirm":"协议支付--支付确认",
    "card_register_and_pay":"协议支付- 签约并支付申请",
    "card_register_and_pay_confirm":"协议支付- 签约并支付确认",
    "trade_refund":"退款接口",
    "trade_close":"交易关闭接口",
    "trade_query":"交易查询接口",
    "card_bin_query":"银行卡bin查询接口"
};


var paymethod={"网银页面":unionpay,
    "条码-主扫":WECHAT,
    "条码-公众号":WECHATSMQ,
    "余额支付":WECHATAPP,
    "基金支付":WECHATH5,
    "协议支付":ALIPAY,
    "直接支付":ALIPAYSMQ,
    "收银台": null
};