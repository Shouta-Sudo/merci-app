// 画面定義 -------------------------
var comment = {};

// Vue定義 -------------------------
appVue.views.post.comment = {
    key: 'post/comment',
    template: '#comment',
    data: () => {
        return {
            page: appConst.page.post.comment,
            form: {
                comment_contents: null,
                comment_flag: app.shared.post.comment_flag //0：親ツイートへのコメント　１：コメントへのコメント
            },
            view: {},
            title1: appConst.page.post.comment.title1, //親ツイートへのコメント
            title2: appConst.page.post.comment.title2, //コメントへのコメント
            error: {},
        };
    },
    methods: {
        init: init,
        showConfirmation: function(){
            //ダイアログ表示
            app.showTemplateDialog(
                "comment-dialog",
                "comment-dialog.html"
            );
        },
        comment: function(){
            comment.makeComment()
        },
        cancelcomment: function(){
            app.hideDialog("comment-dialog");
        },
        moveToPrev: function () {app.prevPage(comment)},
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
        comment.pageScope = this;

        app.setCurrentPage(comment, appVue.views.post.comment);
        header.init(comment);
        footer.init(comment);
        bottomNavi.init(comment);	// ボトムナビゲーション初期化

        data = {
            id: (app.shared.post.comment_flag == 0) ? app.shared.post.tweet_id : app.shared.post.comment_id,
            //condition: localStorage.getItem('condition')
        }
        
        //　ツイート内容を取得
        let tweet_res = await app.api.call(appConst.apiUrl.post.get.method, appConst.apiUrl.post.get.url, data, null, app.showError, true);

        if (!tweet_res || tweet_res.data.data.length == 0) {
            // エラー
            return;
        }

        // データ設定（画面表示）

		//ツイート内容
		comment.pageScope.$set(comment.pageScope.view, "tweet_contents", tweet_res.data.data[0].tweet);


    } catch (err) {
        alert('login.init' + '\n' + err.message);
        throw err;
    } finally {
    }
}


//＊＊＊ 内部用function群 ＊＊＊//

//コメントの投稿
comment.makeComment = async function(){

    try {

        app.hideDialog("comment-dialog");

        // ツイート内容
        data = {
            tweet: comment.pageScope.form.comment_contents,
            user_id: localStorage.getItem("id"),
            tweet_flg: "2",
            parent_id: (app.shared.post.comment_flag == 0) ? app.shared.post.tweet_id : app.shared.post.comment_id,
        };
    
        //　ツイート内容を送信
        let tweet_res = await app.api.call(appConst.apiUrl.post.create.method, appConst.apiUrl.post.create.url, data, null, app.showError, false);
        if (tweet_res) {

            app.shared.post.comment_success = true;

            (comment.pageScope.form.comment_flag == 1) ? app.nextPage(comment, appVue.views.post.details) : app.nextPage(comment, appVue.views.post.index);
            
        }

    } catch (err) {
        alert('comment tweet' + '\n' + err.message);
        throw err;
    } finally {
    }

}