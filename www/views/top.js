// import LoginForm from './user/login_component'

// 画面定義 -------------------------
var top = {};

// Vue定義 -------------------------
appVue.views.top = {
	key: 'top',
	template: '#top',
	// components: { LoginForm },
	data: () => {
		return {
			page: appConst.page.top,

			// ログイン
			form: {
			},
			error: {},
			month:null,

			// news: null,
			advertisements: null,
			tweet_list: null,
			// tweet: { tweet: null, image_id:0, comment_cnt: 0, check1: 0, check2: 0, check3:0 },
			products_num: 4,
			growth_array: ['0歳', '1歳','2歳','3歳','4歳','5歳','6~10歳','11歳~'],
			pre_growth_array: ['3ヶ月', '4ヶ月','5ヶ月','6ヶ月','7ヶ月','8ヶ月','9ヶ月','臨月'],
			gt: 1,
			event_array: [],

			// その他
			login_status: app.isLogin() ? 1 : 0, // appVue.vm.login_status
			user_profile_view: appVue.views.user.profile,
			tweet_details_view: appVue.views.post.details,
			tweet_comment_view: appVue.views.post.comment,
		};
	},
	computed: {
	},
	methods: {
		init: init,
		set_profile: set_profile,

		// ログイン
		registNew: function () {
			app.showInAppBrowser('auth/entry/');
		},
		changeMamaStatus: function(gt){
			this.gt = gt
		},
		get_tweets: get_tweets,
		get_slides: get_slides,
		put_tweet: put_tweet,
		get_avator_url: get_avator_url,
		get_event_url: get_event_url,
		get_top_contents_url: get_top_contents_url,
		to_last_page: to_last_page,
		is_sold_out: is_sold_out,
		get_sold_out_text: get_sold_out_text,
		nextPage: nextPage,
		moveToWeb: moveToWeb,
		moveFromSlide: moveFromSlide,
		openURL: openURL,
		// get_news: get_news,
		get_advertisement: get_advertisement,
	    get_condition: get_condition,
		get_events: get_events,
		moveToLogin: function () {app.replacePage(top, appVue.views.login);},
	},
	watch: {
	}
};

// 初期化
async function init() {
	try {
		$('#loadingMask').hide(); // ローディングマスク解除
		top.pageScope = this;			// ページオブジェクトを設定
		app.setCurrentPage(top, appVue.views.top); // 最終ページを現在のページに設定
		header.init(top);	// ヘッダー初期化
		footer.init(top);	// フッター初期化
		bottomNavi.init(top);	// ボトムナビゲーション初期化
		await this.get_advertisement()
		await this.get_tweets()
		await this.get_events()
		if(!app.shared.top){await this.get_slides()}
		

		if (app.isLogin()) {
			profile = await this.set_profile()
			// this.news = await this.get_news()
			// TOPのユーザー専用画面表示フラグ
			top.pageScope.$root.login_status = true
			this.to_last_page()
		}
		else{
			top.pageScope.$root.login_status = false
		}

		//今月
		var dObj = new Date();
		if(dObj.getMonth() ==11){
			this. month = 1;
		}
		else{
			this. month = dObj.getMonth() + 2;
		}

	} catch (err) {
		alert('top.init' + '\n' + err.message);
		throw err;
	} finally {
	}
}


async function set_profile() {
	// ユーザーデータの取得
	res = await app.api.call(
		appConst.apiUrl.auth.getMyData.method,
		appConst.apiUrl.auth.getMyData.url,
		{},
		app.showError, false
	);

	if (!res) return;
	app.setUserInfo(res.data);
	return res.data
}

async function get_advertisement() {

	var objDate = new Date () ;
	var year = objDate.getFullYear() ;	// 年
	var month = objDate.getMonth() + 1 ;	// 月
	month = ("0"+month).slice(-2);	// 月

	res = await app.api.call(
		appConst.apiUrl.advertisement.index.method,
		appConst.apiUrl.advertisement.index.url,
		{
			open_flg: '1',
			type: '1',
			term: year+"-"+month
		},
		app.showError, false
	);

	this.advertisements = res ? res.data.data : null;
}

function to_last_page() {
	let id = app.shared.common.id;
	let lastPage = localStorage.getItem(id + '_current_page')

	if (lastPage) { // 最終アクセスページ情報があれば取得
		lastPage = JSON.parse(lastPage);
	}

	// 最終アクセスページがあれば、最終アクセスページに遷移
	if (lastPage) {
		let page = appVue.views[lastPage[0]];

		for (let index = 1; index < lastPage.length; index++) {
			page = page[lastPage[index]];
		}
		app.jumpPage(top, page);

	} else {
		// トップページへ遷移
		// app.jumpPage(login, appVue.views.top);
	}
}

async function get_tweets() {
	let data = {
    tweet_flg: 1,
    per_page: 2,
	}


	if (app.isLogin()) {
//		data.condition = parseInt(localStorage.getItem('condition'))
		data.login_user_id = parseInt(localStorage.getItem('id'))
	}

  try {
    let res = await app.api.call(
      appConst.apiUrl.users.tweet.method,
      appConst.apiUrl.users.tweet.url,
      data
      )
      this.tweet_list = res.data.data
  } catch (err) {
    throw err
  }
}

async function get_slides(){

	let data = {
		view_flg: 1
	}

	try {

		//スライダー取得
		let res = await app.api.call(appConst.apiUrl.slide.index.method,appConst.apiUrl.slide.index.url,data)

		if(res.data.data.length > 0){

			//画像の入れ込み
			app.shared.top = {slide_list:res.data.data}
			let html = createSlide(res.data.data);
			let elem = document.getElementById("top-slider-for");
			elem.innerHTML = html;

			//スライダー実行
			$('.slider-for').not('.slick-initialized').slick({
					autoplay: true,
					autoplaySpeed: 3000,
					speed: 600,
					arrows: false,
					dots: true
			});

		}

	} catch (err) {
		throw err
	}

}

async function put_tweet(tweet_id, check_num = 1) {
	await app.put_tweet(tweet_id, check_num)
	this.get_tweets()

}

function get_avator_url(image_id, admin_flg) {
  return app.get_avator_url(image_id, admin_flg)
}

function get_event_url(month) {
	  return app.get_event_url(month)
}

function get_top_contents_url() {
	  return app.get_top_contents_url()
}




function is_sold_out(product_status) {
  return !(product_status == 2) ? '' : 'purpleBg'
}

function get_sold_out_text(product_status) {
  return !(product_status == 2) ? 'SOLD OUT' : ''
}

function show_more_recently_checked_items() {
	this.is_pressed_recently_checked_items_show_more_button = !this.is_pressed_recently_checked_items_show_more_button
}

async function nextPage(to, id = null) {
	if (to == 'tweet_list')	to = appVue.views.post.index
	if (to == this.user_profile_view) app.shared.common['target_id'] = id //await app.get_user(id)
	if (to == this.user_profile_view) app.shared.post = { back_to_index_flag : true , back_to_detail_flag : false }
	if (to == this.tweet_details_view) app.shared.post = { tweet_id : id }
	if (to == this.tweet_comment_view) app.shared.post = { tweet_id : id, comment_flag : 0 }


	if (to == 'mermama_mate') to = appVue.views.user.index;

	app.nextPage(top, to)
}

function moveToWeb(url, param) {
	app.showInAppBrowser(url, param)
}

function openURL(url) {
	app.callInAppBrowser(url)
}

function get_condition(user_profile) {
	  return app.get_condition(user_profile)
	}

async function get_events(){

	let month = new Date().getMonth() + 2;

	try {
	let res = await app.api.call(
		appConst.apiUrl.event.index.method,
		appConst.apiUrl.event.index.url + month,
		{}
		)
		test = res.data.topic
		this.event_array = res.data.topic
	} catch (err) {
	throw err
	}

}

function createSlide(slide_list){
	let html = '';
	for(i = 0; i < slide_list.length; i++){
		html = (slide_list[i].images.length > 0) ? html + '<img src="'+slide_list[i].images[1].url+'" onClick = moveFromSlide('+i+')>' : html + '<img src="" onClick = moveFromSlide('+i+')>';
	}
	return html;
}

function moveFromSlide(i){
	let slide_list = app.shared.top.slide_list;
	let url = (slide_list[i]['eventpage_flg'] == 1) ? 'userEvent/top/' : 'content/page/?id='+slide_list[i]['id'];
	this.moveToWeb(url, '');
}
