(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.install = function () {
  console.log(1);
};

// const STYLE = {
//   error: '-error',
//   warn: '-warn',
//   info: '-info',
//   success: '-success'
// }
//
// const STATE = {
//   installed: false
// }
// const MESSAGES = {
//   alreadyInstalled: 'VueNotifications plugin already installed'
// }
//
// function showMessage (msg, style) {
//   if (style === STYLE.error) return console.error(msg)
//   if (style === STYLE.warn) return console.warn(msg)
//   if (style === STYLE.info) return console.log(msg)
//   if (style === STYLE.success) return console.info(msg)
// }
//
// const VueNotifications = {
//   install  (Vue, options = {}) {
//     if (STATE.installed) throw console.error(MESSAGES.alreadyInstalled)
//     STATE.installed = true
//
//     // class VueNotifications {}
//
//     Vue.prototype.$successMsg = (msg) => {
//       showMessage(msg, STYLE.success)
//     }
//
//     Vue.prototype.$infoMsg = (msg) => {
//       showMessage(msg, STYLE.success)
//     }
//
//     Vue.prototype.$errorMsg = (msg) => {
//       showMessage(msg, STYLE.success)
//     }
//
//     Vue.prototype.$warnMsg = (msg) => {
//       showMessage(msg, STYLE.success)
//     }
//   }
// }
//
// // VueNotifications.install = (Vue, options = {}) => {
// //   if (STATE.installed) throw console.error(MESSAGES.alreadyInstalled)
// //   STATE.installed = true
// //
// //   // class VueNotifications {}
// //
// //   Vue.prototype.$successMsg = (msg) => {
// //     showMessage(msg, STYLE.success)
// //   }
// //
// //   Vue.prototype.$infoMsg = (msg) => {
// //     showMessage(msg, STYLE.success)
// //   }
// //
// //   Vue.prototype.$errorMsg = (msg) => {
// //     showMessage(msg, STYLE.success)
// //   }
// //
// //   Vue.prototype.$warnMsg = (msg) => {
// //     showMessage(msg, STYLE.success)
// //   }
// //
// // }
//
// export default VueNotifications
// //
// // if (typeof window !== 'undefined' && window.Vue) {
// //   window.Vue.use(VueNotifications)
// // }

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EsUUFBUSxPQUFSLEdBQWtCLFlBQU07QUFDdEIsVUFBUSxHQUFSLENBQVksQ0FBWjtBQUNELENBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuZXhwb3J0cy5pbnN0YWxsID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZygxKVxufVxuXG4vLyBjb25zdCBTVFlMRSA9IHtcbi8vICAgZXJyb3I6ICctZXJyb3InLFxuLy8gICB3YXJuOiAnLXdhcm4nLFxuLy8gICBpbmZvOiAnLWluZm8nLFxuLy8gICBzdWNjZXNzOiAnLXN1Y2Nlc3MnXG4vLyB9XG4vL1xuLy8gY29uc3QgU1RBVEUgPSB7XG4vLyAgIGluc3RhbGxlZDogZmFsc2Vcbi8vIH1cbi8vIGNvbnN0IE1FU1NBR0VTID0ge1xuLy8gICBhbHJlYWR5SW5zdGFsbGVkOiAnVnVlTm90aWZpY2F0aW9ucyBwbHVnaW4gYWxyZWFkeSBpbnN0YWxsZWQnXG4vLyB9XG4vL1xuLy8gZnVuY3Rpb24gc2hvd01lc3NhZ2UgKG1zZywgc3R5bGUpIHtcbi8vICAgaWYgKHN0eWxlID09PSBTVFlMRS5lcnJvcikgcmV0dXJuIGNvbnNvbGUuZXJyb3IobXNnKVxuLy8gICBpZiAoc3R5bGUgPT09IFNUWUxFLndhcm4pIHJldHVybiBjb25zb2xlLndhcm4obXNnKVxuLy8gICBpZiAoc3R5bGUgPT09IFNUWUxFLmluZm8pIHJldHVybiBjb25zb2xlLmxvZyhtc2cpXG4vLyAgIGlmIChzdHlsZSA9PT0gU1RZTEUuc3VjY2VzcykgcmV0dXJuIGNvbnNvbGUuaW5mbyhtc2cpXG4vLyB9XG4vL1xuLy8gY29uc3QgVnVlTm90aWZpY2F0aW9ucyA9IHtcbi8vICAgaW5zdGFsbCAgKFZ1ZSwgb3B0aW9ucyA9IHt9KSB7XG4vLyAgICAgaWYgKFNUQVRFLmluc3RhbGxlZCkgdGhyb3cgY29uc29sZS5lcnJvcihNRVNTQUdFUy5hbHJlYWR5SW5zdGFsbGVkKVxuLy8gICAgIFNUQVRFLmluc3RhbGxlZCA9IHRydWVcbi8vXG4vLyAgICAgLy8gY2xhc3MgVnVlTm90aWZpY2F0aW9ucyB7fVxuLy9cbi8vICAgICBWdWUucHJvdG90eXBlLiRzdWNjZXNzTXNnID0gKG1zZykgPT4ge1xuLy8gICAgICAgc2hvd01lc3NhZ2UobXNnLCBTVFlMRS5zdWNjZXNzKVxuLy8gICAgIH1cbi8vXG4vLyAgICAgVnVlLnByb3RvdHlwZS4kaW5mb01zZyA9IChtc2cpID0+IHtcbi8vICAgICAgIHNob3dNZXNzYWdlKG1zZywgU1RZTEUuc3VjY2Vzcylcbi8vICAgICB9XG4vL1xuLy8gICAgIFZ1ZS5wcm90b3R5cGUuJGVycm9yTXNnID0gKG1zZykgPT4ge1xuLy8gICAgICAgc2hvd01lc3NhZ2UobXNnLCBTVFlMRS5zdWNjZXNzKVxuLy8gICAgIH1cbi8vXG4vLyAgICAgVnVlLnByb3RvdHlwZS4kd2Fybk1zZyA9IChtc2cpID0+IHtcbi8vICAgICAgIHNob3dNZXNzYWdlKG1zZywgU1RZTEUuc3VjY2Vzcylcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cbi8vXG4vLyAvLyBWdWVOb3RpZmljYXRpb25zLmluc3RhbGwgPSAoVnVlLCBvcHRpb25zID0ge30pID0+IHtcbi8vIC8vICAgaWYgKFNUQVRFLmluc3RhbGxlZCkgdGhyb3cgY29uc29sZS5lcnJvcihNRVNTQUdFUy5hbHJlYWR5SW5zdGFsbGVkKVxuLy8gLy8gICBTVEFURS5pbnN0YWxsZWQgPSB0cnVlXG4vLyAvL1xuLy8gLy8gICAvLyBjbGFzcyBWdWVOb3RpZmljYXRpb25zIHt9XG4vLyAvL1xuLy8gLy8gICBWdWUucHJvdG90eXBlLiRzdWNjZXNzTXNnID0gKG1zZykgPT4ge1xuLy8gLy8gICAgIHNob3dNZXNzYWdlKG1zZywgU1RZTEUuc3VjY2Vzcylcbi8vIC8vICAgfVxuLy8gLy9cbi8vIC8vICAgVnVlLnByb3RvdHlwZS4kaW5mb01zZyA9IChtc2cpID0+IHtcbi8vIC8vICAgICBzaG93TWVzc2FnZShtc2csIFNUWUxFLnN1Y2Nlc3MpXG4vLyAvLyAgIH1cbi8vIC8vXG4vLyAvLyAgIFZ1ZS5wcm90b3R5cGUuJGVycm9yTXNnID0gKG1zZykgPT4ge1xuLy8gLy8gICAgIHNob3dNZXNzYWdlKG1zZywgU1RZTEUuc3VjY2Vzcylcbi8vIC8vICAgfVxuLy8gLy9cbi8vIC8vICAgVnVlLnByb3RvdHlwZS4kd2Fybk1zZyA9IChtc2cpID0+IHtcbi8vIC8vICAgICBzaG93TWVzc2FnZShtc2csIFNUWUxFLnN1Y2Nlc3MpXG4vLyAvLyAgIH1cbi8vIC8vXG4vLyAvLyB9XG4vL1xuLy8gZXhwb3J0IGRlZmF1bHQgVnVlTm90aWZpY2F0aW9uc1xuLy8gLy9cbi8vIC8vIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVnVlKSB7XG4vLyAvLyAgIHdpbmRvdy5WdWUudXNlKFZ1ZU5vdGlmaWNhdGlvbnMpXG4vLyAvLyB9Il19
