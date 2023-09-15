// 画面定義 -------------------------
var header2 = {};

// 画面データ設定
header2.setData = function() {
	try {
		return {
            login_status: app.isLogin(),
			like_name: null,
		};
	} catch(err) {
		alert('header2.setData' + '\n' + err.message);
	} finally {
	}
};

// 初期化（インクルード画面から呼び出される）
/**
 * ヘッダー２に対する初期化処理
 * @param {*} parent インクルードした画面
 * @param {function} jumpCallback ページ遷移時に実行するコールバック関数
 */
header2.init = function(parent, jumpCallback = null) {
	try {
		header2.parent = parent;
		header2.jumpCallback = jumpCallback;
		return;

	} catch(err) {
		alert('header2.init' + '\n' + err.message);
	} finally {
	}
};

/**
 *
 * @param {string} id
 */
 header2.changePage = async function(id, jumpCallback = null) {
    try {
        if (jumpCallback){
            jumpCallback();
        }

		let page = null;
        switch (id) {
			case 'top': //TOP
                page = appVue.views.top;
                break;
            case 'used': //既製品
                app.showInAppBrowser('product/listType1/');
                return;
            case 'handmade'://ハンドメイド
                app.showInAppBrowser('product/listType2/');
                return;
			case 'contents': //コンテンツ
                app.showInAppBrowser('content/present/');
                return;
			case 'mermama_mate': //メルママメイト
                page = appVue.views.user.index;
                break;
            case 'experience'://みんなの体験記
                app.showInAppBrowser('board/exp/');
                return;
            default:
                return;
        }

        header.parent.pageScope.$root.openSide = false;
        if (!app.isLogin()) page = appVue.views.top
        if (app.currentView == page) return
        app.nextPage(header.parent, page);
    } catch(err) {
        alert('header2.changePage' + '\n' + err.message);
        throw err;
    } finally {
    }
};

Vue.component('page-header2', {
	data: header2.setData,
	methods: {
		changePage: function (params) {
			header2.changePage(params, header2.jumpCallback);
			header2.jumpCallback = null;
        },
        moveToWeb: function (url, param) {
            app.showInAppBrowser(url, param)
        },
	},
	template: '#pageHeader2',
});
