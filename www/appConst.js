var appConst = {};

//生年月日　月生成
const month = [];
for(i=1; i<=12; i++){
	month[i] = i;
}

//生年月日　日生成
const day = [];
for(i=1; i<=31; i++){
	day[i] = i;
}

//生年月日　年生成
end_year = new Date().getFullYear()-20;
start_year = end_year - 50;
const year = [];
for(i=start_year; i<=end_year; i++){
	year[i] = i;
}

/**
 * アイコン定義
 */
appConst.icon = {

	/** 次ページ遷移用アイコン */
	nextPage: 'chevron-right',

	/** 前ページ遷移用アイコン */
	prevPage: 'chevron-left',

	/** 確認用アイコン */
	confirm: 'fa-check',

	/** 選択肢一覧表示用アイコン */
	listOpen: 'plus',

	/** 選択肢一覧非表示用アイコン */
	listClose: 'minus',

	/** 画面クローズ用アイコン */
	windowClose: 'remove',

    /** 削除用アイコン */
    delete: 'remove',
};

// ページ情報
appConst.pageCommon = {
	user: {
		nickname: { label: 'ニックネーム', placeholder: 'ニックネームを入力' },
		gender: { label: '性別', placeholder: '性別を入力' },
		marriage: { label: '結婚経験', placeholder: '結婚経験を入力' },
		marryWish: { label: '結婚に対する意思', placeholder: '結婚に対する意思を入力' },
		job: { label: '仕事', placeholder: '仕事を入力' },
		holiday: { label: '休み', placeholder: '休みを入力' },
		salary: { label: '年収', placeholder: '年収を入力' },
		birth: { label: '生年月日', placeholder: '生年月日を選択' },
		country: { label: 'お住まい', placeholder: '選択' },
		address: { label: 'お住まい', placeholder: 'お住まいを選択' },
		school: { label: '最終学歴', placeholder: '最終学歴を選択' },
		school_name: { label: '学校名', placeholder: '（任意）学校名を入力' },
		height: { label: '身長', placeholder: '身長を選択' },
		bodyType: { label: '体型', placeholder: '体型を入力' },
		tabacco: { label: 'タバコ', placeholder: '選択' },
		houseMate: { label: '同居人', placeholder: '同居人を選択' },
		profile: { label: '自己紹介文', placeholder: '自己紹介文を入力' },
		email: { label: 'メールアドレス', placeholder: 'メールアドレスを入力' },
		inviteCode: { label: '招待コード', placeholder: '招待コードを入力' },
	},
	profile: {
		age: {label: '年齢', placeholder: '年齢を選択してください'},
		address: {label: '居住地', placeholder: '居住地を選択してください'},
		birthCountry: {label: '出身地', placeholder: '出身地を選択してください'},
		lang: {label: '話せる言語', placeholder: '話せる言語を選択してください'},
		personal: {label: '性格・タイプ', placeholder: '性格・タイプを選択してください'},
		social: {label: '社交性', placeholder: '社交性を選択してください'},
		tabacco: {label: 'タバコ', placeholder: 'タバコを選択してください'},
		sake: {label: 'お酒', placeholder: 'お酒を選択してください'},
		marriage_wish: {label: '結婚に対する意思', placeholder: '結婚に対する意思を選択してください'},
		child_wish: {label: '子供が欲しいか', placeholder: '子供が欲しいかを選択してください'},
		house_work: {label: '家事・育児', placeholder: '家事・育児を選択してください'},
		marriage: {label: '結婚歴', placeholder: '結婚歴を選択してください'},
		child: {label: '子供の有無', placeholder: '子供の有無を選択してください'},
		meet_wish: {label: '出会うまでの希望', placeholder: '出会うまでの希望を選択してください'},
		date: {label: '初回デート費用', placeholder: '初回デート費用を選択してください'},
		school: { label: '学歴', placeholder: '学歴を選択' },
		profile: { label: '自己紹介文あり', placeholder: '自己紹介文ありを選択' },
		sub_image: { label: 'サブ画像あり', placeholder: 'サブ画像ありを選択' },
		login: { label: '最終ログイン', placeholder: '最終ログインを選択' },
		regist: { label: '登録日が1週間以内', placeholder: '登録日が1週間以内を選択' },
		community: { label: '共通のコミュニティ', placeholder: '共通のコミュニティを選択' },
		blood_type: { label: '血液型', placeholder: '血液型を選択' },
		brother: { label: '兄弟姉妹', placeholder: '兄弟姉妹を選択' },
		school_name: { label: '学校名', placeholder: '学校名を入力' },
		work_name: { label: '職業名', placeholder: '職業名を入力' },
		hobby: { label: '好きな事・趣味', placeholder: '好きな事・趣味を選択' },
		sort: { label: '並び替え', placeholder: '並び替えを選択' },
		free_word: { label: 'フリーワード', placeholder: 'フリーワードを入力' },
        comment: { label: 'つぶやき', placeholder: 'つぶやきを入力' },
	},
}

// ページ情報
appConst.page = {
	user:{
		login: {
			title: 'ログイン',
		},
		reset_password: {
			title: 'パスワードを忘れたら',
		},
		index: {
			title: 'メルママメイト',
		},
		profile: {
			title: 'メルママメイト　プロフィール',
		},
		message: {
			title: 'メルママメッセージ',
		}
	},
	consultation:{
		consultation_list: {
			title: '症例相談 一覧',
		},
		consultation_photo: {
			title: '症例相談　写真登録',
		},
		consultation_detail: {
			title: '症例相談　詳細',
		},
		consultation_message: {
			title: '症例相談　メッセージ',
		},
	},
	post: {
        create: {
            title: 'ツイートする',
            fieldInfo: {
                tweet_contents: { placeholder: "今何してる？" },
            },
        },
		comment: {
            title1: 'つぶやきコメント',
			title2: '返信',
            fieldInfo: {
                comment_contents: { placeholder: "コメント投稿" },
				re_comment_contents: { placeholder: "返信" },
            },
        },
		index: {
            title: 'つぶやき一覧',
			no_tweet: 'ツイートがまだありません。',
        },
		details: {
            title: 'ツイート詳細',
        },
    },
	contact:{
	},
	site:{
	},
	top: {
		title: 'トップ',
	},
	login: {
	},
};

/** デフォルトの選択肢 */
appConst.selectors = {
	// 都道府県
	residences: [
		{ text: '都道府県', value: null },
		{ text: '北海道', value: '1' },
		{ text: '青森県', value: '2' },
		{ text: '岩手県', value: '3' },
		{ text: '宮城県', value: '4' },
		{ text: '秋田県', value: '5' },
		{ text: '山形県', value: '6' },
		{ text: '福島県', value: '7' },
		{ text: '茨城県', value: '8' },
		{ text: '栃木県', value: '9' },
		{ text: '群馬県', value: '10' },
		{ text: '埼玉県', value: '11' },
		{ text: '千葉県', value: '12' },
		{ text: '東京都', value: '13' },
		{ text: '神奈川県', value: '14' },
		{ text: '新潟県', value: '15' },
		{ text: '富山県', value: '16' },
		{ text: '石川県', value: '17' },
		{ text: '福井県', value: '18' },
		{ text: '山梨県', value: '19' },
		{ text: '長野県', value: '20' },
		{ text: '岐阜県', value: '21' },
		{ text: '静岡県', value: '22' },
		{ text: '愛知県', value: '23' },
		{ text: '三重県', value: '24' },
		{ text: '滋賀県', value: '25' },
		{ text: '京都府', value: '26' },
		{ text: '大阪府', value: '27' },
		{ text: '兵庫県', value: '28' },
		{ text: '奈良県', value: '29' },
		{ text: '和歌山県', value: '30' },
		{ text: '鳥取県', value: '31' },
		{ text: '島根県', value: '32' },
		{ text: '岡山県', value: '33' },
		{ text: '広島県', value: '34' },
		{ text: '山口県', value: '35' },
		{ text: '徳島県', value: '36' },
		{ text: '香川県', value: '37' },
		{ text: '愛媛県', value: '38' },
		{ text: '高知県', value: '39' },
		{ text: '福岡県', value: '40' },
		{ text: '佐賀県', value: '41' },
		{ text: '長崎県', value: '42' },
		{ text: '熊本県', value: '43' },
		{ text: '大分県', value: '44' },
		{ text: '宮崎県', value: '45' },
		{ text: '鹿児島県', value: '46' },
		{ text: '沖縄県', value: '47' },
		{ text: '海外', value: '48' },
	],

	// ママの年齢
	age: [
		{ text: '', value: null },
		{ text: '10代', value: '15' },
		{ text: '20代前半', value: '20' },
		{ text: '20代後半', value: '25' },
		{ text: '30代前半', value: '30' },
		{ text: '30代後半', value: '35' },
		{ text: '40代前半', value: '40' },
		{ text: '40代後半', value: '45' },
		{ text: '50代以降', value: '50' },
	],

	// 現在の状況
	current_status: [
		{ text: '', value: null },
		{ text: '妊活中', value: '1' },
		{ text: '出産予定', value: '2' },
		{ text: '育児中', value: '3' },
	],

	// お子さまの性別
	sex: [
		{ text: '', value: null },
		{ text: '男', value: '1' },
		{ text: '女', value: '2' },
	],

	taste: [
		{ text: 'クール', value: '1', css: 'skyblueBg' },
		{ text: 'ポップ', value: '2', css: 'yellowBg_2' },
		{ text: 'フェミニン', value: '3', css: 'orangeBg_2' },
		{ text: 'キュート', value: '4', css: 'pinkBg' },
		{ text: 'ナチュラル', value: '5', css: 'greenBg' },
		{ text: 'クラシック', value: '6', css: 'purpleBg' },
		{ text: 'シンプル', value: '7', css: 'blackBg' },
	],

	// ママの興味・関心
	interest: [
		{ text: '', value: null },
		{ text: 'モンテッソーリ教育', value: 'モンテッソーリ教育' },
		{ text: '麻酔分娩', value: '麻酔分娩' },
		{ text: '夜間断乳', value: '夜間断乳' },
		{ text: 'お受験', value: 'お受験' },
		{ text: '妊活', value: '妊活' },
		{ text: '保活', value: '保活' },
		{ text: '海外ベビー服', value: '海外ベビー服' },
		{ text: '里帰り出産', value: '里帰り出産' },
		{ text: 'マタニティフォト', value: 'マタニティフォト' },
		{ text: '離乳食', value: '離乳食' },
		{ text: '美容・コスメ', value: '美容・コスメ' },
		{ text: '子連れ旅行', value: '子連れ旅行' },
	],

	// 現在の状況
	child_interest: [
		{ text: '', value: null },
		{ text: '絵本', value: '絵本' },
		{ text: '乗り物', value: '乗り物' },
		{ text: '動物', value: '動物' },
		{ text: '昆虫', value: '昆虫' },
		{ text: '戦隊もの', value: '戦隊もの' },
		{ text: '歴史', value: '歴史' },
		{ text: 'スポーツ', value: '地理' },
		{ text: 'おままごと', value: 'おままごと' },
		{ text: '人形遊び', value: '語学' },
		{ text: '天体', value: '天体' },
	],

	// 現在の状況
	experience: [
		{ text: '', value: null },
		{ text: '乳児湿疹', value: '乳児湿疹' },
		{ text: '不妊治療', value: '麻酔分娩' },
		{ text: '保活', value: '保活' },
		{ text: '里帰り出産', value: '里帰り出産' },
		{ text: 'マタニティフォト', value: 'マタニティフォト' },
		{ text: 'お受験', value: 'お受験' },
		{ text: '帝王切開', value: '帝王切開' },
		{ text: 'モンテッソーリ教育', value: 'モンテッソーリ教育' },
		{ text: '英語教育', value: '英語教育' },
		{ text: 'ワンオペ育児', value: 'ワンオペ育児' },
		{ text: '子連れ旅行', value: '子連れ旅行' },
	],

	/** ON/OFF */
	onoff: [
		{id: "0", text: "OFF"},
		{id: "1", text: "ON"},
	],
	/** 最終ログイン */
	login: [
		{id: "1", text: "ログイン中"},
		{id: "2", text: "24時間以内"},
	],
	/** ソート条件 */
	sort: [
		{id: "1", text: "ログイン新しい順"},
		{id: "2", text: "いいね多い順"},
		{id: "3", text: "登録日が新しい順"},
		{id: "4", text: "もらったバラが多い順"},
	],

};

// メッセージ
appConst.message = {
	info: {
		i00001: 'データが存在しません',
		i00002: 'データの保存が完了しました'
	},
	error: {
		e00001: 'を入力してください'
	},
	warning: {
	}
};

/** apiのバージョン */
appConst.apiVersion = 'api/v1/';

/**
 * api url
 * 注：urlを記述する際、最後の'/'には注意。id等が付加される場合は必要だが、ない場合は付けてはいけない。
 * 　　'/'で終わる場合、iOSでは通信時にnetwork errorが発生する。androidは普通に動作する。
 */
appConst.apiUrl = {
	/** 認証API */
	auth: {
		/** アクセストークンの取得（パスポート認証） */
		token: {
			url: 'oauth/token',
			method: 'POST',
		},
		getMyData: {
			url: appConst.apiVersion + 'auth/getMyData',
			method: 'GET',
		},
		/** パスワードリセット */
		resetPassword: {
			url: appConst.apiVersion + 'auth/sendResetPasswordMail',
			method: 'PUT',
		},
	},
	/** ユーザー関連API */
	users: {
		getMyData: {
			url: appConst.apiVersion + 'users/getMyData',
			method: 'GET',
		},
		index: {
			url		:	appConst.apiVersion + 'users',
			method:	'GET',
		},
		evaluation: {
			url		:	appConst.apiVersion + 'orders/getEvaluation',
			method:	'GET',
		},
		tweet: {
			url		:	appConst.apiVersion + 'tweet',
			method:	'GET',
		},
		update_tweet: {
			url		:	appConst.apiVersion + 'tweet',
			method:	'PUT',
		},
		getUserFavorite: {
			url		:	appConst.apiVersion + 'user/getUserFavorite',
			method:	'GET',
		},
		getFavorite: {
			url		:	appConst.apiVersion + 'users/getFavorite',
			method:	'GET',
		},
		setFavorite: {
			url		:	appConst.apiVersion + 'users/setFavorite',
			method:	'POST',
		},
		getMessage: {
			url		:	appConst.apiVersion + 'message',
			method:	'GET',
		},
		sendMessage: {
			url		:	appConst.apiVersion + 'message',
			method:	'POST',
		},
		getExperience: {
			url		:	appConst.apiVersion + 'board/indexExp',
			method:	'GET',
		},
		/** ユーザーを登録する */
		store: {
			url: appConst.apiVersion + 'users/store',
			method: 'POST',
		},
		/** コンタクトリストの取得 */
		contactList: {
			url: appConst.apiVersion + 'users/contactList/',
			method: 'GET',
		},
		/** ユーザ情報の更新 */
		update: {
			url: appConst.apiVersion + 'users/',
			method: 'POST',
		},
		/** パスワード再設定用メール送信 */
		sendResetPassword: {
			url: appConst.apiVersion + 'users/sendResetPassword',
			method: 'PUT',
		},
		/** パスワード再設定用データ取得 */
		resetCheck: {
			url: appConst.apiVersion + 'users/resetCheck',
			method: 'GET',
		},
		/** イメージファイル削除 */
		deleteImage: {
			url: appConst.apiVersion + 'users/deleteImage',
			method: 'DELETE',
		},
		/** ブロックフラグの変更 */
		setBlock: {
			url		:	appConst.apiVersion + 'user/setBlock',
			method:	'POST',
		},
	},
	news: {
		show: {
			url: appConst.apiVersion + 'news',
			method: 'GET',
		},
		getUserNews: {
			url: appConst.apiVersion + 'news/getUserNews',
			method: 'GET',
		},
	},
	products: {
		index: {
			url: appConst.apiVersion + 'products',
			method: 'GET',
		}
	},
	advertisement: {
		index: {
			url: appConst.apiVersion + 'advertisement',
			method: 'GET',
		}
	},
	/** 共通API */
	common: {
		/** ユーザー設定値の取得（プロフィールプルダウン情報） */
		index: {
			url: appConst.apiVersion + 'commons/index',
			method: 'GET',
		},
	},
	/** ポイントAPI */
	point: {
		getPoint: {
			url: appConst.apiVersion + 'points/index/',
			method: 'GET',
		},
		getUserPointHistory: {
			url: appConst.apiVersion + 'points/getUserPointHistory',
			method: 'GET',
		}
	},
	/** お問合わせAPI */
    inquiry: {
        getInquiry: {
            url: appConst.apiVersion + "inquiry/",
            method: "GET",
        },
        postInquiry: {
            url: appConst.apiVersion + "inquiry",
            method: "POST",
        },
    },
    message: {
        /** メッセージ登録 */
        store: {
            url: appConst.apiVersion + "messages",
            method: "POST",
        },
        /** メッセージ一覧 */
        list: {
            url: appConst.apiVersion + "messages",
            method: "GET",
        },
        /** ユーザー一覧 */
        userList: {
            url: appConst.apiVersion + "messages/userList",
            method: "GET",
        },
		/** オーダー用メッセージ一覧取得 */
		list_order: {
            url: appConst.apiVersion + "messages/indexOrder/",
            method: "GET",
        },
		/** オーダー用メッセージ登録 */
        store: {
            url: appConst.apiVersion + "messages/storeOrder/",
            method: "POST",
        },
		/** 個別メッセージ一覧取得 */
		index_individual: {
            url: appConst.apiVersion + "messages/indexIndividual/",
            method: "GET",
        },
		/** 個別メッセージ登録 */
        store_individual: {
            url: appConst.apiVersion + "messages/storeIndividual/",
            method: "POST",
        },
    },
	/** 画像 */
	upFile: {
		// 画像ファイルの取得
        index: {
            url: appConst.apiVersion + "upfile/download/",
            method: "GETIMAGE",
        },
    },
	/** ツイート */
    post: {
		// ツイートの取得
        get: {
            url: appConst.apiVersion + "tweet",
            method: "GET",
        },
        // つぶやきの登録
        create: {
            url: appConst.apiVersion + "tweet",
            method: "POST",
        },
		// 指定アイコンに+1
        plus_one: {
            url: appConst.apiVersion + "tweet/",
            method: "PUT",
        },
		// コメントに対するインデックスツリーを取得
        index_tree: {
            url: appConst.apiVersion + "tweet/indexTree",
            method: "GET",
        },
    },
    //コンテンツ
    contents:{
    	index: {
            url: appConst.apiVersion + "contents",
            method: "GET",
        },
    },
	//イベント
	event:{
    	index: {
            url: appConst.apiVersion + "event/",
            method: "GET",
        },
    },
	//スライダー
	slide:{
    	index: {
            url: appConst.apiVersion + "topSlideData",
            method: "GET",
        },
    },


};

/** api呼び出し結果のステータス */
appConst.apiStatus = {
	/** 入力エラー */
	inputError: 422,
	/** 認証情報無 */
	noAuth: 401,
	// 必須パラメーター不足、パラメーター不一致
	loginError: 400,
};

/** ユーザーステータス */
appConst.userStatus = {
	/** 仮登録 */
	temp: 10,

	/** 本登録 */
	regist: 1,

	/** 仮承認 */
	pre: 2,

	/** 本承認 */
	approved: 3,

	/** 利用停止 */
	stop: 4,
};

appConst.cryptoKey = 'e8thge8h@09209otjyh]@py%edioew(aoj4/ti';