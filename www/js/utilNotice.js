/*** 通知処理 ****/

app.notice = {}

app.handleNotice = async function (message) {
	//alert("Message type: " + message.messageType);
	if (message.messageType === "notification") {
		let isTap = false;
		// 通知メッセージ受信
		if (message.tap && message.tap == 'background') {
			// バックグラウンド状態でタップ
			isTap = true;
		}
		let messageBody = null;
		if (monaca.isAndroid) {
			messageBody = message.body;
		} else {
			messageBody = message.aps.alert.body;
		}
		try {
			switch (message.kind) {
				//運営からお知らせがあった時　　お知らせへ遷移（Web）
				case "1":
					app.notice.openWeb(isTap, 'myAccount/news/', '',
						messageBody + '。お知らせ画面を表示しますか？',
						messageBody + '。ログイン後、お知らせ画面で確認してください',
						true
					);
                	return;
				//メルママメイトからメッセージが届いたとき　メルママの詳細（アプリ)
				case "2":
					app.shared.common.target_id = message.user_from_id;
					app.notice.transPage(isTap, appVue.views.user.profile,
						messageBody + '。メルママメイトプロフィール画面を表示しますか？',
						messageBody + '。ログイン後、メッセージ画面で確認してください。'
					);
                	break;
				//商品にコメントが着いた時　商品ページへ(web)
				case "3":
					app.notice.openWeb(isTap, 'order/order/', '&product_id='+message.product_id,
						messageBody + '。商品ページ画面を表示しますか？',
						messageBody + '。ログイン後、商品ページ画面で確認してください',
						true
					);
                	return;
				//商品が購入されたとき　	出品・取引リスト（Web）
				case "4":
					app.notice.openWeb(isTap, 'product/productlist/', '',
						messageBody + '。出品・取引リスト画面を表示しますか？',
						messageBody + '。ログイン後、出品・取引リスト画面で確認してください',
						true
					);
                	return;
				//ツイートに返信があった時　コメント返信機能の画面へ（アプリ）
				case "5":
						app.shared.post = {
							tweet_id: message.parent_id,
						};

					//app.notice.transPage(isBack, appVue.views.post.index,
					app.notice.transPage(isTap, appVue.views.post.details,
						messageBody + '。ツイート画面を表示しますか？',
						messageBody + '。ログイン後、ツイート画面で確認してください'
					);
                	break;
				default:
					{
						alert("Message ID : " + message.kind + " not support")
					}
			}
		} catch (err) {
			alert('notify handle error ' + err.message)
		}
	}
	console.log(JSON.stringify(message));

}

/**
 * ユーザ情報に基づいて通知フラグを設定
 * @param {array} userData ユーザ情報
 */

app.notice.setNoticeFlag = function (userData) {
/*
	appVue.vm.$set(appVue.vm, 'noArrangeCount', userData.noArrangeCount); // 未手配オーダー数
	appVue.vm.$set(appVue.vm, 'noArrangeNoReadFlag', userData.noArrangeNoReadFlag); // 未手配オーダーの未読メッセージの有無
	appVue.vm.$set(appVue.vm, 'futureNoReadFlag', userData.futureNoReadFlag); // 手配済オーダー（未来）の未読メッセージの有無
	appVue.vm.$set(appVue.vm, 'pastNoReadFlag', userData.pastNoReadFlag); // 手配済オーダー（過去）の未読メッセージの有無
	appVue.vm.$set(appVue.vm, 'idividualNoread', userData.idividualNoread); // 個別の未読メッセージの有無
	appVue.vm.$set(appVue.vm, 'consultationNoread', userData.consultationNoread); // 未読の症例相談の有無
	appVue.vm.$set(appVue.vm, 'consultationCommentNoread', userData.consultationCommentNoread); // 投稿した症例相談に対する未読メッセージの有無
*/
}



/**
 * 画面遷移がある通知メッセージに対する処理
 * @param {boolean} isTap 通知をタップしたか
 * @param {array} page 遷移先のページ(appVue.views.xxxx)
 * @param {string} confirmMessage ログイン済のアクティブ状態で画面遷移時に表示する確認メッセージ
 * @param {string} noticeMessage 未ログインのアクティブ状態で表示する通知メッセージ
 */
app.notice.transPage = function (isTap, page, confirmMessage, noticeMessage) {

	if (app.isLogin()) {
		if (isTap) { // 来た通知がタップされた場合
			window.onload = app.init;
		} else { //通知が来た場合
			 //alert('transPage　show confirm')

			cordova.plugins.notification.badge.increase(1, function (badge) {});

			app.showConfirm(confirmMessage,
				function (res) {
					if (res) {
						//バッジを無くす。
						cordova.plugins.notification.badge.configure({ autoClear: true });
						app.jumpPage(app.currentPage, page);
					}else{
						// 画面遷移しない場合は通知表示を更新（画面遷移する場合は遷移先で更新）
						app.notice.checkNotice();
					}
				}
			);
		}
	} else { // 未ログインの場合は、ダイアログを表示して終了。
		//alert("transPage　未ログイン");
		app.showDialogMessage(noticeMessage);
	}
}

/**
 * 通知を受けた状態に応じた処理実施後、指定したurlのWebページをオープン
 * @param {boolean} isTap 通知をタップしたか
 * @param {string} url 遷移先URL
 * @param {string} param urlのパラメタ
 * @param {string} confirmMessage ログイン済のアクティブ状態で画面遷移時に表示する確認メッセージ
 * @param {string} noticeMessage 未ログインのアクティブ状態で表示する通知メッセージ
 * @param {boolean } isNoticeCheck ブラウザを閉じた後、通知表示を更新するか
 */
app.notice.openWeb = function (isTap, url, param, confirmMessage, noticeMessage, isNoticeCheck) {
	if (app.isLogin()) {

		if (isTap) { // 来た通知がタップされた場合
			 //alert('openWeb　to edit profile')
			//バッジを無くす。
			cordova.plugins.notification.badge.configure({ autoClear: true });
			app.showInAppBrowser(url, param);
		} else { //通知が来た場合
			 //alert('openWeb　show confirm')
			
			cordova.plugins.notification.badge.increase(1, function (badge) {});
			app.showConfirm(confirmMessage,
				function (res) {
					if (res) {
						//app.showInAppBrowser(url, param, isNoticeCheck);
						//バッジを無くす。
						cordova.plugins.notification.badge.configure({ autoClear: true });
						app.showInAppBrowser(url, param);
					}
				}
			);
		}
	} else { // 未ログインの場合は、ダイアログを表示して終了。
		//alert("openWeb　未ログイン");
		app.showDialogMessage(noticeMessage);
	}
}

/**
 * トークン（端末ID）の更新
 * @param {string} token
 */
app.notice.updateToken = async function (token) {
	if (app.isLogin()) {
		let currentId = localStorage.getItem('device_id');
		if (currentId != token) {
			data = {
				check: "4",
				device_id: token,
			};
			let res = await app.api.call(appConst.apiUrl.users.update.method, appConst.apiUrl.users.update.url + localStorage.getItem('id'), data, null, app.showError, false);
			if(!res){return};
			localStorage.setItem('device_id', token);
		}
	} else {
		app.shared.common.deviceId = token;
	}
}

/**
 * ユーザーがログインしている場合、通知データを取得し、反映する
 */
app.notice.checkNotice = async function () {

	// if (!app.isLogin() || (localStorage.getItem('push_notice_flg') && !force)) {
	if (!app.isLogin()) {
		// 未ログインは通知データは確保しない
		return;
	}
	// 取得直後の場合は何もしない
	if (app.shared.common.noticeChecked) {
		app.shared.common.noticeChecked = false;
		return;
	}

	// res = await app.api.call(appConst.apiUrl.order.orderMenuInfo.method, appConst.apiUrl.order.orderMenuInfo.url, {});
	// if (!res) { // エラー
	// 	return;
	// }
	// // 通知情報設定
	// app.notice.setNoticeFlag(res.data);

}