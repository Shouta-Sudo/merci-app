// 画面定義 -------------------------
var details = {};

// Vue定義 -------------------------
appVue.views.post.details = {
    key: 'post/details',
    template: '#details',
    data: () => {
        return {
            page: appConst.page.post.details,
            form: {},
            view: {},
            title: appConst.page.post.details.title,
            comment_list: [],
            tweet_details: {},
            loaded_page: 0,
			last_page: null,
            error: {},
            login_status: app.isLogin() ? 1 : 0, // appVue.vm.login_status
        };
    },
    methods: {
        init: init,
        dateFormat: function (date) {return app.formatYYYYMMDD(date);},
        moveToPrev: function () {app.prevPage(details);},
        moveToComment: function (comment_id) {details.moveToComment(comment_id);},
        moveToProfile: function (user_id) {details.moveToProfile(user_id);},
        moveToReDetails: function (comment_id) {details.moveToReDetails(comment_id);},
        moveToLogin: function () {app.replacePage(details, appVue.views.login);},
        moveToIndex: function () {app.replacePage(details, appVue.views.post.index);},
        get_avator_url: function (image_id, admin_flg) {return app.get_avator_url(image_id, admin_flg)},
        scrolledToBottom: scrolledToBottom,
        add_comments: add_comments,
        report_contents: report_contents,
        showConfirmation: function(){
            //ダイアログ表示
            app.showTemplateDialog(
                "report-dialog",
                "report-dialog.html"
            );
        },
        cancel_report: function(){
            app.hideDialog("report-dialog");
        },
    },
    watch: {
    }
};

// 処理 -------------------------
// 初期化
async function init() {
    try {
        // 表示編集(データ通信などして設定する)
        // ローディングマスク解除
        $('#loadingMask').hide();
        // ページオブジェクトを設定
        details.pageScope = this;

        app.setCurrentPage(details, appVue.views.post.details);
        header.init(details);
        footer.init(details);
        bottomNavi.init(details);	// ボトムナビゲーション初期化

        //　ツイート詳細を取得
        let tweet_detail = await app.api.call(appConst.apiUrl.post.get.method, appConst.apiUrl.post.get.url + '/' + app.shared.post.tweet_id, null, null, app.showError, true);
        if (!tweet_detail) {
            // エラー
            return;
        }

        // データ設定（画面表示）
        //ツイート詳細
        details.pageScope.$set(details.pageScope.tweet_details, "user_id", tweet_detail.data.user_id);
        details.pageScope.$set(details.pageScope.tweet_details, "image_id", tweet_detail.data.image_id);
        details.pageScope.$set(details.pageScope.tweet_details, "nickname", tweet_detail.data.nickname);
        details.pageScope.$set(details.pageScope.tweet_details, "created_at", tweet_detail.data.created_at);
        details.pageScope.$set(details.pageScope.tweet_details, "tweet", tweet_detail.data.tweet);
        details.pageScope.$set(details.pageScope.tweet_details, "check1", tweet_detail.data.check1);
        details.pageScope.$set(details.pageScope.tweet_details, "check2", tweet_detail.data.check2);
        details.pageScope.$set(details.pageScope.tweet_details, "check3", tweet_detail.data.check3);
        details.pageScope.$set(details.pageScope.tweet_details, "comment_cnt", tweet_detail.data.comment_cnt);
        details.pageScope.$set(details.pageScope.tweet_details, "tweet_id", tweet_detail.data.id);
        details.pageScope.$set(details.pageScope.tweet_details, "kanri_user_flg", tweet_detail.data.kanri_user_flg);

        //コメント表示
        this.add_comments();

    } catch (err) {
        alert('login.init' + '\n' + err.message);
        throw err;
    } finally {
    }
}


//＊＊＊ 内部用function群 ＊＊＊//

details.moveToComment = function(comment_id){
    app.shared.post.comment_flag = 0;
    app.shared.post.comment_id = comment_id;
    app.nextPage(details, appVue.views.post.comment);
}

details.moveToProfile = function(user_id){
    app.shared.common['target_id'] = user_id;
    app.shared.post['back_to_detail_flag'] = true;
    app.shared.post['back_to_index_flag'] = false;
    app.nextPage(details, appVue.views.user.profile)
}

details.moveToReDetails = function(comment_id){
    app.shared.post.comment_id = comment_id
    app.nextPage(details, appVue.views.post.re_details);
}

function scrolledToBottom() {
	if (this.loaded_page < this.last_page) this.add_comments();
	// Infinite-scroll再発火させるための処置
	document.getElementById("-post-details-")._loadingContent = false;
}

//　コメント一覧を取得
async function add_comments() {

	let data = {
        parent_id: app.shared.post.tweet_id,
        login_user_id: localStorage.getItem('id'),
        per_page: 20,
        page: ++this.loaded_page,
    }

	try {

        //　コメント一覧を取得
        let comment_list = await app.api.call(appConst.apiUrl.post.get.method, appConst.apiUrl.post.get.url, data, null, app.showError, true);
        if (!comment_list) {
            // エラー
            return;
        }

		this.comment_list = this.comment_list.concat(comment_list.data.data);
		if (this.loaded_page == 1) this.last_page = comment_list.data.last_page;
	} catch (err) {
		throw err;
	}

}

async function report_contents() {

	let data = {
        inquiry_flg: '2',
        demand_flg: '1',
        email: localStorage.getItem('email') ? localStorage.getItem('email') : 'nologin@gmail.com',
        title: 'ツイート内容の報告。',
        name: app.isLogin() ? app.shared.common.name : '未ログイン',
        detail: 'ツイート内容の報告がありました。ツイートID：'+details.pageScope.tweet_details.tweet_id+'   投稿者ID：'+localStorage.getItem('id')
    }

	try {

        //　運営に報告
        let res = await app.api.call(appConst.apiUrl.inquiry.postInquiry.method, appConst.apiUrl.inquiry.postInquiry.url, data, null, app.showError, true);
        if (!res) {
            // エラー
            return;
        }

        app.hideDialog("report-dialog");

        //ダイアログ表示
        app.showTemplateDialog(
            "report-complete-dialog",
            "report-complete-dialog.html"
        );

	} catch (err) {
		throw err;
	}

}