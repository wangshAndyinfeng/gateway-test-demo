

//登帐服务网关接口
var entry_account_offline = {"out_trade_no":"&(字母数字下划线，与快捷通交易订单号(trade_no)二选一),非空",
    "bank_code":"&银行编码,非空",
    "amount":"0.01&金额,非空",
    "member_id":"&快捷通会员ID,非空",
    "biz_product_code":"&业务产品码,非空",
    "notify_url":"&异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态"};


//协议支付-签约触发短信验证 card_register_apply 公共请求参数中版本号使用1.1
var card_register_apply1 = {"bank_account_name":"&银行卡账户名，不能包含数字,非空",
    "certificates_type":"&证件类型,非空",
    "certificates_number":"&证件号码，与证件类型匹配使用",
    "bank_card_no":"&银行卡号，字母数字,非空",
    "cvv2":"&安全码，信用卡必传",
    "valid_date":"&信用卡有效期YYYY/MM",
    "phone_num":"&手机号码,非空",
    "pay_product_code":"&支付产品码,非空",
    "extension":"&备注"};

//支付认证接口 （注:跟协议支付-签约触发短信验证 公用接口不过 但是版本为1.0） card_register_apply
var card_register_apply = {"bank_account_name":"&银行卡账户名，不能包含数字,非空",
    "certificates_type":"&证件类型,非空",
    "certificates_number":"&证件号码，与证件类型匹配使用",
    "bank_card_no":"&银行卡号，字母数字,非空",
    "cvv2":"&安全码，信用卡必传",
    "phone_num":"&手机号码,非空",
    "extension":"&备注"};


// 协议支付-签约确认
var card_register_advance = {"token_id":"&银行卡协议号,非空",
    "verify_code":"&手机验证码,非空",
    "extension":"&备注"};

//协议支付-签约结果查询 公共请求参数中版本号使用1.1
var card_register_query = {"bank_card_no":"&银行卡号，字母数字,非空",
    "pay_product_code":"&支付产品码,非空"};


// 协议支付-解约
var card_register_abandon = {"token_id":"&银行卡号，字母数字,非空"};


//  协议支付-支付申请
var certification_pay = {"payer_identity_type":"1&买家标识类型，买家快捷通会员标识类型，默认1 1-快捷通会员ID 2-快捷通会员登录号",
    "payer_identity":"anonymous&买家会员ID或登录账号 如没有快捷通会员ID和登录账号，则填写固定值：anonymous ,非空",
    "payer_platform_type":"1&买家平台类型，固定值：1",
    "payer_ip":"&买家公网IP地址，用户在商户平台下单时候的ip地址，非商户服务器的ip地址，公网IP,6-32位,非空",
    "pay_method":"&支付方式，根据不同的业务场景选择合适的支付方式，参考支付方式参数PayMethod,非空",
    "biz_product_code":"&业务产品码支持列表,非空",
    "token_id":"&协议号： 银行卡签约授权中返回的token_id,非空",
    "timeout_express":"15m&订单允许的最晚付款时间，该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：10m～7d。m-分钟，h-小时，d-天。默认2h。该参数数值不接受小数点，如 1.5h，可转换为 90m",
    "trade_info":"&交易信息，交易信息参数TradeInfo,非空",
    "terminal_info":"&终端信息域，存放终端类型(terminal_type，取值参考附录 终端类型列表)、ip(ip)等信息字段,非空",
    "merchant_custom":"&商户自定义域：商户业务分类(merchant_biz_type)、商户合并标记号（合并账单）(merchant_merge_flag)会在交易记录，统一账单、日账单体现商户特色业务。\n",
    "return_url":"&快捷通处理完请求后，当前页面自动跳转到商户网站里指定页面的http/https路径"};


//  协议支付--支付确认
var certification_pay_confirm = {"phone_check_code":"&手机验证码,非空",
    "pay_token":"&支付接口返回的支付token（有效期5分钟）,非空"};

//  协议支付--支付确认
var agreement_pay_confirm = {"phone_check_code":"&手机验证码,非空",
    "pay_token":"&支付接口返回的支付token（有效期5分钟）,非空"};

//协议支付- 签约并支付申请
var card_register_and_pay = {"payer_identity_type":"1&买家标识类型，买家快捷通会员标识类型，默认1 1-快捷通会员ID 2-快捷通会员登录号",
    "payer_identity":"anonymous&买家会员ID或登录账号 如没有快捷通会员ID和登录账号，则填写固定值：anonymous ,非空",
    "payer_platform_type":"1&买家平台类型，固定值：1",
    "payer_ip":"122.224.203.210&买家公网IP地址，用户在商户平台下单时候的ip地址，非商户服务器的ip地址，公网IP,6-32位,非空",
    "pay_method":"&支付方式，根据不同的业务场景选择合适的支付方式，参考支付方式参数PayMethod,非空",
    "biz_product_code":"&业务产品码支持列表,非空",
    "bank_card_no":"&银行卡号，字母数字,非空",
    "phone_num":"&手机号码,非空",
    "bank_account_name":"&银行卡账户名，不能包含数字,非空",
    "cvv2":"&安全码，信用卡必传",
    "valid_date":"&信用卡有效期YYYY/MM",
    "certificates_type":"&证件类型参考附录证件类型,非空",
    "certificates_number":"&证件号码,非空",
    "timeout_express":"15m&订单允许的最晚付款时间，该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：10m～7d。m-分钟，h-小时，d-天。默认2h。该参数数值不接受小数点，如 1.5h，可转换为 90m",
    "trade_info":"&交易信息，交易信息参数TradeInfo,非空",
    "terminal_info":"&终端信息域，存放终端类型(terminal_type，取值参考附录 终端类型列表)、ip(ip)等信息字段,非空",
    "merchant_custom":"&商户自定义域：商户业务分类(merchant_biz_type)、商户合并标记号（合并账单）(merchant_merge_flag)会在交易记录，统一账单、日账单体现商户特色业务。\n",
    "return_url":"&快捷通处理完请求后，当前页面自动跳转到商户网站里指定页面的http/https路径"};

// 协议支付- 签约并支付确认
var card_register_and_pay_confirm = {"phone_check_code":"&手机验证码,非空",
    "pay_token":"&支付接口返回的支付token（有效期5分钟）,非空",
    "token_id":"&签约协议号,非空"};


// 退款接口
var trade_refund = {"out_trade_no":"&平台(商户)退款订单号，字母数字下划线，确保每笔订单唯一,非空",
    "orig_out_trade_no":"&平台(商户)原始订单号，快捷通合作平台(商户) 原始的网站唯一订单号,非空",
    "refund_amount":"0.01&退款金额，15位以内最大保留2位精度数字，支持部分退款，退款金额不能大于交易金额如：50.00,非空",
    "currency":"CNY&币种，默认人民币CNY",
    "deposit_amount":"&金额保留字段(退款订金金额)，15位以内最大保留2位精度数字",
    "gold_coin":"&金额保留字段(退款金币金额)，15位以内最大保留2位精度数字",
    "ensure_amount":"&金额保留字段（退款担保金额），15位以内最大保留2位精度数字。退款金额>=退款担保金额",
    "royalty_info":"&分润账号集，最多支持10个分润账号参考分润账号参数",
    "notify_url":"&异步回调地址，交易处理完后快捷通异步回调商户的通知地址，通知退款成功或失败"
};


// 交易关闭接口
var trade_close = {"out_trade_no":"&与trade_no二选一平台(商户)订单号，字母数字下划线,非空",
    "trade_no":"&与out_trade_no二选一快捷通交易订单号，字母数字下划线,非空"}

    //交易查询接口
var trade_query = {"out_trade_no":"&与trade_no二选一平台(商户)订单号，字母数字下划线,非空",
        "trade_no":"&与out_trade_no二选一快捷通交易订单号，字母数字下划线,非空"}

//银行卡bin查询接口
var card_bin_query = {"bank_card_no":"&银行卡号，字母数字,非空"}


//外场转账
var transfer_to_external = {"out_trade_no":"&平台(商户)退款订单号，字母数字下划线，确保每笔订单唯一,非空",
    "biz_product_code":"&业务产品码90204-外场转账",
    "amount":"0.01&转账金额，15位以内最大保留2位精度数字",
    "payee_name":"&收款人银行卡户名，不能包含数字",
    "payee_card_no":"&收款人银行卡号，字母数字",
    "payee_card_attribute":"C&收款人银行卡对公对私属性，C-对私B-对公",
    "bank_line_no":"&收款人分支行行号",
    "bank_branch_name":"&收款人分支行名称",
    "bank_prov":"&收款人分支行所在省",
    "bank_city":"&收款人分支行所在市",
    "memo":"&转账备注",
    "pay_method":"&支付方式，JSON格式，参考支付方式",
    "pay_param":"&支付参数，JSON格式，参考支付参数",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "trade_ext":"&交易扩展参数，JSON格式",
};

//银行卡代扣支付参数 1
var pay_param1 = {
    "payer_identity_type":"1&付款人快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payer_identity":"&付款人会员ID或登录账号",
    "phone_num":"&付款人手机号，与付款人协议号互斥",
    "payer_name":"&付款人银行卡户名，不能包含数字，与付款人协议号互斥",
    "payer_cert_no":"&付款人证件号，与付款人协议号互斥",
    "payer_card_no":"&付款人银行卡号，与付款人协议号互斥",
    "token_id":"&付款人协议号，与付款人手机号、银行卡户名、证件号、银行卡号互斥",
}

//基金支付参数 2
var pay_param2 = {
    "payer_identity_type":"1&付款人快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payer_identity":"&付款人会员ID或登录账号",
    "platform_type":"1&平台类型，固定值1，默认1",
    "req_code":"&请求方代号，HRY-海融易",
    "fre_consume_seq":"&基金份额冻结号",
}

//银行卡代扣
var trade_bank_witholding = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "bank_account_name":"&银行卡账户名，不能包含数字",
    "certificates_type":"&证件类型，参考附录 证件类型",
    "certificates_number":"&证件号码",
    "bank_card_no":"&银行卡号，字母数字",
    "bank_code":"&银行编码，字母",
    "token_id":"&协议号，字母数字下划线，当协议号非空时，以协议号匹配的信息为准",
    "payable_amount":"&交易金额，15位以内最大保留2位精度数字",
    "currency":"CNY&币种，默认人民币CNY",
    "authorize_no":"&代扣授权号，字母数字下划线，平台(商户)与客户签订的授权协议号",
    "payee_identity_type":"1&入款快捷通会员标识类型，默认1 1-快捷通会员ID 2-快捷通会员登录号",
    "payee_identity":"&入款账号",
    "royalty_info":"&分润账号集，最多支持10个分润账号参考",
    "biz_product_code":"&业务产品码20204-银行卡代扣",
    "pay_product_code":"61&支付产品码61-银行卡代扣-借记卡62-银行卡代扣-信用卡63-银行卡代扣-对公",
    "phone_num":"&手机号码",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态"
}

//余额申购基金
var fund_purchase_balance ={
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "identity_type":"1&标识类型，快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "identity":"&商户/平台/子商户下申购基金的快捷通会员ID或登录账号，与identity_type配合使用",
    "req_channel":"W&交易渠道H-H5,M--移动，W--web",
    "amount":"0.01&交易金额，单位元，取值范围为[0.01，100000000000.00]，精确到小数点后两位",
    "memo":"&备注",
}

//转账到银行卡
var transfer_to_card = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "payer_identity_type":"1&出款快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payer_identity":"&出款账号",
    "amount":"0.01&出款金额，15位以内最大保留2位精度数字",
    "currency":"CNY&币种，默认人民币CNY",
    "bank_card_no":"&银行卡号，字母数字",
    "bank_account_name":"&银行卡账户名，不能包含数字",
    "bank_code":"&银行编码，字母",
    "bank_name":"&银行名称",
    "bank_branch_name":"&银行分支行名称",
    "token_id":"&协议号，字母数字下划线，当协议号非空时，以协议号匹配的信息为准",
    "bank_line_no":"&分支行行号。若为大额或者对公出款，该字段务必填写。否则可能会出现部分银行出款失败或者出款被退票等现象",
    "bank_prov":"&分支行所在省",
    "bank_city":"&分支行所在市",
    "biz_product_code":"&业务产品码20204-银行卡代扣",
    "pay_product_code":"61&支付产品码61-银行卡代扣-借记卡62-银行卡代扣-信用卡63-银行卡代扣-对公",
    "memo":"&出款目的",
    "biz_no":"&业务号，对账用",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态"
}

//批量转账到银行卡
var batch_transfer_card = {
    "out_batch_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "transfer_num":"&转账总笔数，每批次最多1000笔",
    "transfer_amount":"&转账总金额，15位以内最大保留2位精度数字",
    "transfer_list":"&转账列表，参考转账列表参数CardPartyInfo",
    "biz_product_code":"&业务产品码10220-付款到卡（次日）10221-付款到卡（普通）",
    "payer_identity_type":"1&出款快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payer_identity":"&出款账号",
    "currency":"CNY&币种，默认人民币CNY",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "memo":"&出款目的"
}

//转账列表参数
var CardPartyInfo = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "amount":"0.01&出款金额，15位以内最大保留2位精度数字",
    "bank_card_no":"&银行卡号，字母数字",
    "bank_account_name":"&银行卡账户名，不能包含数字",
    "bank_code":"&银行编码，字母",
    "bank_name":"&银行名称",
    "bank_branch_name":"&银行分支行名称",
    "token_id":"&协议号，字母数字下划线，当协议号非空时，以协议号匹配的信息为准",
    "bank_line_no":"&分支行行号。若为大额或者对公出款，该字段务必填写。否则可能会出现部分银行出款失败或者出款被退票等现象",
    "bank_prov":"&分支行所在省",
    "bank_city":"&分支行所在市",
    "pay_product_code":"61&支付产品码61-银行卡代扣-借记卡62-银行卡代扣-信用卡63-银行卡代扣-对公",
    "memo":"&出款目的",
}



//转账到账户
var transfer_to_account = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "payer_identity_type":"1&出款快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payer_identity":"&出款账号",
    "payee_identity_type":"1&入款快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payee_identity":"&入款账号",
    "transfer_amount":"0.01&转账金额，15位以内最大保留2位精度数字",
    "currency":"CNY&币种，默认人民币CNY",
    "biz_product_code":"&业务产品码20204-银行卡代扣",
    "memo":"&出款目的",
    "biz_no":"&业务号，对账用",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态"
}

//批量转账到账户
var batch_transfer_account = {
    "out_batch_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "transfer_num":"&转账总笔数，每批次最多1000笔",
    "transfer_amount":"&转账总金额，15位以内最大保留2位精度数字",
    "transfer_list":"&转账列表，参考转账列表参数CardPartyInfo",
    "biz_product_code":"&业务产品码10220-付款到卡（次日）10221-付款到卡（普通）",
    "payer_identity_type":"1&出款快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payer_identity":"&出款账号",
    "currency":"CNY&币种，默认人民币CNY",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "memo":"&出款目的",
}

var AcctPartyInfo = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "amount":"0.01&出款金额，15位以内最大保留2位精度数字",
    "payee_identity_type":"1&入款快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号",
    "payee_identity":"&入款账号",
    "memo":"&出款目的",
}

//子商户注册
var sub_merchant_registration = {
    "partner_user_id":"&平台方分配给用户的唯一标识",
    "customer_type":"1&客户类型 1:企业 2:个体工商户3:个人商家",
    "name":"&企业、个体工商户法人/个人商家姓名",
    "id_card":"&企业、个体工商户法人/个人商家身份证号码",
    "id_card_validity":"&企业、个体工商户法人/个人商家身份证有效期，长期为：2999-01-01",
    "province":"&企业、个体工商户/个人商家所属省份",
    "city":"&企业、个体工商户/个人商家所属地市",
    "area":"&企业、个体工商户/个人商家所属区县",
    "address":"&企业、个体工商户/个人商家详细地址",
    "phone_num":"&手机号，可为企业、个体工商户法人手机号或业务联系人手机号；如果是个人商家注册，则必须为个人商家银行卡预留手机号",
    "company_or_person":"&银行卡类别，B：对公，C：对私",
    "bank_card_no":"&结算银行卡号，不支持信用卡和存折账号，只支持借记卡",
    "bank_account_name":"&银行卡户名1、企业与公司名称一致2、个体工商户如果是对私银行卡，与法人姓名一致，如果是对公银行卡，与个体工商户名称一致;3、个人商家：银行卡户名必须与注册的姓名一致",
    "bank_code":"&开户银行编码,详情参考附录",
    "bank_name":"&开户行名称",
    "bank_prov":"&开户行省份",
    "bank_city":"&开户行城市",
    "bank_branch_name":"&开户银行支行名称",
    "bank_line_no":"&分支行行号",
    "id_card_front":"&企业、个体工商户法人/个人商家身份证正面影印件（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "id_card_back":"&企业、个体工商户法人/个人商家身份证反面影印件（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg.ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "bank_card_photo":"&银行卡有卡号一面的照片（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件，个人商家/个体工商户非空，企业商家可空",
    "holding_id_card_front_photo":"&手持身份证照片，手持身份证的正面的照片（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件，个人商家/个体工商户非空，企业商家可空",
    "holding_bank_card_photo":"&手持银行卡照片，手持银行卡有卡号一面的照片（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件，个人商家/个体工商户非空，企业商家可空",
    "shop_photo":"&门店照，企业个体工商户至少3张,逗号”,”分隔; 个人商家，至少1张. （填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "company_property":"&企业/个体工商户注册则非空,企业/个体工商户注册请求参数扩展",
    "extension":"&扩展备注，商户自定义，如需使用，请与技术支持联系",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
}

//企业/个体工商户注册请求参数扩展
var extension = {
    "company_name":"&企业、个体工商户名称。子商户注册接口必填，准入资料重提接口可空，需与注册时提交的企业名称一致。",
    "three_cert_flag":"0&是否三证合一标志,个体工商户，该字段可空，企业非空。1:是;0:否。",
    "business_license_no":"&营业执照号，如果企业三证合一标志为是，则三证合一证件信息填到营业执照号字段",
    "business_license_validity":"&营业执照有效期，长期有效默认传2999-01-01",
    "organization_code":"&组织机构代码证号，如果企业三证合一或为个体工商户，则可空",
    "tax_registry_no":"税务登记证号,如果企业三证合一，该字段可空",
    "website_url":"&经营网址，如果为线上商户，则非空",
    "icp_no":"&ICP证（备案）号，如果为线上商户，则非空",
    "business_license_photocopy":"营业执照影印件的地址（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "organization_code_photocopy":"&组织机构代码证影印件，如果企业三证合一或为个体工商户，该字段则可空（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "tax_registry_photocopy":"&税务登记影印件，如果企业三证合一，该字段则可空（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "bank_account_licence_photocopy":"&开户许可证影印件（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件，个体工商户可空，企业商户非空",
    "email":"&邮箱，商户联系人邮箱",
    "qualification_pic":"特殊行业资质照片，特殊行业：宾馆、饭店、食品、医疗等，需要提供特殊行业资质照片（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件"
}


//准入资料重提网关接口
var resubmission_information = {
    "partner_user_id":"&平台方分配给用户的唯一标识",
    "identity_id":"&快捷通分配给平台方子商户的会员ID，与partner_user_id二选一。",
    "customer_type":"1&客户类型 1:企业 2:个体工商户3:个人商家",
    "id_card_validity":"&企业、个体工商户法人/个人商家身份证有效期，长期为：2999-01-01",
    "id_card_front":"&企业、个体工商户法人/个人商家身份证正面影印件（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "id_card_back":"&企业、个体工商户法人/个人商家身份证反面影印件（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg.ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "bank_card_photo":"&银行卡有卡号一面的照片（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件，个人商家/个体工商户非空，企业商家可空",
    "holding_id_card_front_photo":"&手持身份证照片，手持身份证的正面的照片（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件，个人商家/个体工商户非空，企业商家可空",
    "holding_bank_card_photo":"&手持银行卡照片，手持银行卡有卡号一面的照片（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件，个人商家/个体工商户非空，企业商家可空",
    "shop_photo":"&门店照，企业个体工商户至少3张,逗号”,”分隔; 个人商家，至少1张. （填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "company_property":"&企业/个体工商户注册则非空,企业/个体工商户注册请求参数扩展",
    "extension":"&扩展备注，商户自定义，如需使用，请与技术支持联系",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
}

//子商户注册查询
var sub_merchant_registered_query = {
    "partner_user_id":"&平台用户ID，平台方分配给用户的唯一标识，与identity_id二选一。优先级高",
    "identity_id":"&快捷通分配给平台方子商户的会员ID，与partner_user_id二选一。"
}

//子商户结算银行账户变更
var sub_merchant_change_bankcard = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "partner_user_id":"&平台方分配给用户的唯一标识",
    "identity_id":"&快捷通分配给平台方子商户的会员ID，与partner_user_id二选一。",
    "new_bankcard_no":"&变更新的结算银行卡号，不支持信用卡和存折账号，只支持借记卡",
    "bank_account_name":"&银行卡户名1、企业与公司名称一致2、个体工商户如果是对私银行卡，与法人姓名一致，如果是对公银行卡，与个体工商户名称一致;3、个人商家：银行卡户名必须与注册的姓名一致",
    "bank_code":"&开户银行编码,详情参考附录",
    "bank_name":"&开户行名称",
    "bank_prov":"&开户行省份",
    "bank_city":"&开户行城市",
    "bank_branch_name":"&开户银行支行名称",
    "company_or_person":"&结算银行账户信息变更表，对公卡，加盖公章，对私卡手写签字（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "bank_account_change_photo":"&结算银行账户信息变更表，对公卡，加盖公章，对私卡手写签字（填写ftp地址为图片绝对路径+文件名,支持格式：jpg、png、bmp、jpeg,ftp上传地址请联系技术支持并提供商户服务器外网ip）注意别覆盖其它文件",
    "extension":"&扩展备注，商户自定义，如需使用，请与技术支持联系",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
}

//子商户结算银行账户变更查询网关接口
var sub_merchant_change_bankcard_query = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
}

//子商户结算方式变更网关接口
var sub_merchant_change_settle_type = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "partner_user_id":"&平台方分配给用户的唯一标识",
    "identity_id":"&快捷通分配给平台方子商户的会员ID，与partner_user_id二选一。",
    "settle_type":"&结算方式 1、主动提现；2、委托提现",
    "entrust_withdrawal_amount":"&委托提现起结金额 结算方式选择为2时，不可空，字段类型为数值，小数点保留2位，>=0.01的数字，单位：元，例如 当entrust_withdrawal_amount=100时，即当账户的可用余额大于或等于100时才会结算出款",
    "extension":"&扩展备注，商户自定义，如需使用，请与技术支持联系",
}

//子商户主动提现网关接口
var sub_merchant_withdrawal_cash = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "partner_user_id":"&平台方分配给用户的唯一标识",
    "identity_id":"&快捷通分配给平台方子商户的会员ID，与partner_user_id二选一。",
    "biz_product_code":"&业务产品码10220-付款到卡（次日）",
    "pay_product_code":"&支付产品码14-付款到银行卡-对私15-付款到银行卡-对公",
    "withdrawal_amount":"0.01&提现金额，取值范围为[0.01，100000000000.00]，精确到小数点后两位",
    "memo":"&出款目的",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "extension":"&扩展备注，商户自定义，如需使用，请与技术支持联系",
}

//2.10	主动提现查询网关接口  走的交易查询接口trade_query
//2.11	查询账户余额列表网关接口  走的余额查询接口query_account_balance_list

//2.12	查询指定账户余额网关接口
var query_balance_by_account_type = {
    "identity_type":"&标识类型，快捷通会员标识类型，默认1 1-快捷通会员ID2-快捷通会员登录号 ",
    "identity":"&商户/平台/子商户的快捷通会员ID或登录账号，与identity_type配合使用",
    "account_type":"&账户类型，参考附录 账户类型"
}

//账户类型
var account_type ={
    "101":"个人自有资金钱包",
    "201":"企业自有资金钱包",
    "301":"商户自有资金钱包",
    "102":"子商户对私资金钱包",
    "202":"子商户对公资金钱包",
    "305":"基金转入资金钱包",
    "401":"收银钱包",
    "501":"收款专用钱包",
    "601":"出款专用钱包",
}

//2.13	子商户结算银行卡信息查询网关接口
var  query_sub_merchant_bankcard_info = {
    "partner_user_id":"&平台方分配给用户的唯一标识",
    "identity_id":"&快捷通分配给平台方子商户的会员ID，与partner_user_id二选一。",
}

//2.14	申请子商户权限网关接口
var sub_merchant_permission_apply = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
    "partner_user_id":"&平台方分配给用户的唯一标识",
    "identity_id":"&快捷通分配给平台方子商户的会员ID，与partner_user_id二选一。",
    "biz_product_code":"&业务产品码10220-付款到卡（次日）",
    "pay_product_code":"&支付产品码14-付款到银行卡-对私15-付款到银行卡-对公",
    "interface_name":"&申请的接口，申请多个接口，接口名必须用逗号(“,”)号分隔)，参考附录 申请子商户接口权限枚举",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "extension":"&扩展备注，商户自定义，如需使用，请与技术支持联系",
}

//2.15	子商户权限申请查询网关接口
var sub_merchant_permission_apply_query = {
    "out_trade_no":"&平台(商户)订单号，字母数字下划线，确保每笔订单唯一",
}

//扫码进件接口
var qrcode_apply = {
    "out_batch_no":"&平台方请求批次号",
    "identity_id":"&快捷通分配给平台方子商户的会员ID",
    "apply_list":"&扫码进件列表，参考扫码进件列表参数ApplyInfo",
    "notify_url":"&服务器异步通知地址，快捷通主动通知商户网站里指定的URL http/https路径，当订单完成后会回调商户并告知订单状态",
    "memo":"&备注",
}

//2.3.3	扫码进件列表参数ApplyInfo
var apply_list = {
    "out_no":"&平台发起单个扫码支付渠道进件的流水号",
    "pay_type":"&ALIPAY-支付宝WECHAT-微信UPOP-银联JDPAY-京东参考附录 扫码支付类别列表",
    "management_type_id":"&进件经营类别ID(微信：品类ID，支付宝：类目ID，QQ：MCC代码)，传值参考附件《扫码支付经营类别.zip》",
    "apply_custom":"&进件自定义扩展参数",
    "memo":"&备注",
}
//扫码进件接口查询
var qrcode_apply_query = {
    "out_batch_no":"&平台方请求批次号",
    "out_no":"&平台发起单个扫码支付渠道进件的流水号",
    "identity_id":"&快捷通分配给平台方子商户的会员ID",
    "memo":"&备注",
}