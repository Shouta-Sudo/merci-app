// import LoginForm from './user/login_component'

// 画面定義 -------------------------
var login = {};

// Vue定義 -------------------------
appVue.views.login = {
	key: 'login',
	template: '#login',
	// components: { LoginForm },
	data: () => {
		return {
			page: appConst.page.login,
			// ログイン
			form: {
				email: null,
				password: null,
			},
			error: {},
			isEmailValidated: false,
			isPasswordValidated: false,
			// その他
			login_status: app.isLogin() ? 1 : 0, // appVue.vm.login_status
		};
	},
	computed: {
	},
	methods: {
		init: init,
		set_profile: set_profile,

		// ログイン
		login: doLogin,
		resetPassword: function () {
			app.nextPage(login, appVue.views.user.reset_password)
		},
		nextPage: nextPage,
		moveToWeb: moveToWeb,
		change_email: change_email,
		change_password: change_password,
	},
	watch: {
		"form.email": function (value) {
			let isEmailValidated = app.validateEmail(value)
			if (isEmailValidated) {
				delete this.error.email
				this.isEmailValidated = true
			}
			if (!isEmailValidated) {
				this.error.email = "メールアドレスの形式が無効です。"
				this.isEmailValidated = false
			}

		},
		"form.password": function (value) {
			let isPasswordValidated = app.validatePassword(value)
			if (isPasswordValidated) {
				delete this.error.password
				this.isPasswordValidated = true
			}
			if (!isPasswordValidated) {
				this.error.password = "パスワードを入力してください。"
				this.isPasswordValidated = false
			}

		},
	}
};

async function change_email(){
	if(document.getElementById("email").value){
		login.pageScope.form.email = document.getElementById("email").value;
	}
}

async function change_password(){
	if(document.getElementById("password").value){
		login.pageScope.form.password = document.getElementById("password").value;
	}
}

// 初期化
async function init() {
	try {
		$('#loadingMask').hide(); // ローディングマスク解除
		login.pageScope = this;			// ページオブジェクトを設定
		app.setCurrentPage(login, appVue.views.login); // 最終ページを現在のページに設定
		header.init(login);	// ヘッダー初期化
		footer.init(login);	// フッター初期化
		bottomNavi.init(login);	// ボトムナビゲーション初期化

	} catch (err) {
		alert('login.init' + '\n' + err.message);
		throw err;
	} finally {
	}
}

async function doLogin() {
	data = {
		'username': this.form.email,
		'password': this.form.password,
		'grant_type': 'password',
		'client_id': 2,
		'client_secret': client_secret,
		'provider': 'users',
	};

	let res = await app.api.call(appConst.apiUrl.auth.token.method, appConst.apiUrl.auth.token.url, data);
	if (!res) {
		return;
	}
	// アクセストークンを保持
	app.setToken(res);

	res = await app.api.call(appConst.apiUrl.auth.getMyData.method, appConst.apiUrl.auth.getMyData.url, {}, app.showError, false);
	if (!res || res.data.user_type == 1) {
		app.clearToken();
		return;
	}
	// localStorageにユーザ情報保存
	app.setUserInfo(res.data);
	// ユーザー用サイドメニューへ切り替え
	login.pageScope.$root.login_status = true

	// プッシュ通知用トークン登録
	if (typeof FirebasePlugin !== 'undefined') {
		FirebasePlugin.getToken(async function (fcmToken) {
			data = {
				check: "4",
				device_id: fcmToken,
			};
			let res = await app.api.call(appConst.apiUrl.users.update.method, appConst.apiUrl.users.update.url + localStorage.getItem('id'), data, null, app.showError, false);
			if (res){
				localStorage.setItem('deviceId', fcmToken);
			}
		}, function (error) {
			console.error(error);
			alert('token get error')
		});
	}

	app.jumpPage(login, appVue.views.top);
}