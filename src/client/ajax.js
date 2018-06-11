import $ from 'jquery'

const BaseUrl = "http://www.smarticloudnet.com";

export function getAjax(url, param) {
    $.ajax({
        url: BaseUrl + url + param,
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }.bind(this),
        error: function (e) {
            console.log(e.toString());
        }.bind(this)
    });
}

export function postAjax(url, param) {
    $.post(BaseUrl + url, param, function (result) {
        console.log(result)
    });
}