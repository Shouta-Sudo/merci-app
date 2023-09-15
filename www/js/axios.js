/**
 * axiosによる通信クラス
 */
 app.api = new class axiosApi {

    constructor(){
        /** api実行時の例外処理 */
        this._handleError = null;

    }

    _getConfig(){
        let config = {
            headers: api_headers
        };
        let token_data = app.getToken();
        // let token_data = JSON.parse(localStorage.getItem('token_data'))
        if (token_data) {
            let authorization = 'Bearer ' + token_data.access_token;
            config.headers['Authorization'] = authorization;
        }
        // debugLog('config headers', config.headers);

        return config;
    }

    _getImageConfig(){

        let config = {
            headers: api_image_headers
        };
        let token_data = app.getToken();
        // let token_data = JSON.parse(localStorage.getItem('token_data'))
        if (token_data) {
            let authorization = 'Bearer ' + token_data.access_token;
            config.headers['Authorization'] = authorization;
        }
        // debugLog('config headers', config.headers);

        return config;

    }

    _toFormData(data){
        let fd = new FormData();
        Object.keys(data).forEach(key => {
            fd.append(key, data[key]);
        });
        return fd;
    }

    errorHander(err) {
        // debugLog('axios error ', err);
        if (err.response){ // サーバーからの戻り値あり
            // debugLog('response', err.response);
            let data = err.response.data;
            if (data.message){
                app.api._handleError(err.response);
            }else{
                app.showDialogMessage(err.message);
            }
        }else{ // 呼出し前にエラー発生
            app.showDialogMessage(err.message);
        }
        $('#loadingMask').hide();
    }

    /**
     * axiosによるPOST処理
     *
     * @param {*} url 送信先url
     * @param {*} data 送信データ(json形式)
     * @param {*} files アップロードファイル(json形式, キー：項目名、値：ファイルURI)
     * @returns 処理結果
     */
    async _post(url, data, files = null) {
        // debugLog('post url', url);
        // debugLog('post data', data);
        // debugLog('post files', files);

        let config = this._getConfig();

        if (files) {
            // ファイル転送はFormData形式が必須
            let fd = this._toFormData(data);
            config.headers['content-type'] = 'multipart/form-data';
            for (let key in files){
                let fileEntry = await app.toEntityFilePromised(files[key]).catch(function(err){
                                            // debugLog('readBinary', err);
                                            app.showDialogMessage(err)});
                let blob = await app.readBinaryFilePromised(fileEntry).catch(function(err){
                                            // debugLog('readBinary', err);
                                            app.showDialogMessage(err)});
                fd.append(key, blob, fileEntry.name);
            }
            // debugLog('formdata', [...fd.entries()]);
            data = fd;
        }
        // debugLog('config', config);

        const responce = await axios.post(base_url + url, data, config).catch(this.errorHander);

        // debugLog('api post = ', responce);

        return responce ? responce['data'] : responce;
    }

    /**
     * axiosによるPUT処理
     *
     * @param {*} url 送信先url
     * @param {*} data 送信データ(json形式)
     * @returns 処理結果
     */
     async _put(url, data) {
        // debugLog('put url', url);
        // debugLog('put data', data);
        let config = this._getConfig();
        // debugLog('config', config);

        // put の場合、FormDataを指定すると内容が空になるのでjsonで送信
        const response = await axios.put(base_url + url, data, config).catch(this.errorHander);
        // debugLog('api put = ', response);
        return response ? response['data'] : null;
    }

    /**
     * axiosによるGET処理
     * @param {*} url 送信先url
     * @param {*} query 送信データ(json形式)
     * @returns 処理結果
     */
    async _get(url, query) {
        // debugLog('get url', url);
        // debugLog('get query', query);

        let config = this._getConfig();

        // debugLog('config', config);
        let param = {params: query, headers: config.headers};
        // debugLog('param', param);
        const response = await axios.get(base_url + url, param).catch(this.errorHander);

        // debugLog('api get response = ', response);
        return response ? response['data'] : null;
    }

    async _getImage(url, query) {
        // debugLog('get url', url);
        // debugLog('get query', query);

        let config = this._getImageConfig();

        // debugLog('config', config);
        let param = {params: query, headers: config.headers, responseType: 'arraybuffer'};
        // debugLog('param', param);
        const response = await axios.get(base_url + url, param).catch(this.errorHander)
        .then(response => {
            let blob = new Blob(
              [response.data],
              { type: response.headers['content-type'] }
            )
            let image = URL.createObjectURL(blob)
                return image
          })

        // debugLog('api getImage response = ', response);
        return response ? response : null;
    }

    /**
     * axiosによるapiの実行
     * 注：DELETEの場合、dataは指定しても無視される。axiosの仕様上、指定できない。
     *
     * @param {string} method GET, POST, PUT, DELETE
     * @param {string} url 読みだし先url
     * @param {json} data json形式の送信データ　※DELETEの場合、指定できないので無視される
     * @param {json} files アップロードファイル(json形式, キー：項目名、値：ファイルURI) POSTの場合のみ指定可能
     * @param {関数} errorHander
     * @param {bool} mask 処理中のマスク表示の有無 デフォルト：有
     * @returns 処理結果
     */
    async call(method, url, data, files, errorHander = null, mask = true) {
        this._handleError = errorHander ? errorHander : app.showError;
        if (mask){
            $('#loadingMask').show();
        }
        try{
            if (method == 'GET'){
                return await this._get(url, data);
            }else if (method == 'GETIMAGE'){
                return await this._getImage(url, data);
            }else if (method == 'POST'){
                return await this._post(url, data, files);
            }else if (method == 'PUT'){
                if (files){
                    throw new Error(method + ' cannot upload files');
                }
                return await this._put(url, data);
            }else if (method == 'DELETE'){//suzuki add
                return await this._delete(url, data);//suzuki add
            }else{
                throw new Error(method + ' is not support!!');
            }
        } catch (err) {
            console.error()
            $('#loadingMask').hide();
            throw err;
        }finally{
            if (mask){
                $('#loadingMask').hide();
            }
        }
    }

    /**
     * axiosによるDELETE処理
     *
     * @param {*} url 送信先url
     * @returns 処理結果
     */
     async _delete(url, data) {
        // debugLog('delete url', url);
        // debugLog('delete data', data);
        let config = this._getConfig();
        config.data = data;

        const response = await axios.delete(base_url + url, config).catch(this.errorHander);
        // debugLog('api delete = ', response);
        return response;
    }

}
