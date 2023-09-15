// 画面定義 -------------------------
var pager = {};

// 画面データ設定
pager.setData = function() {
	try {
		return {
			view: {
				pageNo: 1,
				lowerLimit: 1,
				upperLimit: 1,
				totalNav: 1,
			},
		};
	} catch(err) {
		alert('pager.setData' + '\n' + err.message);
	} finally {
	}
};

/**
 * ページャーの初期化処理
 * @param {Vue} pagerVue ページャー
 */
pager.init = function(pagerVue) {
	try {

	} catch(err) {
		alert('pager.init' + '\n' + err.message);
		throw err;
	} finally {
	}
};

/**
 * ページ選択時の処
 * @param {int} pageNo ページ番号
 */
pager.selectPage = function(pageNo) {
	try {
		pagerVue.$set(pagerVue.view, 'pageNo', 1);
		pagerVue.$set(pagerVue.view, 'totalNav', 1);
		pagerVue.$set(pagerVue.view, 'lowerLimit', 1);
		pagerVue.$set(pagerVue.pageScope.view, 'upperLimit', 1);
	} catch(err) {
		debugLog('pager.action' + '\n' + err.message);
	} finally {
	}
};

/**
 * サーバーから得られたページャー情報を元にページャーを設定する
 * 親のviewプロパティの以下を利用する
 *   totalNav: ページ総数
 *   lowerLimit: 表示ページの下限
 *   upperLimit: 表示ページの上限
 * @param {array} res ページャー情報を含むサーバーからの戻り値
 */
pager.setPageNav = function(pagerVue, res){

	//ページナビゲーションの数
	// var totalNav = Math.ceil(order_res.data.total / order_list_edit.pageScope.form.perPage);
	// order_list_edit.pageScope.$set(order_list_edit.pageScope.view, "totalNav", totalNav);
	let totalNav = res.data.last_page;
	let current = res.data.current_page;
	let lower = current > 2 ? current - 2 : 1;
	let upper = totalNav - current > 2 ? current + 2 : totalNav;
	if (lower == 1){
		upper = totalNav > lower + 5 ? 5 : totalNav;
	}else if (upper == totalNav){
		lower = upper - 5 < 1 ? 1 : upper - 5;
	}
	
	pagerVue.$set(pagerVue.view, 'pageNo', current);
	pagerVue.$set(pagerVue.view, 'totalNav', totalNav);
	pagerVue.$set(pagerVue.view, 'lowerLimit', lower);
	pagerVue.$set(pagerVue.view, 'upperLimit', upper);

}

/**
 * ヘッダー定義
 */
Vue.component('page-pager', {
	data: pager.setData,
	methods: {
		init(){ pager.init(this); },
		selectPage(pageNo) { // 番号ボタン押下時にトリガーする親コンポーネントのメソッド
			this.$emit('select_page', pageNo)
		},
		setPageNav(res){pager.setPageNav(this, res);}
	},
	template: `
	<div class="pager">
		<ul class="uk-pagination">
		<li><v-ons-button modifier="quiet" @click="selectPage(view.pageNo-1)"><v-ons-icon icon="fa-chevron-left"></v-ons-icon></v-ons-button></li>
		<li v-for="page in view.totalNav" :class="{'uk-active':page === view.pageNo}">
			<span v-if="(page != 1 && view.lowerLimit == page) || (page != view.totalNav && view.upperLimit == page)" @click="selectPage(page)">...</span>
			<span v-else-if="page == 1 || page == view.totalNav || (view.lowerLimit < page && view.upperLimit > page)" @click="selectPage(page)">{{ page }}</span>
		</li>
		<li><v-ons-button modifier="quiet" @click="selectPage(view.pageNo+1)"><v-ons-icon icon="fa-chevron-right"></v-ons-icon></v-ons-button></a></li>
		</ul>
	</div>
	`	
});