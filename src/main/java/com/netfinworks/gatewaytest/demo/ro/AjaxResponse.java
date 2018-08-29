package com.netfinworks.gatewaytest.demo.ro;

import java.io.Serializable;

/**
 * Created by kluoij on 2016/11/23.
 */
public class AjaxResponse implements Serializable {


    private boolean             success;

    private String              errorMessage;

    private Object              data;


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
