

//即时到账
var instant_trade = {"payer_identity_type":"1&买家标识类型，买家快捷通会员标识类型，默认1,1-快捷通会员ID,2-快捷通会员登录号",
    "payer_identity":"anonymous&买家会员ID或登录账号；如没有快捷通会员ID和登录账号，则填写固定值anonymous,非空",
    "payer_platform_type":"1&买家平台类型，固定值：1",
    "payer_ip":"&买家公网IP地址，用户在商户平台下单时候的ip地址，非商户服务器的ip地址，公网IP,6-32位,非空",
    "pay_method":"&支付方式，根据不同的业务场景选择合适的支付方式，参考支付方式参数PayMethod",
    "inexpectant_pay_product_code":"&不期望使用的支付产品，多个用,隔开，参考附录 支付产品码列表,收银台将不展示此支付产品",
    "biz_product_code":"20601&业务产品码20601-即时到帐-电商20401-即时到帐-互金20602-线下收单（支持T0退款)20701-收单（先分账后结算）,非空",
    "cashier_type":"&收银台类型选择SDK收银台时，网关不会跳转到收银台页面而是返回trade_token如trade_token:3baed917-9003-484a-9f48-9dbe3116e2f4,非空",
    "timeout_express":"15m&订单允许的最晚付款时间，该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：10m～7d。m-分钟，h-小时，d-天。默认2h。该参数数值不接受小数点，如 1.5h，可转换为 90m",
    "trade_info":"&交易信息，交易信息参数TradeInfo,非空",
    "terminal_info":"&终端信息域，存放终端类型(terminal_type，取值参考附录 终端类型列表)、ip(ip)等信息字段,非空",
    "merchant_custom":"&商户自定义域：是否自动跳转收银台(go_cashier),默认Y，传N不跳转。商户业务分类...",
    "return_url":"&快捷通处理完请求后，当前页面自动跳转到商户网站里指定页面的http/https路径"};

//担保交易 1.0
//担保交易合并支付1.1
var ensure_trade = {"payer_identity_type":"1&买家标识类型，买家快捷通会员标识类型，默认1,1-快捷通会员ID,2-快捷通会员登录号",
    "payer_identity":"anonymous&买家会员ID或登录账号；如没有快捷通会员ID和登录账号，则填写固定值anonymous,非空",
    "payer_platform_type":"1&买家平台类型，固定值：1",
    "payer_ip":"&买家公网IP地址，用户在商户平台下单时候的ip地址，非商户服务器的ip地址，公网IP,6-32位,非空",
    "pay_method":"&支付方式，根据不同的业务场景选择合适的支付方式，参考支付方式参数PayMethod",
    "inexpectant_pay_product_code":"&不期望使用的支付产品，多个用,隔开，参考附录 支付产品码列表,收银台将不展示此支付产品",
    "biz_product_code":"20601&业务产品码20601-即时到帐-电商20401-即时到帐-互金20602-线下收单（支持T0退款)20701-收单（先分账后结算）,非空",
    "cashier_type":"&收银台类型选择SDK收银台时，网关不会跳转到收银台页面而是返回trade_token如trade_token:3baed917-9003-484a-9f48-9dbe3116e2f4,非空",
    "timeout_express":"15m&订单允许的最晚付款时间，该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：10m～7d。m-分钟，h-小时，d-天。默认2h。该参数数值不接受小数点，如 1.5h，可转换为 90m",
    "trade_info":"&交易信息，交易信息参数TradeInfo,非空",
    "terminal_info":"&终端信息域，存放终端类型(terminal_type，取值参考附录 终端类型列表)、ip(ip)等信息字段,非空",
    "merchant_custom":"&商户自定义域：是否自动跳转收银台(go_cashier),默认Y，传N不跳转。商户业务分类...",
    "return_url":"&快捷通处理完请求后，当前页面自动跳转到商户网站里指定页面的http/https路径"};


//及时到账tradeInfo
var trade_info_instant= {"out_trade_no":"平台(商户)订单号，字母数字下划线，确保每笔订单唯一,非空",
    "subject":"商品名称，商品的标题/交易标题/订单标题/订单关键字等,非空",
    "currency":"币种，默认人民币CNY",
    "price":"商品单价，取值范围为[0.01，100000000000.00]，精确到小数点后两位,非空",
    "quantity":"商品数量，数字,非空",
    "total_amount":"交易金额，交易金额=(商品单价×商品数量,非空",
    "payee_identity_type":"卖家标识类型，1-卖家会员ID 2-卖家登录账号",
    "payee_identity":"卖家会员ID或登录账号,非空",
    "biz_no":"业务号，收支明细的备注，对账用",
    "show_url":"商品展示URL，收银台页面上，商品展示的超链接",
    "notify_url":"服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "ensure_amount":"担保金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "gold_coin":"金币金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。",
    "deposit_amount":"使用订金金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。deposit_no非空时该字段非空",
    "deposit_no":"订金下订的平台(商户)网站唯一订单号，字母数字下划线，deposit_amount非空时该字段非空",
    "trade_ext":"交易扩展参数",
    "royalty_info":"分润账号集，最多支持10个分润账号参考分润账号参数"};

//担保交易tradeInfo
var trade_info_ensure= {"out_trade_no":"平台(商户)订单号，字母数字下划线，确保每笔订单唯一,非空",
    "subject":"商品名称，商品的标题/交易标题/订单标题/订单关键字等,非空",
    "currency":"币种，默认人民币CNY",
    "price":"商品单价，取值范围为[0.01，100000000000.00]，精确到小数点后两位,非空",
    "quantity":"商品数量，数字,非空",
    "total_amount":"交易金额，交易金额=(商品单价×商品数量,非空",
    "payee_identity_type":"卖家标识类型，1-卖家会员ID 2-卖家登录账号",
    "payee_identity":"卖家会员ID或登录账号,非空",
    "biz_no":"业务号，收支明细的备注，对账用",
    "show_url":"商品展示URL，收银台页面上，商品展示的超链接",
    "notify_url":"服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "ensure_amount":"担保金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位,非空",
    "trade_ext":"交易扩展参数"};


var royalty_info = {"payee_identity_type":"1&分账标识类型，默认1，1-快捷通会员ID,2-快捷通会员登录号",
    "payee_member_id":"&分账标识，分账收款方会员ID或登录号，与分账标识类型配合使用",
    "payee_account_no":"&分账收款方账户号",
    "amount":"0.01&分账金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位。"};


var terminal_info = {
    "terminal_type":"00&00电脑01手机02平板设备03可穿戴设备04数字电视99其他",
    "ip":"122.224.203.210&ip(ip)等信息字段",

}

var merchant_custom = {
   "go_cashier" :"N&(商户自定义域：是否自动跳转收银台(go_cashier),默认Y，传N不跳转。",
   "merchant_biz_type":"&商户合并标记号（合并账单）",
    "merchant_merge_flag":"&会在交易记录，统一账单、日账单体现商户特色业务。可空)"
}


var cashier_type = {
    "WEB" :"WEB收银台",
    "H5":"需登录H5收银台",
    "SDK":"SDK收银台"
}