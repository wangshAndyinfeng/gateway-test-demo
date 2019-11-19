package com.netfinworks.gatewaytest.demo.service;

import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Test {

    public void pay() {
        BasicHeader basicHeader = new BasicHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
        RestTemplate restTemplate = new RestTemplate();
        List<BasicHeader> basicHeaders = new ArrayList<>();
        basicHeaders.add(basicHeader);
        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create().setDefaultHeaders(basicHeaders);
        HttpComponentsClientHttpRequestFactory httpComponentsClientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        httpComponentsClientHttpRequestFactory.setHttpClient(httpClientBuilder.build());
        restTemplate.setRequestFactory(httpComponentsClientHttpRequestFactory);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");

        Test pay = new Test();
        LinkedMultiValueMap map = pay.installParam();
        HttpEntity<LinkedMultiValueMap> entity = new HttpEntity<LinkedMultiValueMap>(map,headers);
        ResponseEntity<String> resEntity = restTemplate.exchange("https://c1gateway.kjtpay.com/recv.do", HttpMethod.POST, entity, String.class);
        ResponseEntity<String> resEntity0 = restTemplate.exchange("https://gateway.kjtpay.com/recv.do", HttpMethod.POST, entity, String.class);
        System.out.println(resEntity.getBody());
        System.out.println(resEntity0.getBody());
    }

    public static void main(String[] str) {


//        HttpHeaders headers = new HttpHeaders();
//        headers.add(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
//
//        Test pay = new Test();
//        LinkedMultiValueMap map = pay.installParam();
//        HttpEntity<LinkedMultiValueMap> entity = new HttpEntity<LinkedMultiValueMap>(map,headers);
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> resEntity = restTemplate.exchange("https://c1gateway.kjtpay.com/recv.do", HttpMethod.POST, entity, String.class);
//        ResponseEntity<String> resEntity0 = restTemplate.exchange("https://gateway.kjtpay.com/recv.do", HttpMethod.POST, entity, String.class);
//        System.out.println(resEntity.getBody());
//        System.out.println(resEntity0.getBody());

        Test pay2 = new Test();
        pay2.pay();
    }


    private LinkedMultiValueMap installParam() {
        LinkedMultiValueMap<String, String> linkedMultiValueMap = new LinkedMultiValueMap();
        Map<String, String> paramsMap = new HashMap<>(16);
        paramsMap.put("request_no", "20180919184021225620539491580001");
        paramsMap.put("service", "card_register_and_pay");
        paramsMap.put("partner_id", "200002915077");
        paramsMap.put("format", "JSON");
        paramsMap.put("charset", "UTF-8");
        paramsMap.put("sign_type", "RSA");
        paramsMap.put("sign", "TYBuvGYKeEh%2FTUC%2FM82dj188wPP6KTUhWB5UsE30B10NVTAnD9pwG2hRZtkVxNCgg%2F7Y9LmUbZ%2BWCnl8LaJy%2FMnjKe5rjaKLp0bDakvFWAmu4zBwt1QRiXX9KzAXDm%2F%2B1SuZd2ooAgJ16JgQSZSFSQVJzLnvnCKUKE4xA8ZWafFZfes7PVEaUIKvhXbSMeF%2BArZ0qygUhd8K5%2Fuco6p7jf47XopxyHX96PTumFZnpes2mlXiaiYfB5zqqxwciRERUN2%2FTSjP2nUH%2F0kTvKdpV7MKCGqjXQWAL%2B%2FMkCG4EnRKT1kJTUF68mXKT5UgV3toNYIAm8Mpd41czGCnBrOQSQ%3D%3D");
        paramsMap.put("timestamp", "2018-09-19+18%3A40%3A21");
        paramsMap.put("version", "1.0");
        paramsMap.put("biz_content", "ZeyNyh9H8kgdRpCXPw1A2%2FKB7HZnbLy%2B2JuCQe2IxdWWu25uO70ghFG5jeYItmc5VhUut2baIw0JKxXlkIY7Oqg5ASgKelF1tl754uS%2FSnXFER6CgRgJhMJrgAGUcGEFlNR55DnKRgV4s3EB4UARBu%2FaHwtMtYDjn3Eg2uwJmBl3uHEMqjZ8f2BKhtvcfqZHifA6CFzJrGozdRUCZeG3BpOxESiBA9AhBexj9ZCErTuxDMfB7Zo6a4fNVof%2BBjO2cGfk1Hiq4fIgXky1eLOoUKqBvOZRK1%2FHgkkIRBCZ9cIyoiTXHaZhsQcbYx1Aml7QMJ6nvbV0fln5VuVmr0wjvGnrnPkLNmh95eKY64WTl37gj59VnthDwuoMHNoSL2tsWwjQTP3b9FA255dFHDQyAc1Yk2W4X4H9GK77EWMrGtWvKl0o5rDbj9jcNbAHt6plzM0kZC3I2I1Tq%2F%2BCSVA9KT%2Fj%2BHgmVJ9SnskRSyT%2FBlgh%2FrgkHROGbFH%2BnqCcIdnl4Vuz71Ual4SzkgCkxRnMxo1jVGrxkUTXjKTXO4mGf1r8BSTfDF2vkA5wp2licSujMoxNkDDwa4zXCBj%2BlVy4asvKfwF3iX2%2FT42ToAD071cDuottq7sS81tXCLb984qCLENcurUWnxeHCPOq8Tr%2FMM3U0XzOnzTzCXSo3X3P%2BFpxe41b5Rxmi7d9kUmHo9MhjdkqItEtRzEJcxyv8cyffDhRiY0nZfZ1e3xeMkGQOmxEBW3x3lXc3LmwS%2FWnUu%2BlBWQnSd0DcFWJnYzEYVJ6ovDV7fsE%2BbYeLl3Fh9%2F7SP8%2FdhAfrWPMqIg8yDVZ4hgx48CFxP%2FM82LC%2FdKpf%2BI034X5R4piSWpHp%2FkKNbQE5Wo1GR0i1SG%2BnFpdw%2BFZizQcZ0IBXE0xkZUmN4hKmWxsoHtBv6od2V9TKnKqDjbLJCg38kC1uCQymYyCsSDH9%2BAGQKFQ6k5lQuMga8y%2Bc%2BZQRApL4B9s%2FEgznk9Sw%2FJZrme8W3wPpBzAnLS10VjDVg4n");
        linkedMultiValueMap.setAll(paramsMap);
        return linkedMultiValueMap;
    }
}