/**
 * localStorageに関連するユーティリティーメソッドの定義
 *
 * localStorageについては下記参照
 * @see https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage
 *
 * localStorageは暗号化もされず簡単に読み出せるので、暗号化・復号化対応したメソッドなどを用意
 */

/**
 * localStorageに暗号化して保存
 * 復号化する際、稀に「error malformed utf-8 data」が起きる場合があるため、暗号化した場合は復号化し問題ないことを確認する
 * エラーがあれば再度、暗号化を試す。10回連続してエラーとなった場合は中断する
 * @param {string} key キー
 * @param {string} value 暗号化対象文字列
 * @param {integer} repeatCount 繰り返し回数
 */
app.setEncodedLocalStorage = function (key, value, repeatCount = 0) {
    console.log('setEncodedLocalStorage')
    const encrypted = CryptoJS.AES.encrypt(value, appConst.cryptoKey).toString()
    if (encrypted) {
        try {
            const bytes = CryptoJS.AES.decrypt(encrypted, appConst.cryptoKey);
            value = bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            repeatCount++;
            debugLog('error ' + repeatCount + '回 ', e);
            if (repeatCount > 10) {
                throw e;
            }
            app.setEncodedLocalStorage(key, value, repeatCount);
            return;
        }
    }
    console.log('setEncodedLocalStorage', key)
    localStorage.setItem(key, encrypted);
}

/**
 * localStorageから復号化して取得
 * @param {string} key 取得対象キー
 * @returns 復号化した文字列
 */
app.getDecodedLocalStorage = function (key) {
    let value = null;
    let encrypted = localStorage.getItem(key);
    if (encrypted) {
        try {
            const bytes = CryptoJS.AES.decrypt(encrypted, appConst.cryptoKey);
            value = bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            app.clearErrorMessage(key);
        }
    }
    return value;
}

/**
 * トークンを保存する
 * @param {json} token サーバーから取得したトークン
 */
app.setToken = function (token) {
    app.shared.common.token = token;
    app.setEncodedLocalStorage('token_data', JSON.stringify(token));

}

/**
 * トークン情報を確保する。ない場合はnullを返す
 * @returns トークン情報
 */
app.getToken = function () {
    let token = null;
    console.log('getToken 1')
    debugLog('shared', app.shared)
    if ('common' in app.shared && app.shared.common.token) {
        console.log('getToken 2')
        token = app.shared.common.token;
    }
    console.log('getToken 3')
    if (!token) {
        token = app.getDecodedLocalStorage('token_data');
        if (token) {
            token = JSON.parse(token);
        }
    }
    return token;
}

/**
 * トークン情報をクリアする
 */
app.clearToken = function () {
    if (app.shared.common && app.shared.common.token) {
        delete app.shared.common.token;
    }
    localStorage.removeItem('token_data');
}

/**
 * ログイン状態を返す
 * @returns ログイン中：true, 未ログイン：false
 */
app.isLogin = function() {
    let token = app.getToken();
    let id = localStorage.getItem('id');
    debugLog('isLogin token', token);
    debugLog('isLogin id', id);
    return token && id ? true : false;
}

/**
 * ローカルストレージのログイン情報をクリア
 */
app.clearLoginInfo = function(){
    app.clearToken();
    let id = localStorage.getItem('id');
    localStorage.removeItem(id + '_current_page');
    localStorage.removeItem('id');
    localStorage.removeItem('nickname');
    app.shared.common = {};
}

/**
 * ユーザー情報をローカルストレージに保存する
 * @param {array} userData
 */
app.setUserInfo = function(userData){
    localStorage.setItem('id', userData.id);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('nickname', userData.user_profile.nickname);
    localStorage.setItem('condition', userData.user_profile.condition);
    localStorage.setItem('chat', userData.user_profile.chat);
    app.shared.common.name = userData.user_detail.last_name + " " + userData.user_detail.first_name;
}