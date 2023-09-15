/*** アプリ共通処理 ****/

//ダミー関数
app.doNothing = function() {
};

/**
 * ajax呼出し結果がerrorの場合の処理
 * statusが入力エラーであれば現在の画面にエラーメッセージを設定する
 * それ以外であれば戻り値に含まれるmessageをダイアログで表示
 *
 * @param {object} response ajaxの戻り値
 */
app.showError = function(response){
	// 表示中の入力エラーメッセージをクリア
	app.clearErrorMessage();
	if (response.status == appConst.apiStatus.inputError){
		// 入力エラーメッセージの表示
		let response_message =  "";
		Object.keys(response.data.data).forEach(
			function(key){
				app.currentPage.pageScope.$set(app.currentPage.pageScope.error, key, response.data.data[key].join(','))
				response_message = response_message + app.currentPage.pageScope.error[key] + '<br>';
			}
		);
		app.showDialogMessage(response_message);
		return;
	} else if (response.status == appConst.apiStatus.noAuth){
		app.clearLoginInfo();
		response.message = '未ログイン状態です';
		app.jumpPage(app.currentPage, appVue.views.user.login);
	} else if (response.status == appConst.apiStatus.loginError) {
		app.clearLoginInfo();
		response.message = 'ログインに失敗しました。Emailかパスワードが間違っています。';
	} else if ('data' in response && 'message' in response.data) {
		response = response.data;
	}
	app.showDialogMessage(response.message);
};

/**
 * カレントページに設定されて入力エラーメッセージをクリア
 */
app.clearErrorMessage = function(){
	if (app.currentPage.pageScope.error){
		// カレンとページのerrorプロパティを全削除
		Object.keys(app.currentPage.pageScope.error).forEach(key => {
			app.currentPage.pageScope.$delete(app.currentPage.pageScope.error, key);
		})
	}
}


/**
 * API実行
 *
 * @param url 呼び出すapi 先頭の'/'は不要
 * @param method POST, GET, PUT等
 * @param data 引数。jsonオブジェクト形式{item1: 値, item2: 値, item3:{item31: 値, item32:値}}
 * @param onSuccess 成功時のコールバック関数 未指定の場合は何もしない
 * @param onError 失敗時のコールバック関数　未指定の場合はエラーダイアログを表示
 * @param mask api実行時の処理中ダイアログの有無(true/false)　デフォルト：有
 */
app.doApi = function(url, method, data, onSuccess = null, onError = null, mask = true){
	try{
		if (mask){
			$('#loadingMask').show();
		}
		if(!onSuccess){
			onSuccess = app.doNothing;
		}
		if(!onError){
			onError = app.showError;
		}
		//API成功時の処理
		var onOK = function(res){
			try{
				app.clearErrorMessage();
				if(res.err){	//エラーあり
					debugLog('app.doApi: error', res);
					if(!res.loginInfo){	//ログインエラー
						app.login();
					}else{	//その他エラー
						onError(res.responseText.message);
					}
				}else{	//エラーなし
					debugLog('app.doApi: success', res);
					onSuccess(res);
				}
			} catch(err) {
				alert('app.doApi:onOK' + '\n' + err.message);
			}finally{
				if (mask){
					$('#loadingMask').hide();
				}
			}
		};
		//APIエラー時の処理
		var onNG = function(req){
			console.log('onNG');
			debugLog('app.doApi: ng', req);
			debugLog('app.doApi: ng2', req.responseText);
			try{
				if (req.responseText){
					response = JSON.parse(req.responseText);
					onError(response);
				}else{
					alert('ajax error = ' + JSON.stringify(req));
				}
			} catch(err) {
				alert('app.doApi:onNG' + '\n' + err.message);
			}finally{
				$('#loadingMask').hide();
			}
		};

		// auth用トークンがあればヘッダーに設定
		if (localStorage.getItem('token_data')) {
			token_data = JSON.parse(localStorage.getItem('token_data'))
			api_headers.Authorization = 'Bearer '+token_data.access_token;
		}else if (api_headers.Authorization){
			// auth用トークンがなければ削除
			delete api_headers.Authorization;
		}

		let param = {
			url: app.baseUrl + url,
			type: method,
			headers: api_headers,
			success: onOK,
			error: onNG,
		}
		debugLog('data', data);
		if (data){
			if (method == 'POST' || method == 'PUT'){
				param.data = JSON.stringify(data);
			}else{
				param.data = data;
			}
		}

		debugLog('app.doApi: param', param);
		// alert('param = ' + JSON.stringify(param));
		//API実行
		$.ajax(param);

	} catch(err) {
		$('#loadingMask').hide();
		alert('[Err]app.doApi' + '\n' + err.message);
	}finally{

	}
};

/**
 * axiosによるAPI実行
 * データはFormDataで指定
 * ファイルのアップロードを行う場合はこちらを利用
 * ファイルのアップロードの場合、methodはPOSTのみ有効
 *
 * @param url 呼び出すapi 先頭の'/'は不要
 * @param method POST, GET, PUT等
 * @param data formData 引数
 * @param onSuccess 成功時のコールバック関数 未指定の場合は何もしない
 * @param onError 失敗時のコールバック関数　未指定の場合はエラーダイアログを表示
 * @param mask api実行時の処理中ダイアログの有無(true/false)　デフォルト：有
 */
 app.callApi = function(url, method, data, files = null, onSuccess = null, onError = null, mask = true){
	try{
		if (mask){
			$('#loadingMask').show();
		}
		if(!onSuccess){
			onSuccess = app.doNothing;
		}
		if(!onError){
			onError = app.showError;
		}
		//API成功時の処理
		var onOK = function(res){
			try{
				app.clearErrorMessage();
				if(res.err){	//エラーあり
					debugLog('app.doApi: error', res);
					if(!res.loginInfo){	//ログインエラー
						app.login();
					}else{	//その他エラー
						onError(res.responseText.message);
					}
				}else{	//エラーなし
					debugLog('app.doApi: success', res);
					onSuccess(res);
				}
			} catch(err) {
				alert('app.doApi:onOK' + '\n' + err.message);
			}finally{
				if (mask){
					$('#loadingMask').hide();
				}
			}
		};
		//APIエラー時の処理
		var onNG = function(req){
			debugLog('app.doApi: ng', req);
			debugLog('app.doApi: ng2', req.responseText);
			try{
				if (req.responseText){
					response = JSON.parse(req.responseText);
					onError(response);
				}else{
					alert('ajax error = ' + JSON.stringify(req));
				}
			} catch(err) {
				alert('app.doApi:onNG' + '\n' + err.message);
			}finally{
				$('#loadingMask').hide();
			}
		};

		// auth用トークンがあればヘッダーに設定
		if (localStorage.getItem('token_data')) {
			token_data = JSON.parse(localStorage.getItem('token_data'))
			api_headers.Authorization = 'Bearer '+token_data.access_token;
		}else if (api_headers.Authorization){
			// auth用トークンがなければ削除
			delete api_headers.Authorization;
		}

		let param = {
			url: app.baseUrl + url,
			type: method,
			headers: api_headers,
			success: onOK,
			error: onNG,
		}
		debugLog('data', data);
		debugLog('fd', fd);
		if (data){
			if (method == 'POST' || method == 'PUT'){
				param.data = JSON.stringify(data);
			}else{
				param.data = data;
			}
		}

		axios
		.post(app.baseUrl + appConst.apiUrl.users.update.url+localStorage.getItem('id'), fd, config)
		.then(function(response) {
			debugLog(response);
			alert('ok')
		})
		.catch(function(error) {
			debugLog(error);
			alert('error');
		});



		debugLog('app.doApi: param', param);
		// alert('param = ' + JSON.stringify(param));
		//API実行
		$.ajax(param);

	} catch(err) {
		$('#loadingMask').hide();
		alert('[Err]app.doApi' + '\n' + err.message);
	}finally{

	}
};


// テンプレート読み込み
app.readTemplate = function(tmplList, callBack) {
	var execCount = 0;
	try{
		for(var tmpl in tmplList) {
			$.ajax({
				url: 'views/' + tmplList[tmpl] + '.tmpl',
				type: 'GET',
				success: function (responce) {
					$('body').append(responce);
					execCount++;
					if (execCount === tmplList.length) {
						if (callBack) {
							callBack();
						}
					}
				}
			});
		}
	} catch(err) {
		alert('[Err]app.readTemplate' + '\n' + err.message);
	} finally {
		execCount = null;
	}
};

/**
 * 配列形式の選択肢(keyがID,valueが表示用ラベル)一覧を
 * 表示用に変換する
 * @param {array} from
 * @param {string} suffix テキストの末尾に付加するテキスト
 */
app.toSelector = function(from, model = null){
	let to = [];
	Object.keys(from).forEach(key => {
		let id = key && isFinite(key) ? Number(key) : key;
		let elem = {id: id, text: from[key]};
		if (model){
			elem.model = model;
		}
		to.push(elem);
	});
	return to;
};

app.checkFileSuffix = function(imageName){

}

/**
 * JSON形式のデータであればtrue、それ以外はfalseを返す
 * @param value 任意のデータ
 */
app.isJson = function (value) {
	try {
		JSON.parse(value)
	} catch (e) {
		debugLog('isJson',e)
		return false
	}
	return true
}

/**
 *
 * @param {Object} current
 * @param {string} method
 * @param {連想配列} to
 */
// app.transitionTo = function(current, method, to){
// 	debugLog('transitionTo', to)
// 	console.log(method);
// 	let currentPage = JSON.stringify(to.key.split('/'));
// 	localStorage.setItem('current_page', currentPage);

// 	current.pageScope.$emit(method, to);

// }

/**
 * 表示中のページ情報を設定
 * @param {*} page カレントページ
 * @param {*} viewInfo appVue.viewsに設定する情報
 */
app.setCurrentPage = function(page, viewInfo){
	app.currentPage = page;
	app.currentView = viewInfo;
	// 各画面の初期化処理の際、通知データをチェック
	app.notice.checkNotice();
}

/**
 * 以下の形式のselectorから
 *   [{id:..., text: ...}, {id:..., text: ...}. ....]
 * id と一致するidを持つ項目を返す
 * @param {array} selector
 * @param {string} id
 * @returns array
 */
app.matchedOption = function(selector, id){
	return selector.find((option) => {
		return (option.id == id);
	});
}

/**
 * 有料会員か否か
 * @param {int} user_level
 * @param {boolean} 有料会員：true, 無料会員：false
 */
app.isPaid = function (user_level) {
	if (!user_level || user_level == appConst.userLevel.male_free || user_level == appConst.userLevel.female_free){
		return false;
	}
	return true;
}

/**
 * 年月日時分秒を含む文字列を年/月/日 時:分形式に変換
 * @param {string} dateStr
 */
app.formatYYYYMMDDhhmm = function(dateStr){
	let date = new Date(dateStr);

	return date.getFullYear()
		+ '/' + ('0' + (date.getMonth() + 1)).slice(-2)
		+ '/' + ('0' + date.getDate()).slice(-2)
		+ ' ' + ('0' + date.getHours()).slice(-2)
		+ ':' + ('0' + date.getMinutes()).slice(-2);
}

/**
 * 年月日時分秒を含む文字列を-月-日 -:-形式に変換
 * @param {string} dateStr
 */
 app.formatMMDDhhmm = function(dateStr){
	//日付と時刻で分ける
	var date = new Date(dateStr.replace(' ', 'T'));

	date_time = ('0' + (date.getMonth() + 1)).slice(-2)
		+ '月' + ('0' + date.getDate()).slice(-2)
		+ '日' + ('0' + date.getHours()).slice(-2)
		+ ':' + ('0' + date.getMinutes()).slice(-2);

	return date_time;
}

/**
 * 数値チェック関数
 * 入力値が数値 (0以上の整数のみ) であることをチェックする
 * [返却値] true:  数値
 *          false: 数値以外
 */
app.validateNumber = function(value){
	var condition = /^([1-9]\d*|0)$/;
	return condition.test(value);
}

// Emailバリデーション
app.validateEmail = (value) => {
	//const emailRegex = /^\w+([.+]?\w+)?@\w+([.]?\w+)*(.\w{2,})+$/
	const emailRegex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
	if (emailRegex.test(value)) return true
	return false
}

// パスワード(英数字８文字以上)バリデーション
app.validatePassword = (value) => {
	return value ? true : false
}

app.convertMessage = function(message){
	let msgs = message.split(/">|<\/a>/);
	if (msgs.length > 1){
		let newmsg = '';
		for (let index = 0; index < msgs.length; index += 2) {
			if (msgs[index]) {
				newmsg += msgs[index];
			}
			if (msgs[index + 1]) {
				newmsg += '" onclick="app.callInAppBrowser(\'' + msgs[index + 1] + '\')">' + msgs[index + 1] + '</a>';
			}
		}
		message = newmsg;
	}
	return message;
}

/**
 *	年齢の数値を誕生日（例：2000-01-01）に変換する
 * 	※子の場合は mdが逆になる。
 * */

app.ageToBirthday = function (age, is_from = true, is_mother = false) {
	const current_year         = new Date().getFullYear()
	const from_range           = (is_mother && is_from) ? 5 : 0
	if    (!is_mother) is_from = !is_from
	const md                   = is_from ? '-01-01' : '-12-31'
	return current_year - age - from_range + md
}

/**
 * 誕生日を年齢に変換する。
 */
app.getBirthdayToAge = function (birthday) {
	var today = new Date();
	var birthDate = new Date(birthday);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
	}
	return age
}

/**
 *	appConst.selectors.*のオブジェクト配列から、valueが一致するtext値を取得する
 * 	オブジェクト例：　{ text: '北海道', value: 1 }
 * */
app.findTextByMatchingValue = function (objects, value) {
	return objects.filter(function (entry) {
			if (entry.value == value) return entry
	})[0].text;
}

/**
 * 都道府県IDを都道府県名に変換する
 */
app.get_prefecture_name = function (id) {
  return app.findTextByMatchingValue(appConst.selectors.residences, id)
}

/**
 * 誕生日から年代に変換する
 */
app.birthday_to_age = function (birthday) {
  var age = app.getBirthdayToAge(birthday)
  if (age < 20) return '10代'
  if (age > 50) return '50代'
  return age % 10 < 5 ? + (age / 10 | 0) + '0代前半' : (age / 10 | 0) + '0代後半'
}

/**
 * ユーザーの育児ステータス文を取得する
 */
app.get_condition = function (user_profile) {
  const {
    condition,
    child_gender1,
    child_gender2,
    child_gender3,
    child_gender4,
    child_gender5,
    child_birthday1,
    child_birthday2,
    child_birthday3,
    child_birthday4,
    child_birthday5,
  } = user_profile

  let result          = ''

  if (condition < 3)                    result += app.findTextByMatchingValue(appConst.selectors.current_status, condition)
  if (condition == 3 && !child_gender1) result += app.findTextByMatchingValue(appConst.selectors.current_status, condition)
  if (condition == 3 && child_gender1) { // 育児中で子供のデータがあれば
    let child_genders = []
    let child_count   = 0
    let is_son        = false
    let is_daughter   = false
    let only_child_gender = null
    let child_age = app.getBirthdayToAge(child_birthday1)

    child_genders = [child_gender1, child_gender2, child_gender3, child_gender4, child_gender5].filter(Number)
    child_count = child_genders.length
    is_son      = child_genders.filter(entry => entry == 1).length ? true : false
    is_daughter = child_genders.filter(entry => entry == 2).length ? true : false

    if (child_count == 1) {
      only_child_gender = (child_gender1 == 1) ? '男の子' : '女の子'
      result += child_age + '才の' + only_child_gender + 'のママ'
    }

    if (child_count > 1) {
      if (is_son) result += '男の子 '
      if (is_daughter) result += '女の子 '
      result += child_count + '人のママ'
    }

  }

  return result
}

/**
 * image_idからアバター画像のパスを取得する
 */
app.get_avator_url = function (image_id, admin_flg) {
	if(admin_flg == 1){
		return web_url + `img/mypage/thumb_avatar_mercimaman.png`
	}
	return web_url + `img/mypage/thumb_avatar_${image_id}.png`
}

//イベントカレンダーの画像
app.get_event_url = function (month) {
	  return web_url + `img/event/${month}month.png`
}

//TOP コンテンツのひよこの画像
app.get_top_contents_url = function () {
	  return web_url + `/img/sample/item_03.png`
}


app.formatYYYYMMDD = function(dateStr){

	if(!dateStr) {
		return '';
	}

	let date = new Date(dateStr.replace(" ", "T"));

	return date.getFullYear()
		+ '-' + ('0' + (date.getMonth() + 1)).slice(-2)
		+ '-' + ('0' + date.getDate()).slice(-2);
}

app.get_user = async function(user_id) {
  try {
    let res = await app.api.call(
      appConst.apiUrl.users.index.method,
      appConst.apiUrl.users.index.url + "/" + user_id,
    );
    return app.shared.common.user = res.data
  } catch (error) {
    throw error
  }
}

app.put_tweet = async function(tweet_id, check_num = 1) {
	const attr_name = "check" + check_num.toString()
	let data = {
		[attr_name]: check_num
	}

	try {
    let res = await app.api.call(
      appConst.apiUrl.users.update_tweet.method,
      appConst.apiUrl.users.update_tweet.url + "/" + tweet_id,
      data
		)
		return res.success ? true : false
  } catch (err) {
    throw err
  }

}
