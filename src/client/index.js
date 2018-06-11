import 'whatwg-fetch'
import 'es6-promise'
import axios from "axios";
import Qs from "qs";
// "http://www.smarticloudnet.com" 远程地址
//http://localhost:3000
const BaseUrl = "http://www.smarticloudnet.com";
// const BaseUrl = "http://localhost:8080/swagger-ui.html";

//BaseUrl + url + params
export function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        fetch(BaseUrl + url + params, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response)
                    resolve(response.body);
                }
            })
            .catch((err) => {
                reject({status: -1});
            })
    })
}

export function fetchPost(url, formData) {
    return new Promise(function (resolve, reject) {
        fetch(BaseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status: response.status})
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject({status: -1});
            })
    })
}

export function postLast(path, params = {}) {
    new Promise(async (resolve, reject) => {
        let obj = {path, params};
        axios.post(BaseUrl + path, Qs.stringify(params), {
            // 请求头信息
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json;charset=UTF-8"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // `onUploadProgress` 允许为上传处理进度事件
            onUploadProgress: (progressEvent) => {
            },
            // `onDownloadProgress` 允许为下载处理进度事件
            onDownloadProgress: (progressEvent) => {
            },
            //设置超时时间
            timeout: 10000,
            //返回数据类型
            responseType: 'json' // default
        })
            .then((response) => {
                console.log(response);
                resolve(response);

                /* if (response.status == 200) {
                     alert(JSON.stringify(response.data.data))
                     resolve(response.data.data);
                 } else {
                     reject({status: -1});
                 }*/
            })
            .catch((error) => {
                resolve({data: {status: -1}});
            })
            .finally(async () => {

            });
    });
}
