var base_url = "https://api-mercimaman.nekohand.net/";
var web_url = "https://apicetec:apicetec@mercimaman.nekohand.net/";
//var web_url = "https://mercimaman.nekohand.net/";

//var base_url = "https://api.merci-maman.jp/";
//var web_url = "https://merci-maman.jp/";

var api_url = base_url+"/api/v1";
var api_key = "70db6332a78de9c8b2ada447b6ec43a382f1bb4e";
var api_headers = { "X-Api-Key": api_key, "Content-Type": "application/json" }
var api_image_headers = { "X-Api-Key": api_key, "Content-Type": "image/png" }
var grant_type = "password";
var client_id = "2";
var client_secret = "Jfcy62M9uLYTMN13sOrtV9hAYdG0hiS8OQ7g6MXw";
var provider = "users";

/** デバッグフラグ */
var isDebug = true;
/**
 * デバッグ状態であればコンソールにログを出力
 * 引数が文字列でなければ文字列に変換して出力する
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
var debugLog = function (arg1 = null, arg2 = null) {
    if (!isDebug){
        return;
    }
    if (arg1 && typeof arg1 != 'string'){
        arg1 = JSON.stringify(arg1);
    }else if (typeof arg1 === "undefined"){
        arg1 = 'undefined'
    }
    if (arg2 && typeof arg2 != 'string'){
        arg2 = JSON.stringify(arg2);
    }else if (typeof arg2 === "undefined"){
        arg2 = 'undefined'
    }
    if (arg1){
        if (arg2){
            console.log(arg1, arg2);
        }else{
            console.log(arg1);
        }
    }
    if(typeof console.trace == "function"){
        console.trace();
    }
}