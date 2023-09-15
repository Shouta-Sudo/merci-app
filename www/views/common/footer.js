// 画面定義 -------------------------
var footer = {};

// 画面データ設定
footer.setData = function() {
	try {
		return {
			// title: footer.title,
		};
	} catch(err) {
		alert('footer.setData' + '\n' + err.message);
	} finally {
	}
};

// 初期化（インクルード画面から呼び出される）
/**
 * フッターに対する初期化処理
 * @param {*} parent インクルードした画面
 * @param {function} jumpCallback ページ遷移時に実行するコールバック関数
 */
footer.init = function(parent, jumpCallback = null) {
	try {
		footer.parent = parent;
		footer.jumpCallback = jumpCallback;
		return;

	} catch(err) {
		alert('footer.init' + '\n' + err.message);
	} finally {
	}
};

Vue.component('page-footer', {
	data: footer.setData,
	methods: {
		changePage: function (params) {
			header.changePage(params, footer.jumpCallback);
			footer.jumpCallback = null;
		},
	},
	template: '#pageFooter',
});
