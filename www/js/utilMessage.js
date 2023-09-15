/**
 * アラート、確認ダイアログ等のメッセージ表示用のユーティリティーメソッド群
 * 
 * 以下で利用するons.notificationの詳細は下記参照
 * @see https://ja.onsen.io/v1/reference/ons.notification.html
 * @see https://onsen.io/v2/api/vue/$ons.notification.html
 * 
 */


/** アラートダイアログを表示 */
app.showDialogMessage = function(message, callback = null, options = null) {
	try {
		if (message && typeof message != 'string'){
			message = JSON.stringify(message);
		}
		if (message.length > 300){
			message = message.substr(0,300) + '...';
		}
		if (!options){
			options = {
				title: 'お知らせ',
				message: message,
			};
			if (callback){
				options.callback = callback;
			}
		}
		ons.notification.alert(options);
	} catch(err) {
		alert('[err]app.showDialogMessage' + '\n' + err.message);
	} finally {
	}
};

/** 
 * 確認ダイアログを表示
 * 利用例：
 *  app.showConfirm('よろしいですか？', function(res){console.log(res)})
 *  「いいえ」を選ぶと0、「はい」を選ぶと1をコンソールに出力
 * optionsを指定するとcallbackは無効になる。
 * 
 * @param {string} message 確認用のメッセージ
 * @param {Function} callback ボタン選択時のコールバック関数。
 * @param {object} options 表示オプション　詳細は下記参照
 * @see https://ja.onsen.io/v1/reference/ons.notification.html
 */
app.showConfirm = function(message, callback = null, options = null){
	if (!options){
		options = {
			title: '確認',
			buttonLabels: ['いいえ', 'はい'], // ※iOS, androidの推奨する並び順はCancel,OKの順番
			// cancelable: true,
			callback: callback,
		}
	}
	return ons.notification.confirm(message, options);
}

/** 
 * 入力ダイアログを表示
 * 利用例：
 *  app.showPrompt('確認', '年齢を入力してください', function(res){console.log(res)})
 *  入力値をコンソールに出力
 * optionsを指定するとcallbackは無効になる。
 * 
 * @param {string} title タイトル
 * @param {string} message 入力用のメッセージ
 * @param {Function} callback ボタン選択時のコールバック関数。
 * @param {object} options 表示オプション　詳細は下記参照
 * @see https://ja.onsen.io/v1/reference/ons.notification.html
 */
 app.showPrompt = function(title, message, callback = null, options = null){
	if (!options){
		options = {
			title: title,
			// cancelable: true,
			callback: callback,
		}
	}
	return ons.notification.prompt(message, options);
}

/** 
 * トーストメッセージ（一時的なメッセージ）を表示
 * 利用例：
 *  app.showToast('登録しました', function(){console.log('表示済')})
 *    メッセージ表示を3秒表示後、コンソールに「表示済」を出力
 * 
 * optionsを指定するとcallback、timeoutは無効になる。
 * 
 * @param {string} message メッセージ
 * @param {Function} callback ボタン選択時のコールバック関数。
 * @param {Number} timeout メッセージ表示時間、ミリ秒単位 デフォルト：3秒
 * @param {object} options 表示オプション　詳細は下記参照
 * @see https://onsen.io/v2/api/vue/$ons.notification.html#method-toast
 */
 app.showToast = function(message, callback = null, timeout = 3000, options = null){
	if (!options){
		options = {
			timeout: timeout,
			callback: callback,
		}
	}
	return ons.notification.toast(message, options);
}

/**
 * カスタマイズ用ダイアログメッセージを表示
 * @see https://ja.onsen.io/v2/api/js/ons-dialog.html
 */
 app.showTemplateDialog = function(id, template_id) {
    var dialog = document.getElementById(id);

    if (dialog) {
      dialog.show();
    } else {
      ons.createElement(template_id, { append: true })
        .then(function(dialog) {
          dialog.show();
        });
    }
};

app.hideDialog = function(id) {
    document
      .getElementById(id)
      .hide();
};