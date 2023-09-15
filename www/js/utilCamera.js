/**
 * カメラ関連の汎用メソッド
 * @see https://docs.monaca.io/ja/reference/cordova_10.0/camera/
 *
 * ファイル関連の汎用メソッド
 * @see https://docs.monaca.io/ja/reference/cordova_7.1/file/
 */

/**
 * カメラ利用時のオプション設定
 *
 * @param srcType カメラまたはアルバム(Camera.PictureSourceType.CAMERA | Camera.PictureSourceType.SAVEDPHOTOALBUM)
 * @see https://docs.monaca.io/ja/reference/cordova_10.0/camera/#%E5%86%99%E7%9C%9F%E3%81%AE%E6%92%AE%E5%BD%B1
 */
 app.setOptions = function(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        // destinationType: Camera.DestinationType.FILE_URI,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}


/**
 * アルバムからファイルを選択
 * @param {callback function} selectedAction ファイル選択時のコールバック関数 第一引数に選択ファイルのURIを指定
 * @see https://docs.monaca.io/ja/reference/cordova_10.0/camera/#%E5%86%99%E7%9C%9F%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%83%BC%E3%81%8B%E3%82%89%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E9%81%B8%E6%8A%9E
 */
app.openFilePicker = function(selectedAction) {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = app.setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something
		selectedAction(imageUri);
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

/**
 * イメージファイルをチェックし、問題がなければshowを実行する
 * @param {*} imageURI 表示対象イメージのuri
 * @param {*} show 画像ファイルチェック後に実行するコールバック関数　引数はimageUri
 */
app.checkImage = function(imageURI, show, id){
	window.resolveLocalFileSystemURL(imageURI, checkFile, errorCheck);

	function errorCheck(error){
		app.showDialogMessage('未サポートの画像ファイルです');
	}

	function checkFile(fileEntry) {
		debugLog(fileEntry.fullPath);
		let name = fileEntry.name.toLowerCase();
		let suffix = null;
		if (name.endsWith('jpg') || name.endsWith('jpeg')){
			suffix = 'jpg';
		}else if (name.endsWith('png')){
			suffix = 'png';
		}else{
			app.showDialogMessage('未サポートの画像ファイルです');
			return;
		}
		show(imageURI,id);
		// show(fileEntry.fullPath , id)
	}
}


/**
 * Promise化したファイルのEntity化関数
 * @param {*} imageURI
 * @returns FileEntry
 *
 * @see https://docs.monaca.io/ja/reference/cordova_7.1/file/#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E4%BF%9D%E5%AD%98%E5%A0%B4%E6%89%80
 */
app.toEntityFilePromised = function (imageURI) {
	return new Promise((resolve, reject) => {
		window.resolveLocalFileSystemURL(imageURI, (results, err) => {
			if (err) reject(err);
			else resolve(results);
		});
	});
}


/**
 * Promise化したファイルを読み込みBlob化関数
 * @param FileEntry fileEntry
 *
 * @see https://docs.monaca.io/ja/reference/cordova_7.1/file/#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E8%AA%AD%E3%81%BF%E8%BE%BC%E3%81%BF
 */
app.readBinaryFilePromised = function (fileEntry) {
	return new Promise((resolve, reject) => {
		let name = fileEntry.name.toLowerCase();
		let suffix = null;
		if (name.endsWith('jpg') || name.endsWith('jpeg')) {
			suffix = 'jpg';
		} else if (name.endsWith('png')) {
			suffix = 'png';
		} else {
			throw new Error('未サポートのファイルです');
		}
		fileEntry.file(function (file) {
			var reader = new FileReader();
			reader.onloadend = function () {
				debugLog("Successful file read", fileEntry.fullPath);
				resolve(new Blob([new Uint8Array(this.result)], { type: "image/" + suffix }));
			};
			reader.readAsArrayBuffer(file);
		}, reject);
	});
}

/**
 * ローカルファイルのURIをOSの種類に応じて変換する
 * @param {string} uri 対象uri
 * @returns 返還後のuri
 */
app.convertUri = function(uri){
	if (monaca.isIOS){
		return window.WkWebView.convertFilePath(uri);
	}
	return uri;
}

app.takePicture = function(callback, id) {
	let option = app.setOptions(Camera.PictureSourceType.CAMERA);
	//カメラを起動
	navigator.camera.getPicture(onSuccess, onError, option);

	//成功時に呼び出されるコールバック関数
	function onSuccess(imageURI) {
		debugLog('onSuccess', id)
		callback(imageURI, id);
	}

	//失敗時に呼び出されるコールバック関数
	function onError(message) {
		debugLog('onError', message);
		alert("Error:" + message);
	}
}

/**
 * 画像を画面に表示
 * @param {array} target 画面定義 ※id に対応するimageUrlを設定するfilesプロパティ(連想配列)を持つこと
 * @param {string} imageURI 画像のuri
 */
 app.setImage = function (target, imageURI, id) {
	target.pageScope.$set(target.pageScope.form, id, app.convertUri(imageURI));
	// iOSの場合、imageURIは変換しないと画面に表示できないが、変換後のURIではファイル転送時のデータ読み込みができないので、別途保持する
	target.files[id] = imageURI;
}

app.selectPicture = function(id, callback) {
	let options = {
		// title: '',
		buttonLabels: ['カメラ', 'アルバム', 'キャンセル'],
		callback: function (target) {
			if (target == 0){
				app.takePicture(callback, id)
			}else if (target == 1){
				debugLog('selectFile', id);
				// ファイル選択処理
				app.openFilePicker(function (imageURI) {
					debugLog('selectPicture:openFilePicker', imageURI)
					callback(imageURI)
				})
			}
		}
	};
	app.showConfirm('写真選択方法',null,options);
}
