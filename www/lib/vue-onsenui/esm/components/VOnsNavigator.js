import _Object$assign from 'babel-runtime/core-js/object/assign';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _extends from 'babel-runtime/helpers/extends';
import _Promise from 'babel-runtime/core-js/promise';
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import 'onsenui/esm/elements/ons-navigator';
import { hasOptions, selfProvider, deriveEvents, deriveDBB } from '../mixins';

var __script__ = {
  name: 'v-ons-navigator',
  mixins: [hasOptions, selfProvider, deriveEvents, deriveDBB],

  props: {
    pageStack: {
      type: Array,
      required: true
    },
    popPage: {
      type: Function,
      default: function _default() {
        this.pageStack.pop();
      }
    }
  },

  methods: {
    isReady: function isReady() {
      if (this.hasOwnProperty('_ready') && this._ready instanceof _Promise) {
        return this._ready;
      }
      return _Promise.resolve();
    },
    onDeviceBackButton: function onDeviceBackButton(event) {
      if (this.pageStack.length > 1) {
        this.popPage();
      } else {
        event.callParentHandler();
      }
    },
    _findScrollPage: function _findScrollPage(page) {
      var nextPage = page._contentElement.children.length === 1 && this.$ons._ons._util.getTopPage(page._contentElement.children[0]);
      return nextPage ? this._findScrollPage(nextPage) : page;
    },
    _eachPage: function _eachPage(start, end, cb) {
      for (var i = start; i < end; i++) {
        cb(this.$children[i].$el);
      }
    },
    _reattachPage: function _reattachPage(pageElement) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var restoreScroll = arguments[2];

      this.$el.insertBefore(pageElement, position);
      restoreScroll instanceof Function && restoreScroll();
      pageElement._isShown = true;
    },
    _redetachPage: function _redetachPage(pageElement) {
      pageElement._destroy();
      return _Promise.resolve();
    },
    _animate: function _animate(_ref) {
      var _this = this;

      var lastLength = _ref.lastLength,
          currentLength = _ref.currentLength,
          lastTopPage = _ref.lastTopPage,
          currentTopPage = _ref.currentTopPage,
          restoreScroll = _ref.restoreScroll;

      var pushedOptions = this.pageStack[this.pageStack.length - 1].onsNavigatorOptions || currentTopPage.__vue__.onsNavigatorOptions || {};

      // Push
      if (currentLength > lastLength) {
        var isReattached = false;
        if (lastTopPage.parentElement !== this.$el) {
          this._reattachPage(lastTopPage, this.$el.children[lastLength - 1], restoreScroll);
          isReattached = true;
          lastLength--;
        }

        this._eachPage(lastLength, currentLength, function (el) {
          el.style.visibility = 'hidden';
        });
        this._eachPage(lastLength, currentLength - 1, function (el) {
          el.pushedOptions = pushedOptions;
        });

        return this.$el._pushPage(_extends({}, pushedOptions, { leavePage: lastTopPage })).then(function () {
          _setImmediate(function () {
            _this._eachPage(lastLength, currentLength, function (el) {
              el.style.visibility = '';
            });
            _this._eachPage(lastLength - 1, currentLength - 1, function (el) {
              el.style.display = 'none';
            });
          });

          if (isReattached) {
            _this._redetachPage(lastTopPage);
          }
        });
      }

      // Pop
      if (currentLength < lastLength) {
        this._reattachPage(lastTopPage, null, restoreScroll);
        return this.$el._popPage({}, function () {
          return _this._redetachPage(lastTopPage);
        });
      }

      // Replace page
      currentTopPage.style.visibility = 'hidden';
      this._reattachPage(lastTopPage, currentTopPage, restoreScroll);
      return this.$el._pushPage(_extends({}, pushedOptions, { _replacePage: true })).then(function () {
        return _this._redetachPage(lastTopPage);
      });
    },
    _checkSwipe: function _checkSwipe(event) {
      if (this.$el.hasAttribute('swipeable') && event.leavePage !== this.$el.lastChild && event.leavePage === this.$children[this.$children.length - 1].$el) {
        this.popPage();
      }
    }
  },

  watch: {
    pageStack: function pageStack(after, before) {
      if (this.$el.hasAttribute('swipeable') && this.$children.length !== this.$el.children.length) {
        return;
      }

      var propWasMutated = after === before; // Can be mutated or replaced
      var lastTopPage = this.$children[this.$children.length - 1].$el;
      var scrollElement = this._findScrollPage(lastTopPage);
      var scrollValue = scrollElement.scrollTop || 0;

      this._pageStackUpdate = {
        lastTopPage: lastTopPage,
        lastLength: propWasMutated ? this.$children.length : before.length,
        currentLength: !propWasMutated && after.length,
        restoreScroll: function restoreScroll() {
          return scrollElement.scrollTop = scrollValue;
        }
      };

      // this.$nextTick(() => { }); // Waits too long, updated() hook is faster and prevents flickerings
    }
  },

  updated: function updated() {
    if (this._pageStackUpdate) {
      var currentTopPage = this.$children[this.$children.length - 1].$el;
      var _pageStackUpdate = this._pageStackUpdate,
          lastTopPage = _pageStackUpdate.lastTopPage,
          currentLength = _pageStackUpdate.currentLength;
      var _pageStackUpdate2 = this._pageStackUpdate,
          lastLength = _pageStackUpdate2.lastLength,
          restoreScroll = _pageStackUpdate2.restoreScroll;

      currentLength = currentLength === false ? this.$children.length : currentLength;

      if (currentTopPage !== lastTopPage) {
        this._ready = this._animate({ lastLength: lastLength, currentLength: currentLength, lastTopPage: lastTopPage, currentTopPage: currentTopPage, restoreScroll: restoreScroll });
      } else if (currentLength !== lastLength) {
        currentTopPage.updateBackButton(currentLength > 1);
      }

      lastTopPage = currentTopPage = this._pageStackUpdate = null;
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-navigator', _vm._g({
    domProps: {
      "options": _vm.options
    },
    on: {
      "postpop": function postpop($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }
        _vm._checkSwipe($event);
      }
    }
  }, _vm.unrecognizedListeners), [_vm._t("default", _vm._l(_vm.pageStack, function (page) {
    return _c(page, _vm._g(_vm._b({
      key: page.key || page.name,
      tag: "component"
    }, 'component', page.onsNavigatorProps, false), _vm.unrecognizedListeners));
  }))], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);