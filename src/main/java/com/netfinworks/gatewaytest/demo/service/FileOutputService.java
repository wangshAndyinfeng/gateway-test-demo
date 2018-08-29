package com.netfinworks.gatewaytest.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class FileOutputService {

    @Value("${pnsPath:/opt/pnsdata/}")
    private String pnsPath;

    //写json入文件
    @Async
    public void saveDataToFile(String fileName, String data) {
        BufferedWriter writer = null;
        File file = new File(pnsPath+ fileName + ".txt");
        //如果文件不存在，则新建一个
        if(!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //写入
        try {
            writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file,true), "UTF-8"));
            writer.write(data);
            writer.write("\r\n");
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if(writer != null){
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }



    public JSONArray getDatafromFile(String fileName) {

        String Path=pnsPath + fileName+ ".txt";
        BufferedReader reader = null;
        String laststr = "";
        JSONArray array = new JSONArray();
        try {
            FileInputStream fileInputStream = new FileInputStream(Path);
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "UTF-8");
            reader = new BufferedReader(inputStreamReader);
            String tempString = null;
            while ((tempString = reader.readLine()) != null) {
                JSONObject obj = JSONObject.parseObject(tempString);
                array.add(obj);
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return array;
    }
}
