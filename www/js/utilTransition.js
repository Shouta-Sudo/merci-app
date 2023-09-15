/**
 * 画面遷移関連のユーティリティーメソッド群
 */

/**
 * 指定した画面に遷移する
 * 遷移元の画面は履歴に残り、prevPageで戻ることができる
 *
 * @param {array} from 遷移元 各画面のjsで宣言する画面名と同じ配列
 * @param {object} to 遷移先 appVue.views.xxx
 */
app.nextPage = function (from, to) {
	app._transition('push-page', from, to);
}

/**
 * 履歴にある遷移元の画面に遷移する。
 * app.nextPage()で遷移した場合にのみ戻ることができる
 *
 * @param {array} from 遷移元 各画面のjsで宣言する画面名と同じ配列
 */
 app.prevPage = function (from) {
	app._transition('pop-page', from);
}

/**
 * 表示中の画面を指定した画面に置き換える
 * 履歴の画面情報は置き換わる
 *
 * @param {array} from 遷移元 各画面のjsで宣言する画面名と同じ配列
 * @param {object} to 遷移先 appVue.views.xxx
 */
 app.replacePage = function (from, to) {
	app._transition('replace-page', from, to);

    let list = document.getElementById('navi').pages;
    if (list.length == 1){
        // 履歴のトップを置き換えた場合は、この画面をアプリ再起動時の表示画面とする
        app._setCurrentToStorage(to);
    }
}

/**
 * 指定した画面に遷移する
 * その際、履歴はすべてクリアする。
 * 従って、prevPage()で戻ることはできなくなる
 *
 * @param {array} from 遷移元 各画面のjsで宣言する画面名と同じ配列
 * @param {object} to 遷移先 appVue.views.xxx
 */
 app.jumpPage = function (from, to) {
	app._transition('reset-to-page', from, to);

    // 履歴をクリアした場合は、この画面をアプリ再起動時の表示画面とする
    app._setCurrentToStorage(to);
}

/**
 * 画面遷移の内部関数
 * 指定したアクションに沿った画面遷移を実施する
 * @param {string} action
 * @param {array} from 遷移元 各画面のjsで宣言する画面名と同じ配列
 * @param {object} to 遷移先 appVue.views.xxx
 */
app._transition = function(action, from, to = null){

    let toVue = to;
    if (!toVue){
        // 遷移先未指定の場合、スタックから上から二番目のDOMデータを取得し、そのIDから対応する画面のVue定義を取得
        let navi = document.getElementById('navi')
        let list = navi.pages;
        let target = list[list.length -2];
        let targetPageIds = target.id.split('-')
        toVue = appVue.views;
        for (let index = 0; index < targetPageIds.length; index++) {
            if (targetPageIds[index]){
                toVue = toVue[targetPageIds[index]];
            }
        }
    }

    // 遷移前に実行する処理が遷移先ページにあれば実行
    if (toVue && toVue.methods && toVue.methods.pretransition){
        toVue.methods.pretransition()
    }

    if (to){
    	from.pageScope.$emit(action, to);
    }else{
    	from.pageScope.$emit(action);
    }
}

app._setCurrentToStorage = function(current){
    let currentPage = JSON.stringify(current.key.split('/'));
	let id = localStorage.getItem('id');
	if (id){
		localStorage.setItem(id + '_current_page', currentPage);
	}
}

/**
 * inAppBrowserで開いたブラウザに対するクローズ処理の設定
 * ブラウザ側は閉じる際、以下を実行する想定
 * window.open('about:blank')
 * iOS用
 *
 * @param {*} ref inAppBrowserで開いたウィンドウの戻り値
 * @param {boolean } isNoticeCheck ブラウザを閉じた後、通知表示を更新するか
 * @param {boolean } isNoticeCheck ブラウザを閉じた後、通知表示を更新するか
 */
app.setupInAppBrowser = function (ref, isNoticeCheck = false) {
    ref.addEventListener("loadstop", function (e) {
        console.log("loadstop " + e.url);
        if (e.url.search(/about:blank/) > -1) {
            ref.close();
        }
        ref.executeScript(
            { code: 'document.cookie' },
            app.executeScript_callback
        );
    }, false);
    ref.addEventListener("exit", function (e) {
        if (isNoticeCheck){
            app.notice.checkNotice();
        }
    });
}
/**
 * inAppBrowserで開いたブラウザに対するクローズ処理の設定
 * ブラウザ側は閉じる際、以下を実行する想定
 * window.open('about:blank')
 * android用
 *
 * @param {*} ref inAppBrowserで開いたウィンドウの戻り値
 * @param {boolean } isNoticeCheck ブラウザを閉じた後、通知表示を更新するか
 * @param {boolean } isNoticeCheck ブラウザを閉じた後、通知表示を更新するか
 */
/*app.setupInAppBrowser = function (ref, isNoticeCheck = false) {
    ref.addEventListener("loadstart", function (e) {
        console.log("loadstart " + e.url);
        $('#loadingMask').show();
    }, false);
    ref.addEventListener("loadstop", function (e) {
        console.log("loadstop " + e.url);
        if (e.url.search(/about:blank/) > -1) {
            $('#loadingMask').hide();
            ref.close();
        }
        $('#loadingMask').hide();
        ref.show();
    }, false);
    ref.addEventListener("exit", function (e) {
        if (isNoticeCheck){
            app.notice.checkNotice();
        }
    });
}*/

/**
 * 指定したiSurgeryのWebサイトのurlをinAppBrowserで表示する
 * paramは必要なパラメタを指定する。'&'で始めること
 * iOS用
 * @param {string} url 表示先となるWebサイトのurl
 * @param {string} param urlに対するパラメタ
 */
app.showInAppBrowser = function(url, param = '', isNoticeCheck = false){
    let options = 'location=no,usewkwebview=yes';
    let baseParam = '?1';
    if (app.isLogin()){
        baseParam = '?fmapid=' + localStorage.getItem('id') + '&t=' + encodeURI(app.getDecodedLocalStorage('token_data'));
        options += ',toolbar=no';
    }else{
        options += ',footer=yes';
    }
    let ref = cordova.InAppBrowser.open(web_url+ url + baseParam + param, '_blank', options);

    app.setupInAppBrowser(ref, isNoticeCheck);
}

/**
 * 指定したiSurgeryのWebサイトのurlをinAppBrowserで表示する
 * paramは必要なパラメタを指定する。'&'で始めること
 * android用
 * @param {string} url 表示先となるWebサイトのurl
 * @param {string} param urlに対するパラメタ
 */
/*app.showInAppBrowser = function(url, param = '', isNoticeCheck = false){
    let options = 'location=no,usewkwebview=yes,zoom=no,hidden=yes';
    let baseParam = '?1';
    if (app.isLogin()){
        baseParam = '?fmapid=' + localStorage.getItem('id') + '&t=' + encodeURI(app.getDecodedLocalStorage('token_data'));
        options += ',toolbar=no';
    }else{
        options += ',footer=no';
    }
    let ref = cordova.InAppBrowser.open(web_url+ url + baseParam + param, '_blank', options);
    app.setupInAppBrowser(ref, isNoticeCheck);
}*/

app.callInAppBrowser = function (url) {
    let options = 'location=no,footer=yes,usewkwebview=yes';
    cordova.InAppBrowser.open(url, '_blank', options);
}

app.callAppBrowser = function (url) {
    let options = 'location=no,footer=yes,usewkwebview=yes';
    cordova.InAppBrowser.open(web_url+url);
}

// AppInBrowser実行時のコールバック関数
app.executeScript_callback = (values) => {
    let product_ids = values[0]
        .split('; ')
        .find(row => row.startsWith('COOKIE_PRODUCT_ID'))
        .split('=')[1]
    product_ids = decodeURIComponent(product_ids)
    localStorage.setItem('recently_checked_item_ids', product_ids)
}