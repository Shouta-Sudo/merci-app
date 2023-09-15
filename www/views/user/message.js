// 画面定義 -------------------------
var user_message = {};

// Vue定義 -------------------------
appVue.views.user.message = {
  key     : "user/message",
  template: "#user_message",
  data    : () => {
    return {
      // page : appConst.page.user.index,
      // view : { title: appConst.page.user.index.title },
      title: appConst.page.user.message.title,
      user: app.shared.common.user,
      messages: [],
      form_message: null,
      login_id: localStorage.getItem('id'),
      form_image: null,
      user_id: -1,
    }
  },
  methods: {
    init: init,
    get_messages: get_messages,
    send_message: send_message,
    get_avator_url: get_avator_url,
    select_image: select_image,
    moveToPrev: function () {app.prevPage(user_message)},
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
  user_message.pageScope = this
  app.setCurrentPage(user_message, appVue.views.user.message)
  header.init(user_message);
  footer.init(user_message);
  bottomNavi.init(user_message);	// ボトムナビゲーション初期化
  this.get_messages()
  this.user_id = parseInt(localStorage.getItem('id'))
}

async function get_messages() {
  const from_id = localStorage.getItem('id')
  let data = {
    user_from_1 : from_id,
    user_to_1   : this.user.id,
    user_from_2 : this.user.id,
    user_to_2   : from_id,
    open_flg    : 1,
    update_flg  : 1,
    order_by_raw: "created_at asc"
  }

  try {
    let res = await app.api.call(
      appConst.apiUrl.users.getMessage.method,
      appConst.apiUrl.users.getMessage.url,
      data
    )

    this.messages = res.data.data.map((message) => {
      // 添付画像データを整形
      if (message && message.images) {
        message.image_url = message.images.url
      }

      // 発信者が自分かどうか
      if (message.user_from_id === this.user_id) {
        message.from_me = true
      }

      return message
    })

    // 最新メッセージが見えるよう、自動でスクロール
    setTimeout(() => {
      let box = this.$refs.chatMessageArea
      if (box) {
        box.scrollTop = box.scrollHeight
      }
    }, 1000)
  } catch (err) {
    throw err
  }
}

async function send_message() {
  const from_id = parseInt(localStorage.getItem('id'))
  const to_full_name =
    this.user.user_detail.last_name +
    this.user.user_detail.first_name

  let data = {
    user_from_id : from_id,
    user_to_id   : this.user.id,
    from_nickname: localStorage.getItem('nickname'),
    to_name      : to_full_name,
    to_email     : this.user.email,
    open_flg     : 1,
    message      : this.form_message
  }

  if (this.form_image) {  // 画像データが付与されている場合
    data.up_file = this.form_image
  }

  try {
    let res = await app.api.call(
      appConst.apiUrl.users.sendMessage.method,
      appConst.apiUrl.users.sendMessage.url,
      data
      )
    if (res.success) {
      this.get_messages()
      this.form_message = null
    }
        } catch (err) {
      throw err
    }
}

function get_avator_url(image_id, admin_flg) {
  return app.get_avator_url(image_id, admin_flg)
}

function select_image() {
  // callback処理を含むので、他と形式をそろえるためにPromise定義。
  return new Promise((resolve, reject) => {
    function onErr(err) {
      console.error(err)
      reject(err)
    }
    try {
      this.form_image = null
      app.selectPicture('image', (dataUrl) => {
        try {
          console.log('select_image', dataUrl.substr(0, 30) + '...')
          this.form_image = dataUrl
          resolve()
        } catch (err) {
          onErr(err)
        }
      })
    } catch (err) {
      onErr(err)
    }
  })
}
