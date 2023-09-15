// 画面定義 -------------------------
var create = {};

// Vue定義 -------------------------
appVue.views.post.create = {
    key: 'post/create',
    template: '#create',
    data: () => {
        return {
            page: appConst.page.post.create,
            form: {
                tweet_contents: null
            },
            view: {
                title: appConst.page.post.create.title,
            },
            error: {},
        };
    },
    methods: {
        init: init,
        showConfirmation: function(){
            //ダイアログ表示
            app.showTemplateDialog(
                "tweet-dialog",
                "tweet-dialog.html"
            );
        },
        tweet: function(){
            create.tweet()
        },
        canceltweet: function(){
            app.hideDialog("tweet-dialog");
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
        create.pageScope = this;
        bottomNavi.init(create);	// ボトムナビゲーション初期化

        app.setCurrentPage(create, appVue.views.post.create);
        header.init(create);

    } catch (err) {
        alert('login.init' + '\n' + err.message);
        throw err;
    } finally {
    }
}


//＊＊＊ 内部用function群 ＊＊＊//

//つぶやきの投稿
create.tweet = async function() {

    try {

        app.hideDialog("tweet-dialog");

        // ツイート内容
        data = {
            tweet: create.pageScope.form.tweet_contents,
            user_id: localStorage.getItem("id"),
            tweet_flg: 1
        };
    
        //　ツイート内容を送信
        let tweet_res = await app.api.call(appConst.apiUrl.post.create.method, appConst.apiUrl.post.create.url, data, null, app.showError, true);
        if (!tweet_res) {
            // エラー
            return;
        }

        create.pageScope.form.tweet_contents = null;

        //ダイアログ表示
        app.showTemplateDialog(
            "tweet-complete-dialog",
            "tweet-complete-dialog.html"
        );

    } catch (err) {
        alert('create tweet' + '\n' + err.message);
        throw err;
    } finally {
    }
    
}


