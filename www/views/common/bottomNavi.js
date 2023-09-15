// 画面定義 -------------------------
var bottomNavi = {};

// 画面データ設定
bottomNavi.setData = function() {
	try {
		return {
			// title: bottomNavi.title,
			login_status: app.isLogin(),
		};
	} catch(err) {
		alert('bottomNavi.setData' + '\n' + err.message);
	} finally {
	}
};

// 初期化（インクルード画面から呼び出される）
/**
 * フッターに対する初期化処理
 * @param {*} parent インクルードした画面
 * @param {function} jumpCallback ページ遷移時に実行するコールバック関数
 */
bottomNavi.init = function(parent, jumpCallback = null) {
	try {
		bottomNavi.parent = parent;
		bottomNavi.jumpCallback = jumpCallback;
		return;

	} catch(err) {
		alert('bottomNavi.init' + '\n' + err.message);
	} finally {
	}
};

Vue.component('bottom-navi', {
	data: bottomNavi.setData,
	methods: {
		changePage: function (params) {
			header.changePage(params, bottomNavi.jumpCallback);
			bottomNavi.jumpCallback = null;
		},
	},
	template: '#bottomNavi',
});
