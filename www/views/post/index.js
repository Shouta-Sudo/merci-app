// 画面定義 -------------------------
var index = {};

// Vue定義 -------------------------
appVue.views.post.index = {
	key: "post/index",
	template: "#index",
	data: () => {
		return {
			page: appConst.page.post.index,
			form: {},
			view: {},
			title: appConst.page.post.index.title,
            tweet_list: [],
			loaded_page: 0,
			last_page: null,
			error: {},
			// その他
			login_status: app.isLogin() ? 1 : 0, // appVue.vm.login_status

		};
	},
	methods: {
		init: init,
		hide: hide,
		moveToDetail: function (tweet_id) {index.moveToDetail(tweet_id);},
		moveToComment: function (tweet_id) {index.moveToComment(tweet_id);},
		moveToProfile: function (user_id) {index.moveToProfile(user_id);},
		moveToLogin: function () {app.replacePage(index, appVue.views.login);},
		plusOne: function (tweet_id, button_id, button_flag) { index.plusOne(tweet_id, button_id, button_flag); },
		get_avator_url: function (image_id, admin_flg) {
			return app.get_avator_url(image_id, admin_flg);
		},
		scrolledToBottom: scrolledToBottom,
        add_tweets: add_tweets,
	},
	watch: {},
};

// 処理 -------------------------
// 初期化
async function init() {
	try {
		// ローディングマスク解除
		$("#loadingMask").hide();
		// ページオブジェクトを設定
		index.pageScope = this;
		app.setCurrentPage(index, appVue.views.post.index);
		header.init(index);
		footer.init(index);
		bottomNavi.init(index);	// ボトムナビゲーション初期化
		//index.plusOneComment();
		this.add_tweets();

	} catch (err) {
		alert("login.init" + "\n" + err.message);
		throw err;
	} finally {
	}
}

function hide() {
	app.shared.post_user_id = null
}

//＊＊＊ 内部用function群 ＊＊＊//

//アイコンの数に+1
index.plusOne = async function (tweet_id, button_id, button_flag) {
	try {
		if (button_flag == 0) {
			let data = {};
			data["check" + button_id] = button_id;

			//　クリックしたアイコンに+1
			let plus_one_res = await app.api.call(
				appConst.apiUrl.post.plus_one.method,
				appConst.apiUrl.post.plus_one.url + tweet_id,
				data,
				null,
				app.showError,
				false
			);
			if (!plus_one_res || plus_one_res.data == false) {
				// エラー
				return;
			}

			//画面に反映
			document.getElementById(
				"sp_check" + button_id + "_cnt_" + tweet_id
			).innerHTML = String(plus_one_res.data["check" + button_id]);

			//ボタンを非活性化
			let img1 = document.getElementById("sp_on_1_" + tweet_id);
			img1.setAttribute("src", "img/icon_tweet_like_disabled.svg");

			let img2 = document.getElementById("sp_on_2_" + tweet_id);
			img2.setAttribute("src", "img/icon_tweet_handclap_disabled.svg");

			let img3 = document.getElementById("sp_on_3_" + tweet_id);
			img3.setAttribute("src", "img/icon_tweet_understand_disabled.svg");
		}
	} catch (err) {
		alert("create tweet" + "\n" + err.message);
		throw err;
	} finally {
	}
};

//コメントの数に+1
/*index.plusOneComment = async function() {
	try {

		if(app.shared.post && app.shared.post.comment_success == true){
			let comment_cnt = document.getElementById("comment_" + app.shared.post.tweet_id);
			comment_cnt.innerText++;
			app.shared.post.comment_success = null;
		}

	} catch (err) {
		alert("create tweet" + "\n" + err.message);
		throw err;
	} finally {
	}
};
*/
async function scrolledToBottom() {
	if (this.loaded_page < this.last_page) await this.add_tweets();
	// Infinite-scroll再発火させるための処置
	document.getElementById("-post-index-")._loadingContent = false;
}

//　ツイート一覧を取得
async function add_tweets() {
	let data = {
		tweet_flg: "1",
//		condition: localStorage.getItem("condition"),
		login_user_id: localStorage.getItem("id"),
		page: ++this.loaded_page,
	};

	try {
		//　ツイート一覧を取得
		let tweet_list = await app.api.call(
			appConst.apiUrl.post.get.method,
			appConst.apiUrl.post.get.url,
			data,
			null,
			app.showError,
			true
		);
		if (!tweet_list) {return;}

		if(tweet_list.data.data.length == 0 && this.last_page == null){
			document.getElementById("no_tweet").innerHTML = appConst.page.post.index.no_tweet;
			return;
		}

		this.tweet_list = this.tweet_list.concat(tweet_list.data.data);
		if (this.loaded_page == 1) this.last_page = tweet_list.data.last_page;
	} catch (err) {
		throw err;
	}
}

index.moveToDetail = function(tweet_id){

	if (app.shared.post) {
		app.shared.post['tweet_id'] = tweet_id;
	}else{
		app.shared.post = {tweet_id: tweet_id,};
	}

	app.nextPage(index, appVue.views.post.details);
}

index.moveToComment = function(tweet_id){
	app.shared.post = {
		comment_flag: 0,
		tweet_id: tweet_id,
	};
	app.nextPage(index, appVue.views.post.comment);
}

index.moveToProfile = function(user_id){
	app.shared.common['target_id'] = user_id;
	if (app.shared.post) {
		app.shared.post['back_to_index_flag'] = true;
		app.shared.post['back_to_detail_flag'] = false;
	}else{
		app.shared.post = { back_to_index_flag: true, back_to_detail_flag: false, };
	}
	
	app.nextPage(index, appVue.views.user.profile)
}