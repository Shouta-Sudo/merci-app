// 画面定義 -------------------------
var header = {};

// 画面データ設定
header.setData = function() {
	try {
		return {
			login_status: app.isLogin(),
		};
	} catch(err) {
		alert('header.setData' + '\n' + err.message);
	} finally {
	}
};

// 初期化（インクルード画面から呼び出される）
header.init = function(parent, jumpCallback = null) {
	try {
		header.parent = parent;
		header.jumpCallback = jumpCallback;
		return;

	} catch(err) {
		alert('header.init' + '\n' + err.message);
	} finally {
	}
};

/**
 *
 * @param {string} id
 */
 header.changePage = async function(id, jumpCallback = null) {
    try {
        if (jumpCallback){
            jumpCallback();
        }

        header.reset_temp_data()

        let page = null;
        switch (id) {
            case 'top': //TOP
                page = appVue.views.top;
                break;
            case 'users': //メルママ一覧
                page = appVue.views.user.index;
                break;
            case 'searchProducts'://商品を探す
                app.showInAppBrowser('product/list/');
                return;
            case 'deal_list'://出品・取引リスト
                app.showInAppBrowser('product/productlist/');
                return;
            case 'draft_list'://下書きリスト
                app.showInAppBrowser('product/draftlist/');
                return;
            case 'purchase_list'://購入リスト
                app.showInAppBrowser('order/orderlist/');
                return;
            case 'point_list'://ポイントリスト
                app.showInAppBrowser('myAccount/point/');
                return;
            case 'sales_list': //売上リスト
                app.showInAppBrowser('order/selllist/');
                return;
            case 'tweet_list'://ツイート一覧
                page = appVue.views.post.index;
                break;
            case 'post_list'://投稿一覧
                app.showInAppBrowser('myAccount/mypost/');
                return;
            case 'message_list'://メッセージ一覧
                app.showInAppBrowser('user/messageList/');
                return;
            case 'growth'://成長カレンダー
                app.showInAppBrowser('growth/mylist/');
                return;
            case 'pay_info'://お支払い情報の変更
                app.showInAppBrowser('myAccount/payment/');
                return;
            case 'regist_info'://登録情報の変更
                app.showInAppBrowser('myAccount/updateUser/');
                return;
            case 'password'://パスワード変更
                app.showInAppBrowser('myAccount/updatePassword/');
                return;
            case 'mail_address': //メールアドレス変更
                app.showInAppBrowser('myAccount/updateEmail/');
                return;
            case 'mypage': //マイページ
                app.showInAppBrowser('myAccount/mypage/');
                return;
			case 'product_regist': //出品
                app.showInAppBrowser('product/regist/');
                return;
            case 'review_product': //口コミ商品一覧
                app.showInAppBrowser('reviewProduct/list/');
                return;
            case 'tweet'://ツイート
                page = appVue.views.post.create;
                break;
            case 'user_event': //参加イベント
                app.showInAppBrowser('userEvent/join/');
                return;
            case 'user_event_list': //イベントリスト
                app.showInAppBrowser('userEvent/list/');
                return;
            case 'user_event_edit': //イベント投稿と履歴
                app.showInAppBrowser('userEvent/edit/');
                return;
            case 'user_event_sales': //イベント売上申請
                app.showInAppBrowser('userEvent/sellList/');
                return;
			case 'news': //お知らせリスト
                app.showInAppBrowser('myAccount/news/');
                return;
			case 'new_entry': //新規会員
                app.showInAppBrowser('auth/entry/');
                return;
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
            case 'follow'://フォローリスト
                app.showInAppBrowser('myAccount/follow/');
                return;
            case 'follower'://フォロワーリスト
                app.showInAppBrowser('myAccount/follower/');
                return;
            case 'login'://ログイン
                page = appVue.views.login;
                break;
            case 'logout'://ログアウト
                page = appVue.views.login;
                app.clearLoginInfo();
                //header.parent.pageScope.$root.login_status = false;//ここでflse設定すると、TOPページが動かなるため、TOPページでのfalse設定に変更
                break;
			case 'company_profile': //会社概要
                app.showInAppBrowser('information/companyProfile/');
                return;
			case 'pressrelease': //プレスリリース
                app.showInAppBrowser('information/pressrelease/');
                return;
			case 'guide': //使い方ガイド
                app.showInAppBrowser('information/guide/');
                return;
			case 'faq': //よくある質問
                app.showInAppBrowser('inquiry/faq/');
                return;
			case 'advertisement': //広告出稿に関して
                app.showInAppBrowser('inquiry/advertisement/');
                return;
			case 'opinion': //ご意見・ご要望
                app.showInAppBrowser('inquiry/opinion/');
                return;
			case 'inquiry': //各種お問い合わせ
                app.showInAppBrowser('inquiry/inquiry/');
                return;
			case 'privacy': //プライバシーポリシー
                app.showInAppBrowser('information/privacy/');
                return;
			case 'terms': //利用規約
                app.showInAppBrowser('information/terms/');
                return;
			case 'sctl': //特商法
                app.showInAppBrowser('information/sctl/');
                return;
			case 'twitter': //ツイッター
				app.callInAppBrowser('https://twitter.com/tomorrows_ceo');
                return;
			case 'instagram': //インスタグラム
				app.callInAppBrowser('https://www.instagram.com/merci.maman_official/');
                return;
			case 'line': //LINE
				app.callInAppBrowser('https://line.me/ja/');
                return;
            default:
                return;
        }
        header.parent.pageScope.$root.openSide = false;
        //if (!app.isLogin()) page = appVue.views.login;
	    if (app.currentView == page) return
	    app.jumpPage(header.parent, page);
    } catch(err) {
        alert('header.changePage' + '\n' + err.message);
        throw err;
    } finally {
    }
 };

header.reset_temp_data = () => {
    app.shared.post_user_id = null
}

/**
 * ヘッダー定義
 */
Vue.component('page-header', {
	data: header.setData,
	props: {

	},
	methods: {
		init: header.init,
		pushMenu: function () {
			this.$root.openSide = true;
		},
		changePage: function (params) {
			header.changePage(params, header.jumpCallback);
			header.jumpCallback = null;
		}
	},
	template: '#pageHeader',

});

