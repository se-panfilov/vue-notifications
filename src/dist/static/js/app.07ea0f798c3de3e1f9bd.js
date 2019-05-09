webpackJsonp([1],{

/***/ "20Zl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "56EM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "showcase-page"
  }, [_vm._m(0), _vm._v(" "), _c('section', {
    staticClass: "showcase__actions"
  }, [_c('ul', {
    staticClass: "showcase__actions-item msg-buttons"
  }, [_c('li', {
    staticClass: "msg-buttons__list-item"
  }, [_c('button', {
    staticClass: "msg-buttons__btn -success",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.showSuccessMsg()
      }
    }
  }, [_vm._v("Success")])]), _vm._v(" "), _c('li', {
    staticClass: "msg-buttons__list-item"
  }, [_c('button', {
    staticClass: "msg-buttons__btn -info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.showInfoMsg()
      }
    }
  }, [_vm._v("Info")])]), _vm._v(" "), _c('li', {
    staticClass: "msg-buttons__list-item"
  }, [_c('button', {
    staticClass: "msg-buttons__btn -warn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.showWarnMsg()
      }
    }
  }, [_vm._v("Warning")])]), _vm._v(" "), _c('li', {
    staticClass: "msg-buttons__list-item"
  }, [_c('button', {
    staticClass: "msg-buttons__btn -error",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.showErrorMsg()
      }
    }
  }, [_vm._v("Error")])]), _vm._v(" "), _c('li', [_c('button', {
    staticClass: "msg-buttons__btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.showDynamicMsg()
      }
    }
  }, [_vm._v("Show dynamic message")])])]), _vm._v(" "), _c('ul', {
    staticClass: "showcase__actions-item showcase-lib"
  }, _vm._l((_vm.libs), function(value, key) {
    return _c('li', {
      staticClass: "showcase-lib__items",
      on: {
        "change": function($event) {
          _vm.setCurrentLib(key)
        }
      }
    }, [_c('label', [_c('input', {
      attrs: {
        "type": "radio",
        "name": "lib"
      },
      domProps: {
        "checked": _vm.currentLib === value,
        "value": key
      }
    }), _vm._v(" "), _c('span', {
      domProps: {
        "textContent": _vm._s(value)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "showcase-lib__third-party-home-ling"
    }, [_c('a', {
      attrs: {
        "href": _vm.ExampleSetup[key].home,
        "title": 'go to ' + value + ' home',
        "target": "_blank"
      }
    }, [_c('i', {
      staticClass: "fa fa-home",
      attrs: {
        "aria-hidden": "true"
      }
    })])])])])
  }))]), _vm._v(" "), _c('section', {
    staticClass: "showcase"
  }, [_c('section', {
    staticClass: "showcase__entry -setup"
  }, [_c('h3', {
    staticClass: "showcase__header"
  }, [_vm._v("Config VueNotifications (single place in whole app that will changed if you'd\n        replace 3rd-party notifications lib)")]), _vm._v(" "), _c('div', {
    staticClass: "code-samples__sample -func"
  }, [_c('pre', {
    attrs: {
      "id": "toast_func"
    }
  }, [_vm._v("          "), _c('code', {
    staticClass: "javascript",
    attrs: {
      "id": "toast_func_code"
    },
    domProps: {
      "textContent": _vm._s(_vm.ExampleSetup[_vm.currentLib].code)
    }
  }), _vm._v("\n        ")])])]), _vm._v(" "), _c('section', {
    staticClass: "showcase__entry -definition"
  }, [_c('h3', {
    staticClass: "showcase__header"
  }, [_vm._v("In your components (this part will never change)")]), _vm._v(" "), _c('pre', [_vm._v("        "), _c('code', {
    staticClass: "javascript",
    domProps: {
      "textContent": _vm._s(_vm.ExampleConfig.config)
    }
  }), _vm._v("\n      ")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _vm._m(1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "overview"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__("7Otq")
    }
  }), _vm._v(" "), _c('h2', [_c('a', {
    attrs: {
      "href": "https://vuejs.org"
    }
  }, [_vm._v("vue.js")]), _vm._v(" agnostic library for non-blocking notifications")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "highlighted-text"
  }, [_vm._v("VueNotifications")]), _vm._v(" connects your app with notification UI library. "), _c('br'), _vm._v("\n      That's also means you can have any look and feel of notifications you want to! "), _c('br'), _vm._v("\n      And it would be easy to replace it =)\n    ")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "misc"
  }, [_c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://github.com/se-panfilov/vue-notifications"
    }
  }, [_c('i', {
    staticClass: "fa fa-github",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n      Source code\n    ")]), _vm._v(" |\n    "), _c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://se-panfilov.github.io/vue-notifications/docs/html/index.html"
    }
  }, [_c('i', {
    staticClass: "fa fa-book",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n      Docs\n    ")]), _vm._v(" |\n    "), _c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://github.com/se-panfilov/vue-notifications/tree/master/examples"
    }
  }, [_c('i', {
    staticClass: "fa fa-free-code-camp",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n      Examples\n    ")]), _vm._v(" |\n    "), _c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://github.com/se-panfilov/vue-notifications/blob/master/LICENSE"
    }
  }, [_c('i', {
    staticClass: "fa fa-balance-scale",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n      MIT Licence\n    ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://github.com/se-panfilov/vue-notifications/releases"
    }
  }, [_c('i', {
    staticClass: "fa fa-rocket",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n      Release notes\n    ")]), _vm._v(" |\n    "), _c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://se-panfilov.github.io/vue-notifications/docs/html/browsers-support.html"
    }
  }, [_c('i', {
    staticClass: "fa fa-search",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n      Browsers support\n    ")]), _vm._v(" |\n    "), _c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://se-panfilov.github.io/vue-notifications/docs/html/vuejs-versions-support.html"
    }
  }, [_vm._v("Vue.js versions\n      support")]), _vm._v(" |\n    "), _c('a', {
    staticClass: "misc__item",
    attrs: {
      "href": "https://github.com/se-panfilov/vue-notifications/issues"
    }
  }, [_c('i', {
    staticClass: "fa fa-bolt",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n      Issues\n    ")]), _vm._v(" "), _c('br'), _vm._v("\n    Author: "), _c('a', {
    attrs: {
      "href": "https://se-panfilov.github.io/"
    }
  }, [_c('i', {
    staticClass: "fa fa-globe",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n    Sergei Panfilov")]), _vm._v(" |\n    Email: "), _c('a', {
    attrs: {
      "href": "mailto:se-panfilov@ya.ru"
    }
  }, [_c('i', {
    staticClass: "fa fa-envelope-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" se-panfilov@ya.ru\n  ")])])
}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "7Otq":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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"

/***/ }),

/***/ "ETpy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__("bOdI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_notifications__ = __webpack_require__("GB2M");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_highlight_js_lib_highlight__ = __webpack_require__("70Rd");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_highlight_js_lib_highlight___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_highlight_js_lib_highlight__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_highlight_js_lib_languages_javascript__ = __webpack_require__("IZDm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_highlight_js_lib_languages_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_highlight_js_lib_languages_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_highlight_js_styles_atom_one_light_css__ = __webpack_require__("tx0o");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_highlight_js_styles_atom_one_light_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_highlight_js_styles_atom_one_light_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__misc_example_setup__ = __webpack_require__("KZST");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__misc_example_setup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__misc_example_setup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__misc_example_config__ = __webpack_require__("YMwn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__misc_example_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__misc_example_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_easy_toast__ = __webpack_require__("UV/M");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_easy_toast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vue_easy_toast__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_mini_toastr__ = __webpack_require__("EMpD");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_toasted__ = __webpack_require__("IZMb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_toasted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_vue_toasted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery__ = __webpack_require__("7t+N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_toastr__ = __webpack_require__("vQJi");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_toastr_build_toastr_min_css__ = __webpack_require__("OQhB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_toastr_build_toastr_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_toastr_build_toastr_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_izitoast__ = __webpack_require__("YxSy");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_izitoast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_izitoast__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_izitoast_dist_css_iziToast_min_css__ = __webpack_require__("20Zl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_izitoast_dist_css_iziToast_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_izitoast_dist_css_iziToast_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_noty__ = __webpack_require__("y/MS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_noty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_noty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_noty_lib_noty_css__ = __webpack_require__("hsNo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_noty_lib_noty_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_noty_lib_noty_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_sweetalert__ = __webpack_require__("thjQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_sweetalert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_sweetalert__);


var _TOASTS;

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
//
//
//
//
//








//Third-party UI libs
 // https://github.com/noru/vue-easy-toast
 // https://github.com/se-panfilov/mini-toastr
 // https://github.com/shakee93/vue-toasted
//toastr
 // required by 'toastr'
 // https://github.com/CodeSeven/toastr

//iziToast
 // https://github.com/dolce/iziToast

//noty
 // https://github.com/needim/noty

//sweetalert
 // https://github.com/t4t5/sweetalert
//end toastr
//end iziToast
//end noty

__WEBPACK_IMPORTED_MODULE_3_highlight_js_lib_highlight___default.a.registerLanguage('javascript', __WEBPACK_IMPORTED_MODULE_4_highlight_js_lib_languages_javascript___default.a);
__WEBPACK_IMPORTED_MODULE_3_highlight_js_lib_highlight___default.a.initHighlightingOnLoad();

__WEBPACK_IMPORTED_MODULE_1_vue__["default"].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_9_mini_toastr__["a" /* default */].init();

var UI_LIBS = {
  miniToastr: 'miniToastr',
  VueToasted: 'VueToasted',
  VueEasyToast: 'VueEasyToast',
  toastr: 'toastr',
  iziToast: 'iziToast',
  Noty: 'Noty',
  swal: 'swal'
};

var TOASTS = (_TOASTS = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_TOASTS, UI_LIBS.miniToastr, function (_ref) {
  var title = _ref.title,
      message = _ref.message,
      type = _ref.type,
      timeout = _ref.timeout,
      cb = _ref.cb;

  return __WEBPACK_IMPORTED_MODULE_9_mini_toastr__["a" /* default */][type](message, title, timeout, cb);
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_TOASTS, UI_LIBS.VueToasted, function (_ref2) {
  var title = _ref2.title,
      message = _ref2.message,
      type = _ref2.type,
      timeout = _ref2.timeout,
      cb = _ref2.cb;

  if (type === __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.warn) type = 'show';
  return __WEBPACK_IMPORTED_MODULE_1_vue__["default"].toasted[type](message, { duration: timeout });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_TOASTS, UI_LIBS.VueEasyToast, function (_ref3) {
  var title = _ref3.title,
      message = _ref3.message,
      type = _ref3.type,
      timeout = _ref3.timeout,
      cb = _ref3.cb;

  var className = 'et-info';
  if (type === __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.warn) {
    className = 'et-warn';
  } else if (type === __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.error) className = 'et-alert';

  return __WEBPACK_IMPORTED_MODULE_1_vue__["default"].toast(message, { duration: timeout, className: className });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_TOASTS, UI_LIBS.toastr, function (_ref4) {
  var title = _ref4.title,
      message = _ref4.message,
      type = _ref4.type,
      timeout = _ref4.timeout,
      cb = _ref4.cb;

  // this shit requires jquery, lol
  if (type === __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.warn) type = 'warning';
  return __WEBPACK_IMPORTED_MODULE_12_toastr___default.a[type](message, title, { timeOut: timeout });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_TOASTS, UI_LIBS.iziToast, function (_ref5) {
  var title = _ref5.title,
      message = _ref5.message,
      type = _ref5.type,
      timeout = _ref5.timeout,
      cb = _ref5.cb;

  if (type === __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.warn) type = 'warning';
  return __WEBPACK_IMPORTED_MODULE_14_izitoast___default.a[type]({ title: title, message: message, timeout: timeout });
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_TOASTS, UI_LIBS.Noty, function (_ref6) {
  var title = _ref6.title,
      message = _ref6.message,
      type = _ref6.type,
      timeout = _ref6.timeout,
      cb = _ref6.cb;

  if (type === __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.warn) type = 'warning';

  return new __WEBPACK_IMPORTED_MODULE_16_noty___default.a({ text: message, timeout: timeout, type: type }).show();
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_TOASTS, UI_LIBS.swal, function (_ref7) {
  var title = _ref7.title,
      message = _ref7.message,
      type = _ref7.type,
      timeout = _ref7.timeout,
      cb = _ref7.cb;

  if (type === __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.warn) type = 'warning';
  return __WEBPACK_IMPORTED_MODULE_18_sweetalert___default()(title, message, type);
}), _TOASTS);

__WEBPACK_IMPORTED_MODULE_1_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_8_vue_easy_toast___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_10_vue_toasted___default.a);
//  Vue.use(VueNotifications, options)

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'showcase',
  data: function data() {
    return {
      ExampleSetup: __WEBPACK_IMPORTED_MODULE_6__misc_example_setup___default.a,
      ExampleConfig: __WEBPACK_IMPORTED_MODULE_7__misc_example_config___default.a,
      libs: UI_LIBS,
      currentLib: UI_LIBS.miniToastr,
      checked: ''
    };
  },

  notifications: {
    showSuccessMsg: {
      type: __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.success,
      title: 'Hello there',
      message: 'That\'s the success!'
    },
    showInfoMsg: {
      type: __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.info,
      title: 'Hey you',
      message: 'Here is some info for you'
    },
    showWarnMsg: {
      type: __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.warn,
      title: 'Wow, man',
      message: 'That\'s the kind of warning'
    },
    showErrorMsg: {
      type: __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types.error,
      title: 'Wow-wow',
      message: 'That\'s the error'
    },
    showDynamicMsg: {
      type: function type() {
        var _VueNotifications$typ = __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.types,
            info = _VueNotifications$typ.info,
            success = _VueNotifications$typ.success;

        return new Date().getSeconds() % 2 === 0 ? info : success;
      },
      title: function title() {
        return 'My title: ' + 1;
      },
      message: function message() {
        return 'Current time is' + new Date().getTime();
      }
    }
  },
  methods: {
    setCurrentLib: function setCurrentLib(libKey) {
      this.currentLib = libKey;
      this.checked = libKey;

      var options = {
        success: TOASTS[this.currentLib],
        error: TOASTS[this.currentLib],
        info: TOASTS[this.currentLib],
        warn: TOASTS[this.currentLib]

        //dirty hack for HighlightJS
      };var codeElem = document.getElementById('toast_func_code');
      codeElem.innerHTML = this.ExampleSetup[this.currentLib].code;
      __WEBPACK_IMPORTED_MODULE_3_highlight_js_lib_highlight___default.a.highlightBlock(document.getElementById('toast_func'));

      __WEBPACK_IMPORTED_MODULE_2_vue_notifications___default.a.setPluginOptions(options);
    }
  }
});

/***/ }),

/***/ "KZST":
/***/ (function(module, exports) {

module.exports = {"miniToastr":{"code":"import VueNotifications from 'vue-notifications'\nimport miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr\n\nminiToastr.init()\n\nfunction toast ({title, message, type, timeout, cb}) {\n  return miniToastr[type](message, title, timeout, cb)\n}\n\nconst options = {\n  success: toast,\n  error: toast,\n  info: toast,\n  warn: toast\n}\n\nVue.use(VueNotifications, options)","home":"https://github.com/se-panfilov/mini-toastr"},"VueToasted":{"code":"import VueNotifications from 'vue-notifications'\nimport VueToasted from 'vue-toasted'// https://github.com/shakee93/vue-toasted\n\nfunction toast ({title, message, type, timeout, cb}) {\n  if (type === VueNotifications.types.warn) type = 'show'\n  return Vue.toasted[type](message, {duration: timeout})\n}\n\nVue.use(VueToasted)\n\nconst options = {\n  success: toast,\n  error: toast,\n  info: toast,\n  warn: toast\n}\n\nVue.use(VueNotifications, options)","home":"https://github.com/shakee93/vue-toasted"},"VueEasyToast":{"code":"import VueNotifications from 'vue-notifications'\nimport VueEasyToast from 'vue-easy-toast' // https://github.com/noru/vue-easy-toast\n\nfunction toast ({title, message, type, timeout, cb}) {\n  let className = 'et-info'\n  if (type === VueNotifications.types.warn) className = 'et-warn'\n  else if (type === VueNotifications.types.error) className = 'et-alert'\n\n  return Vue.toast(message, {duration: timeout, className})\n}\n\nVue.use(VueEasyToast)\n\nconst options = {\n  success: toast,\n  error: toast,\n  info: toast,\n  warn: toast\n}\n\nVue.use(VueNotifications, options)","home":"https://github.com/noru/vue-easy-toast"},"toastr":{"code":"import VueNotifications from 'vue-notifications'\nimport 'jquery'\nimport toastr from 'toastr'// https://github.com/CodeSeven/toastr\nimport 'toastr/build/toastr.min.css'\n\nfunction toast ({title, message, type, timeout, cb}) {\n  if (type === VueNotifications.types.warn) type = 'warning'\n  return toastr[type](message, title, {timeOut: timeout})\n}\n\nconst options = {\n  success: toast,\n  error: toast,\n  info: toast,\n  warn: toast\n}\n\nVue.use(VueNotifications, options)","home":"https://github.com/CodeSeven/toastr"},"iziToast":{"code":"import VueNotifications from 'vue-notifications'\nimport iziToast from 'izitoast'// https://github.com/dolce/iziToast\nimport 'izitoast/dist/css/iziToast.min.css'\n\nfunction toast ({title, message, type, timeout, cb}) {\n  if (type === VueNotifications.types.warn) type = 'warning'\n  return iziToast[type]({title, message, timeout})\n}\n\nconst options = {\n  success: toast,\n  error: toast,\n  info: toast,\n  warn: toast\n}\n\nVue.use(VueNotifications, options)","home":"https://github.com/dolce/iziToast"},"Noty":{"code":"import VueNotifications from 'vue-notifications'\nimport Noty from 'noty'// https://github.com/needim/noty\nimport 'noty/lib/noty.css'\n\nfunction toast ({title, message, type, timeout, cb}) {\n  if (type === VueNotifications.types.warn) type = 'warning'\n  return new Noty({text: message, timeout, type}).show()\n}\n\nconst options = {\n  success: toast,\n  error: toast,\n  info: toast,\n  warn: toast\n}\n\nVue.use(VueNotifications, options)","home":"https://github.com/needim/noty"},"swal":{"code":"import VueNotifications from 'vue-notifications'\nimport swal from 'sweetalert'// https://github.com/t4t5/sweetalert\n\nfunction toast ({title, message, type, timeout, cb}) {\n  if (type === VueNotifications.types.warn) type = 'warning'\n  return swal(title, message, type)\n}\n\nconst options = {\n  success: toast,\n  error: toast,\n  info: toast,\n  warn: toast\n}\n\nVue.use(VueNotifications, options)","home":"https://github.com/t4t5/sweetalert"}}

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cc235ee6_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("X8QV");
function injectStyle (ssrContext) {
  __webpack_require__("XYUs")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cc235ee6_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__("M93x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__("YaEn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_notifications__ = __webpack_require__("GB2M");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mini_toastr__ = __webpack_require__("EMpD");
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_4_mini_toastr__["a" /* default */].init();

function toast(_ref) {
  var title = _ref.title,
      message = _ref.message,
      type = _ref.type,
      timeout = _ref.timeout,
      cb = _ref.cb,
      debugMsg = _ref.debugMsg;

  if (debugMsg) console[type](debugMsg);
  return __WEBPACK_IMPORTED_MODULE_4_mini_toastr__["a" /* default */][type](message, title, timeout, cb);
}

var options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
};

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_vue_notifications___default.a, options);

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] }
});

/***/ }),

/***/ "OQhB":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Ojsu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_showcase_vue__ = __webpack_require__("ETpy");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1691a292_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_showcase_vue__ = __webpack_require__("56EM");
function injectStyle (ssrContext) {
  __webpack_require__("VgZo")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1691a292"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_showcase_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1691a292_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_showcase_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "VgZo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "X8QV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('header-menu'), _vm._v(" "), _c('router-view')], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "XYUs":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "YMwn":
/***/ (function(module, exports) {

module.exports = {"config":"export default {\n  name: 'MyComponent',\n  data () {\n    return {}\n  },\n  notifications: {\n    showSuccessMsg: {\n      type: VueNotifications.types.success,\n      title: 'Hello there',\n      message: 'That\\'s the success!'\n    },\n    showInfoMsg: {\n      type: VueNotifications.types.info,\n      title: 'Hey you',\n      message: 'Here is some info for you'\n    },\n    showWarnMsg: {\n      type: VueNotifications.types.warn,\n      title: 'Wow, man',\n      message: 'That\\'s the kind of warning'\n    },\n    showErrorMsg: {\n      type: VueNotifications.types.error,\n      title: 'Wow-wow',\n      message: 'That\\'s the error'\n    }\n  }\n}"}

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__("/ocq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_showcase__ = __webpack_require__("Ojsu");




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'showcase',
    component: __WEBPACK_IMPORTED_MODULE_2__components_showcase__["a" /* default */]
  }]
}));

/***/ }),

/***/ "hsNo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "l8Yj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'header',
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "nhXY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_HeaderMenu_vue__ = __webpack_require__("l8Yj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46f2b5d1_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_HeaderMenu_vue__ = __webpack_require__("tL8P");
function injectStyle (ssrContext) {
  __webpack_require__("oE6O")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-46f2b5d1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_HeaderMenu_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46f2b5d1_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_HeaderMenu_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "oE6O":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tL8P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "header"
  }, [_c('a', {
    staticClass: "header__logo",
    attrs: {
      "href": "https://se-panfilov.github.io/vue-notifications/"
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__("7Otq")
    }
  }), _vm._v(" "), _c('span', [_vm._v("VueNotifications")])]), _vm._v(" "), _c('ul', {
    staticClass: "nav"
  }, [_c('li', {
    staticClass: "nav__item"
  }, [_c('a', {
    attrs: {
      "href": "https://se-panfilov.github.io/vue-notifications/docs/html/index.html",
      "title": "Docs"
    }
  }, [_c('i', {
    staticClass: "fa fa-book",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n        Documentation\n      ")])]), _vm._v(" "), _c('li', {
    staticClass: "nav__item"
  }, [_c('a', {
    attrs: {
      "href": "https://github.com/se-panfilov/vue-notifications",
      "title": "source code"
    }
  }, [_c('i', {
    staticClass: "fa fa-github",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n        GitHub\n      ")])])])])
}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "tx0o":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "xJD8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_HeaderMenu__ = __webpack_require__("nhXY");
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  components: {
    HeaderMenu: __WEBPACK_IMPORTED_MODULE_0__components_HeaderMenu__["a" /* default */]
  }
});

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.07ea0f798c3de3e1f9bd.js.map