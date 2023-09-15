// 画面定義 -------------------------
var reset_password = {};

// Vue定義 -------------------------
appVue.views.user.reset_password = {
	key: 'user/reset_password',
	template: '#reset_password',
	data: () => {
		return {
			page: appConst.page.user.reset_password,
			form: {
				email: null,
			},
			view: {
				title: appConst.page.user.reset_password.title,
			},
			error: {},
			isEmailValidated: false,
		};
	},
	methods: {
		init: async function () {
			/* 表示編集(データ通信などして設定する)
				 ローディングマスク解除 */
			$('#loadingMask').hide();
			// ページオブジェクトを設定
			reset_password.pageScope = this;
			app.setCurrentPage(reset_password, appVue.views.user.reset_password);
			header.init(reset_password);
			footer.init(reset_password);
			bottomNavi.init(reset_password);	// ボトムナビゲーション初期化
		},
		submit: async function () {
			try {
				let data = {
					'email': this.form.email,
					'grant_type': 'password',
					'client_id': 2,
					'client_secret': client_secret,
					'provider': 'users',
				};

				let res = await app.api.call(
					appConst.apiUrl.auth.resetPassword.method,
					appConst.apiUrl.auth.resetPassword.url,
					data,
					null,
					app.showError,
					false
				);
				if (!res) {
					return;
				}
				alert("入力されたメールアドレスにパスワードリセット用URLを送信しました。")
			} catch (err) {
				alert('reset_password.init' + '\n' + err.message);
				throw err;
			}
		},
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
	}
};