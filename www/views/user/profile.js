// 画面定義 -------------------------
var user_profile = {};

var user_dataset = {
  user_detail: {
    prefecture_id: null,
  },
  user_profile: {
    image_id: null,
    nickname: null,
    chat: null,
    birthday: null,
    mother_interest1: null,
    mother_interest2: null,
    mother_interest3: null,
    mother_interest4: null,
    child_interest1: null,
    child_interest2: null,
    child_interest3: null,
    child_interest4: null,
    experience1: null,
    experience2: null,
    experience3: null,
    experience4: null,
    taste1: null,
    taste2: null,
    taste3: null,
    introduction: null,
  }
}

// Vue定義 -------------------------
appVue.views.user.profile = {
  key     : "user/profile",
  template: "#user_profile",
  data    : () => {
    return {
      // page : appConst.page.user.index,
      // view : { title: appConst.page.user.index.title },
      title                : appConst.page.user.profile.title,
      user                 : app.shared.common.user ? app.shared.common.user    : user_dataset,
      evaluation           : { good: 0, normal: 0, bad: 0 },
      sellList             : [],
      tweets               : [],
      experience_list      : [],
      favorites            : { userfollow: 0, userfollower: 0, userfavorite: 0 },
      tweet_sum            : {},
      is_following         : false,
      is_block             : false,
      is_others            : false,
      tweet_details_view   : appVue.views.post.details,
      tweet_comment_view   : appVue.views.post.comment,
      tweet_index_view: appVue.views.post.index,
      is_show_more_sellList: false,
      is_get_tweets_more   : false,
      is_get_experience_more: false,
      exp_page             : 1,
      login_user_chat      : 0,
      login_user_id      : 0,
      back_to_index_flag     : false,
      back_to_detail_flag     : false,
    }
  },
  computed: {
    show_sellList() {
      return this.is_show_more_sellList ? this.sellList : this.sellList.slice(0, 4)
    }
  },
  methods: {
    init: init,
    nextPage: nextPage,
    get_prefecture_name: get_prefecture_name,
    birthday_to_age: birthday_to_age,
    get_condition: get_condition,
    get_avator_url: get_avator_url,
    toggleFollow: toggleFollow,
    toUserIndex: toUserIndex,
    get_evaluation: get_evaluation,
    get_sellList: get_sellList,
    get_tweets: get_tweets,
    put_tweet: put_tweet,
    get_experience: get_experience,
    get_favorites: get_favorites,
    check_follow: check_follow,
    get_matching_taste_css: get_matching_taste_css,
    get_matching_taste_text: get_matching_taste_text,
    is_sold_out: is_sold_out,
    get_sold_out_text: get_sold_out_text,
    show_more_sellList: show_more_sellList,
    setBlock: setBlock,
    moveToWeb: function (url, param) {
			app.showInAppBrowser(url, param)
		},
    moveToExWeb: function (url){
      app.callInAppBrowser(url)
    },
    moveToPrev: function () {app.prevPage(user_profile);},
  },
  watch: {
    is_get_tweets_more: function () {
      this.get_tweets()
    },
    is_get_experience_more: function () {
      this.get_experience()
    },
  }
};

// 処理 -------------------------
/**
 * 初期化 / ユーザーリスト表示
 */
async function init() {
  // ローディングマスク解除
  $("#loadingMask").hide()
  // ページオブジェクトを設定
  user_profile.pageScope = this
  app.setCurrentPage(user_profile, appVue.views.user.profile)
  header.init(user_profile);
  footer.init(user_profile);
  bottomNavi.init(user_profile);	// ボトムナビゲーション初期化
  this.login_user_chat = localStorage.getItem('chat');
  this.login_user_id = localStorage.getItem('id');
  if (app.shared.post && app.shared.post.back_to_index_flag) this.back_to_index_flag = app.shared.post.back_to_index_flag
  if (app.shared.post && app.shared.post.back_to_detail_flag) this.back_to_detail_flag = app.shared.post.back_to_detail_flag
  this.user = await app.get_user(app.shared.common.target_id)
  this.is_block = this.user.block ? true : false;
  this.is_others = (this.login_user_id != this.user.id) ? true : false;
  this.get_evaluation()
  this.get_sellList()
  this.get_tweets()
  this.get_experience()
  this.get_favorites();
  this.check_follow()
}

function nextPage(to, id = null) {
  if (to == 'user_message') return app.nextPage(user_profile, appVue.views.user.message)
  if (to == 'tweet_list') {
    app.shared.post_user_id = id
    return app.nextPage(user_profile, appVue.views.post.index)
  }
  if (to == this.tweet_details_view) app.shared.post = { tweet_id: id }
  if (to == this.tweet_comment_view) app.shared.post = { tweet_id : id, comment_flag : 0 }
  app.nextPage(user_profile, to)
}

function get_prefecture_name(id) {
  return app.get_prefecture_name(id)
}

function birthday_to_age(birthday) {
  return app.birthday_to_age(birthday)
}

function get_condition(user_profile) {
  return app.get_condition(user_profile)
}

function get_avator_url(image_id, admin_flg) {
  return app.get_avator_url(image_id, admin_flg)
}

async function toggleFollow() {
  let data = {
    user_id: localStorage.getItem('id'),
    follow_id: this.user.id,
    type: 2,
    value: 0, // value == 0 ならフォローする
  }

  if (this.is_following) data.value = -1;

  try {
    let res = await app.api.call(
      appConst.apiUrl.users.setFavorite.method,
      appConst.apiUrl.users.setFavorite.url + "/" + data.user_id,
      data
    )
      this.is_following = !this.is_following
  } catch (err) {
    throw err
  }
}

function toUserIndex(page) {
  app.nextPage(user_profile, appVue.views.user.index)
}

async function get_evaluation() {
  try {
    let res = await app.api.call(
      appConst.apiUrl.users.evaluation.method,
      appConst.apiUrl.users.evaluation.url + "/" + this.user.id
    )
    this.evaluation = res.data
  } catch (err) {
    throw err
  }
}

async function get_sellList() {
  let data = {
    user_id: this.user.id,
    statusfrom: 2,
    open_flg: 1,
    // per_page: 4,
    // page: 1,
    order_by_raw: 'products.id desc'
  }

  try {
    let res = await app.api.call(
      appConst.apiUrl.products.index.method,
      appConst.apiUrl.products.index.url,
      data
      )
      this.sellList = res.data.data
    } catch (err) {
      throw err
    }
  }

async function get_tweets() {
  let data = {
    user_id: this.user.id,
    tweet_flg: 1,
    login_user_id: localStorage.getItem('id'),
    per_page: this.is_get_tweets_more ? -1 : 1,
  }
  try {
    let res = await app.api.call(
      appConst.apiUrl.users.tweet.method,
      appConst.apiUrl.users.tweet.url,
      data
      )
      this.tweets = this.is_get_tweets_more ? res.data : res.data.data
  } catch (err) {
    throw err
  }
}

async function get_experience() {

  let data = {
    user_id: this.user.id,
    exp_flg: 2,
    page: this.is_get_experience_more ? ++this.exp_page : this.exp_page,
    per_page: 3,//this.is_get_experience_more ? 1 : 3,
    parent_id: 0
  }
  
  try {
    let res = await app.api.call(
      appConst.apiUrl.users.getExperience.method,
      appConst.apiUrl.users.getExperience.url,
      data
      )
    if(this.is_get_experience_more){
      this.experience_list.data = this.experience_list.data.concat(res.data.data)
    }else{
      this.experience_list = res.data
    }
  } catch (err) {
    throw err
  }
}

async function check_follow() {
  let data = {
    id: localStorage.getItem('id'),
    follow_id: this.user.id,
    type: 2,
  }

  try {
    let res = await app.api.call(
      appConst.apiUrl.users.getUserFavorite.method,
      appConst.apiUrl.users.getUserFavorite.url,
      data
    )
    this.is_following = res.data
  } catch (err) {
    throw err
  }
}

async function get_favorites() {
  try {
    let res = await app.api.call(
      appConst.apiUrl.users.getFavorite.method,
      appConst.apiUrl.users.getFavorite.url + "/" + this.user.id
    )
    this.favorites = res.data
    this.tweet_sum = res.data.tweetSum
  } catch (err) {
    throw err
  }
}

async function put_tweet(tweet_id, check_num = 1) {
	await app.put_tweet(tweet_id, check_num)
	this.get_tweets()

}

function get_matching_taste_css(taste_value) {
  return  appConst.selectors.taste.filter(taste => taste.value == taste_value)[0].css
}

function get_matching_taste_text(taste_value) {
  return  appConst.selectors.taste.filter(taste => taste.value == taste_value)[0].text
}

function is_sold_out(product_status) {
  return !(product_status == 2) ? '' : 'purpleBg'
}

function get_sold_out_text(product_status) {
  return !(product_status == 2) ? 'SOLD OUT' : ''
}

function show_more_sellList() {
  this.is_show_more_sellList = !this.is_show_more_sellList
}

async function setBlock(){

  let data = {
    user_id: localStorage.getItem('id'),
    to_user_id: this.user.id,
    flag: 1, //1はブロックON
  }

  if (this.is_block) data.flag = 0;

  try {
    let res = await app.api.call(
      appConst.apiUrl.users.setBlock.method,
      appConst.apiUrl.users.setBlock.url,
      data
    )
      this.is_block = !this.is_block
  } catch (err) {
    throw err
  }

};