package com.netfinworks.gatewaytest.demo.ro;

public interface ServiceNameConstant {

       //即时到账
       String INSTANT_TRADE = "instant_trade";
       //担保交易
       String ENSURE_TRADE = "ensure_trade";
       //会员名称查询
       String QUERY_MEMBER_NAME = "query_member_name";
       //限额查询
       String QUERY_SUPPORT_BANK_AND_LIMIT_LIST= "query_support_bank_and_limit_list";
       //余额查询
       String QUERY_ACCOUNT_BALANCE_LIST = "query_account_balance_list";
       //登帐服务网关接口
       String ENTRY_ACCOUNT_OFFLINE = "entry_account_offline";
       //协议支付-签约触发短信验证
       String CARD_REGISTER_APPLY1 = "card_register_apply1";
       //协议支付-签约确认
       String CARD_REGISTER_ADVANCE = "card_register_advance";
       //协议支付-签约结果查询
       String CARD_REGISTER_QUERY ="card_register_query";
       //协议支付-解约
       String CARD_REGISTER_ABANDON ="card_register_abandon";
       //协议支付-支付申请
       String CERTIFICATION_PAY ="certification_pay";
       //协议支付--支付确认
       String CERTIFICATION_PAY_CONFIRM ="certification_pay_confirm";
       //协议支付- 签约并支付申请
       String CARD_REGISTER_AND_PAY ="card_register_and_pay";
       //协议支付- 签约并支付确认
       String CARD_REGISTER_AND_PAY_CONFIRM ="card_register_and_pay_confirm";
       //认证支付
       String CARD_REGISTER_APPLY ="card_register_apply";
       //退款接口
       String TRADE_REFUND ="trade_refund";
       //交易关闭接口
       String TRADE_CLOSE ="trade_close";
       //交易查询接口
       String TRADE_QUERY ="trade_query";
       //银行卡bin查询接口
       String CARD_BIN_QUERY ="card_bin_query";
       //外场转账接口
       String TRANSFER_TO_EXTERNAL ="transfer_to_external";
       //银行卡代扣
       String TRADE_BANK_WITHOLDING ="trade_bank_witholding";
       //余额申购基金
       String FUND_PURCHASE_BALANCE ="fund_purchase_balance";
       //转账到银行卡
       String TRANSFER_TO_CARD ="transfer_to_card";
       //转账到账户
       String TRANSFER_TO_ACCOUNT ="transfer_to_account";
       //子商户注册
       String SUB_MERCHANT_REGISTRATION ="sub_merchant_registration";
       //准入资料重提网关接口
       String RESUBMISSION_INFORMATION ="resubmission_information";
       //子商户注册查询
       String SUB_MERCHANT_REGISTERED_QUERY ="sub_merchant_registered_query";
       //子商户结算银行账户变更
       String SUB_MERCHANT_CHANGE_BANKCARD ="sub_merchant_change_bankcard";
       //子商户结算银行账户变更查询网关接口
       String SUB_MERCHANT_CHANGE_BANKCARD_QUERY ="sub_merchant_change_bankcard_query";
       //子商户结算方式变更网关接口
       String SUB_MERCHANT_CHANGE_SETTLE_TYPE ="sub_merchant_change_settle_type";
       //子商户主动提现网关接口
       String SUB_MERCHANT_WITHDRAWAL_CASH ="sub_merchant_withdrawal_cash";
       //查询指定账户余额网关接口
       String QUERY_BALANCE_BY_ACCOUNT_TYPE ="query_balance_by_account_type";
       //子商户结算银行卡信息查询网关接口
       String QUERY_SUB_MERCHANT_BANKCARD_INFO ="query_sub_merchant_bankcard_info";
       //申请子商户权限网关接口
       String SUB_MERCHANT_PERMISSION_APPLY ="sub_merchant_permission_apply";
       //子商户权限申请查询网关接口
       String SUB_MERCHANT_PERMISSION_APPLY_QUERY ="sub_merchant_permission_apply_query";
       //扫码进件接口
       String QRCODE_APPLY ="qrcode_apply";
       //扫码进件接口查询
       String QRCODE_APPLY_QUERY ="qrcode_apply_query";
}
