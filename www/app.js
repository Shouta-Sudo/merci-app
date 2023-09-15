//'use strict';

// vue用の共通オブジェクト（事前定義が必要）
var appVue = {};

/**
 * vueコンポーネント
 * viewsの下を階層化する場合はその構造と同じ定義をここに記載すること
*/
appVue.views = {

	common: {}, // 共通ページ
	consultation: {}, // 症例相談
	contact: {}, // 電話帳・メッセージ
	user: {}, // 登録・ログイン
	post: {}, //ツイート

};

// ViewModel
appVue.vm = null;

// アプリ固有の定義
var app = {};

var loader = null;
app.baseUrl = base_url;
app.apiUrl = api_url;
app.assetUrl = 'https://' + location.hostname + '/assets/';

/** 現在表示中のページ */
app.currentPage = null;

//初期化処理
app.init = function() {
	console.log(app.apiUrl);
	try {
		app.views = {};
		app.shared = {common: {
			deviceId: 'dummy',
			user: null,
			name: null,
		}};	//ページ間でのデータ受け渡し用

		// 未ログインであればデバイストークン取得
		if (!app.isLogin()){
			if (typeof FirebasePlugin !== 'undefined'){
				FirebasePlugin.getToken(function (fcmToken) {
					app.shared.common.deviceId = fcmToken;
				}, function (error) {
					console.error(error);
					alert('token get error')
				});
			}
		}

		app.start();

		initAppVue();
	} catch(err) {
		alert('app.init' + '\n' + err.message);
	} finally {

	}
};
//起動処理（ソースロード完了後に実行する）
app.start = function() {
	try {
	} catch(err) {
		alert('app.start' + '\n' + err.message);
	} finally {

	}
};

