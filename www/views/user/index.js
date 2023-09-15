// 画面定義 -------------------------
var user_index = {};

// Vue定義 -------------------------
appVue.views.user.index = {
  key     : "user/index",
  template: "#user_index",
  data    : () => {
    return {
      // page : appConst.page.user.index,
      // view : { title: appConst.page.user.index.title },
      title         : appConst.page.user.index.title,
      users         : [],
      loaded_page   : 0,
      last_page     : null,
      modalVisible  : false,
      is_exec_search: false,
      dataset       : {
        residences    : appConst.selectors.residences,
        age           : appConst.selectors.age,
        current_status: appConst.selectors.current_status,
        sex           : appConst.selectors.sex,
        taste         : appConst.selectors.taste,
        interest      : appConst.selectors.interest,
        child_interest: appConst.selectors.child_interest,
        experience    : appConst.selectors.experience,
      },
      query         : {
        nickname           : null,
        prefecture_id      : null,
        mother_age         : null,
        condition          : null,
        'child-age-from'   : null,
        'child-age-to'     : null,
        'child-gender'     : null,
        taste              : [],
        mother_interest    : null,
        child_interest     : null,
        experience         : null,
        birthday_from      : null,
        birthday_to        : null,
        child_birthday_from: null,
        child_birthday_to  : null,
        favorite_id        : localStorage.getItem('id'),
        non_id             : localStorage.getItem('id'),
        order_by_raw       : 'favorite desc, id desc ',
      }
    };
  },
  methods: {
    init               : init,
    nextPage           : nextPage,
    scrolledToBottom   : scrolledToBottom,
    add_items_more     : add_items_more,
    showModal          : showModal,
    search             : search,
    add_birthday_query : add_birthday_query,
    get_prefecture_name: get_prefecture_name,
    birthday_to_age: birthday_to_age,
    get_condition: get_condition,
    get_avator_url: get_avator_url,
  },
};

// 処理 -------------------------
/**
 * 初期化 / ユーザーリスト表示
 */
function init() {
  // ローディングマスク解除
  $("#loadingMask").hide()
  // ページオブジェクトを設定
  user_index.pageScope = this
  app.setCurrentPage(user_index, appVue.views.user.index)
  header.init(user_index);
  footer.init(user_index);
  bottomNavi.init(user_index);	// ボトムナビゲーション初期化
  this.add_items_more()
}

function nextPage(user_id) {
  app.shared.common.target_id = user_id
  app.shared.post = { back_button_flag : false }
  app.nextPage(user_index, appVue.views.user.profile)
}

function scrolledToBottom() {
  if (this.loaded_page < this.last_page) this.add_items_more()
  // Infinite-scroll再発火させるための処置
  document.getElementById("-user-index-")._loadingContent = false
}

async function add_items_more() {
  let data = this.query

  if (this.is_exec_search) {
    this.loaded_page    = 0
    this.users          = []
    this.is_exec_search = false
  }

  let pagenation_query = {
    page    : ++this.loaded_page,
    status  : 1,
    per_page: 10,
  }
  Object.assign(data, pagenation_query)

  try {
    let res = await app.api.call(
      appConst.apiUrl.users.index.method,
      appConst.apiUrl.users.index.url,
      data
    );

    this.users = this.users.concat(res.data.data)
    if(this.loaded_page == 1) this.last_page = res.data.last_page
  } catch (err) {
    throw err
  }
}

function showModal() {
  this.modalVisible = true;
}

async function search() {
  this.is_exec_search = true
  this.add_birthday_query()
  this.add_items_more()
  this.modalVisible = false
}

function add_birthday_query() {
  if (this.query.mother_age) {
    this.query.birthday_from = app.ageToBirthday(this.query.mother_age, true, true)
    this.query.birthday_to   = app.ageToBirthday(this.query.mother_age, false, true)
  }

  if (this.query['child-age-from']) {
    this.query.child_birthday_from = app.ageToBirthday(
      this.query['child-age-from'], true, false)
  }
  if (this.query['child-age-to']) {
    this.query.child_birthday_to = app.ageToBirthday(
      this.query['child-age-to'],   false, false)
  }

  // 値がないならリセット
  if (!this.query.mother_age) {
    this.query.birthday_from = null
    this.query.birthday_to   = null
  }
  if (!this.query['child-age-from']) this.query.child_birthday_from = null
  if (!this.query['child-age-to'])   this.query.child_birthday_to   = null
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