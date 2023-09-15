// 画面定義 -------------------------
var re_details = {};

// Vue定義 -------------------------
appVue.views.post.re_details = {
    key: 'post/re_details',
    template: '#re_details',
    data: () => {
        return {
            page: appConst.page.post.re_details,
            form: {},
            view: {},
            error: {},
            login_status: app.isLogin() ? 1 : 0, // appVue.vm.login_status

        };
    },
    methods: {
        init: init,
        dateFormat: function (date) {return app.formatYYYYMMDD(date);},
        moveToPrev: function () {app.prevPage(re_details)},
        moveToComment: function (tweet_id) {re_details.moveToComment(tweet_id);},
        moveToProfile: function (user_id) {re_details.moveToProfile(user_id);},
        moveToDetails: function (tweet_id) {re_details.moveToDetails(tweet_id);},
        moveToReDetails: function (comment_id) {re_details.moveToReDetails(comment_id);},
        get_avator_url: function (image_id, admin_flg) {return app.get_avator_url(image_id, admin_flg)},
        check_tree: function (child_id, index, childArr) {re_details.check_tree(child_id, index, childArr);},
        moveToLogin: function () {app.replacePage(re_details, appVue.views.login);},
        report_contents: report_contents,
        showConfirmation: function(){
            //ダイアログ表示
            app.showTemplateDialog(
                "report-dialog-redetail",
                "report-dialog-redetail.html"
            );
        },
        cancel_report: function(){
            app.hideDialog("report-dialog-redetail");
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
        re_details.pageScope = this;

        app.setCurrentPage(re_details, appVue.views.post.re_details);
        header.init(re_details);
        footer.init(re_details);
        bottomNavi.init(re_details);	// ボトムナビゲーション初期化

        let data = {
            id: app.shared.post.comment_id,
            login_user_id: localStorage.getItem('id')
        }

        //　ツイート詳細を取得
        let tweet_index = await app.api.call(appConst.apiUrl.post.index_tree.method, appConst.apiUrl.post.index_tree.url, data, null, app.showError, true);
        if (!tweet_index) {
            // エラー
            return;
        }

        // データ設定（画面表示）
        //親ツイート
        re_details.pageScope.$set(re_details.pageScope.view, "user_id", tweet_index.data.tweetArr.user_id);
        re_details.pageScope.$set(re_details.pageScope.view, "image_id", tweet_index.data.tweetArr.image_id);
        re_details.pageScope.$set(re_details.pageScope.view, "nickname", tweet_index.data.tweetArr.nickname);
        re_details.pageScope.$set(re_details.pageScope.view, "created_at", tweet_index.data.tweetArr.created_at);
        re_details.pageScope.$set(re_details.pageScope.view, "tweet", tweet_index.data.tweetArr.tweet);
        re_details.pageScope.$set(re_details.pageScope.view, "check1", tweet_index.data.tweetArr.check1);
        re_details.pageScope.$set(re_details.pageScope.view, "check2", tweet_index.data.tweetArr.check2);
        re_details.pageScope.$set(re_details.pageScope.view, "check3", tweet_index.data.tweetArr.check3);
        re_details.pageScope.$set(re_details.pageScope.view, "comment_cnt", tweet_index.data.tweetArr.comment_cnt);
        re_details.pageScope.$set(re_details.pageScope.view, "tweet_id", tweet_index.data.tweetArr.id);

        //カレントツイート
        re_details.pageScope.$set(re_details.pageScope.view, "current_user_id", tweet_index.data.currentArr.user_id);
        re_details.pageScope.$set(re_details.pageScope.view, "current_image_id", tweet_index.data.currentArr.image_id);
        re_details.pageScope.$set(re_details.pageScope.view, "current_nickname", tweet_index.data.currentArr.nickname);
        re_details.pageScope.$set(re_details.pageScope.view, "current_created_at", tweet_index.data.currentArr.created_at);
        re_details.pageScope.$set(re_details.pageScope.view, "current_tweet", tweet_index.data.currentArr.tweet);
        re_details.pageScope.$set(re_details.pageScope.view, "current_check1", tweet_index.data.currentArr.check1);
        re_details.pageScope.$set(re_details.pageScope.view, "current_check2", tweet_index.data.currentArr.check2);
        re_details.pageScope.$set(re_details.pageScope.view, "current_check3", tweet_index.data.currentArr.check3);
        re_details.pageScope.$set(re_details.pageScope.view, "current_comment_cnt", tweet_index.data.currentArr.comment_cnt);
        re_details.pageScope.$set(re_details.pageScope.view, "current_id", tweet_index.data.currentArr.id);
        re_details.pageScope.$set(re_details.pageScope.view, "kanri_user_flg", tweet_index.data.currentArr.kanri_user_flg);

        //子のリスト
        re_details.setArray(tweet_index.data.childArr, "child_list");


        //親のリスト
        tweet_index.data.parentArr = Object.keys(tweet_index.data.parentArr).map(function (key) {return tweet_index.data.parentArr[key]});
        re_details.setArray(tweet_index.data.parentArr, "parent_list");

    } catch (err) {
        alert('login.init' + '\n' + err.message);
        throw err;
    } finally {
    }
}


//＊＊＊ 内部用function群 ＊＊＊//

re_details.moveToComment = function(comment_id){
    app.shared.post['comment_flag'] = 1;
    app.shared.post['comment_id'] = comment_id;
    app.nextPage(re_details, appVue.views.post.comment);
}

re_details.moveToProfile = function(user_id){
    app.shared.common.target_id = user_id;
    app.shared.post['back_to_detail_flag'] = true;
    app.shared.post['back_to_index_flag'] = false;
    app.nextPage(re_details, appVue.views.user.profile)
}

re_details.moveToDetails = function(tweet_id){
    app.shared.post['tweet_id'] = tweet_id;
    app.nextPage(re_details, appVue.views.post.details)
}

re_details.moveToReDetails = function(comment_id){
    app.shared.post['comment_id'] = comment_id;
    re_details.pageScope.init();
}

re_details.setArray = function(comment_array, list_name){

    if (Object.keys(comment_array).length != 0) {
        re_details.pageScope.$set(re_details.pageScope.view, list_name, comment_array)
    }else{
        re_details.pageScope.$set(re_details.pageScope.view, list_name, [])
    }

}

re_details.check_tree = function(child_id, index, childArr){
    index = index + 1;
    let result = (index >= childArr.length) ? false : (childArr[index].parent_id == child_id);
    return result;
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

        app.hideDialog("report-dialog-redetail");

        //ダイアログ表示
        app.showTemplateDialog(
            "report-complete-dialog-redetail",
            "report-complete-dialog-redetail.html"
        );

	} catch (err) {
		throw err;
	}

}