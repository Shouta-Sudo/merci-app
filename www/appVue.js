Vue.use(VueOnsen);

// Vue定義 -------------------------
// vue初期処理(初期画面設定)
appVue.init = function() {
	try {
		// 全リソースロード後に処理実行
		$(function() {

			// Vue定義 -------------------------
			// コンポーネント起動

			// ページ起動
			appVue.vm = new Vue({
                created() {
                    this.$ons.disableAutoStyling();
                },
                beforeMount() {
                    const html = document.documentElement;
                    if (this.$ons.platform.isIPhoneX() || this.$ons.platform.isIPad()) {
                        html.setAttribute('onsflag-iphonex-portrait', '');
                    }
                    if (!this.$ons.platform.isIPhoneX()) {
                        html.setAttribute('onsflag-non-iphonex-portrait', '');
                    }
                },
				el: '#app',
				template: '#main',
				data: viewData,
				methods: {
					changePage: function (params) {
						header.changePage(params);
					}
				},
			});
		});
	} catch (err) {
		alert('[appVue.init]' + '\n' + err.message);
	} finally {
	}
};

function viewData() {
	try {
		return {
			pageStack: [appVue.views.top],
			// currentPage: 'login',
			openSide: false,
			login_status: app.isLogin(),
		};
	} catch(err) {
		alert('appVue.viewData' + '\n' + err.message);
	} finally {
	}
}

function setTemplateList(templateList, views){
	for (var item in views) {
		if ($.isPlainObject(views[item])){
			if (views[item].key){
				templateList.push(views[item].key);
			}else{
				templateList = setTemplateList(templateList, views[item]);
			}
		}
	}
	return templateList;
}

// 初期化
function initAppVue() {
	var templateList = [];
	try {
		templateList = setTemplateList(templateList, appVue.views)
		// テンプレート読み込み
		app.readTemplate(templateList, appVue.init);
	} catch(err) {
		alert('appVue.initVue' + '\n' + err.message);
	} finally {
		templateList = null;
	}
}

// 初期処理の実行
// init();
