[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a6dee4e21d04653b53c0a9618a2cc84)](https://www.codacy.com/app/se-panfilov/vue-notifications?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=se-panfilov/vue-notifications&amp;utm_campaign=Badge_Grade)
[![bitHound Overall Score](https://www.bithound.io/github/se-panfilov/vue-notifications/badges/score.svg)](https://www.bithound.io/github/se-panfilov/vue-notifications) [![bitHound Code](https://www.bithound.io/github/se-panfilov/vue-notifications/badges/code.svg)](https://www.bithound.io/github/se-panfilov/vue-notifications)
[![Code Climate](https://codeclimate.com/github/se-panfilov/vue-notifications/badges/gpa.svg)](https://codeclimate.com/github/se-panfilov/vue-notifications)
[![Build Status](https://travis-ci.org/se-panfilov/vue-notifications.svg?branch=master)](https://travis-ci.org/se-panfilov/vue-notifications)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/se-panfilov/vue-notifications/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/vue-notifications.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-notifications/)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

| [SITE](https://se-panfilov.github.io/vue-notifications/) | [DOCS](https://se-panfilov.github.io/vue-notifications/docs/html/index.html) | [GITHUB](https://github.com/se-panfilov/vue-notifications) |

# vue-notifications

**VueNotifications** - agnostic non-blocking notifications library, that allow you to use notifications in declaration style.

----

## Installation

via npm:

```shell
npm i vue-notifications --save
```

via bower:

```sh
bower i vue-notifications --save
```
or download [latest release][1]

include in project:

```JS
import VueNotifications from 'vue-notifications'
```

```JS
Vue.use(VueNotifications, options)
```

## Setup and configuration

**Attention:** By default VueNotification send all messages _to console_. To activate non-blocking notifiction you've got to use third-party library, like toasr. I suggest you to use [mini-toastr][2] (`npm i mini-toastr --save`)

```JS
// Include Plugin in project
import VueNotifications from 'vue-notifications'

// Include mini-toaster (or any other UI-notification library
import miniToastr from 'mini-toastr'

// If using mini-toastr, provide additional configuration
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({types: toastTypes})

// Here we setup messages output to `mini-toastr`
function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

// Binding for methods .success(), .error() and etc. You can specify and map your own methods here.
// Required to pipe our output to UI library (mini-toastr in example here)
// All not-specified events (types) would be piped to output in console.
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

// Activate plugin
Vue.use(VueNotifications, options)// VueNotifications have auto install but if we want to specify options we've got to do it manually.
```

```JS
// THIS ISN'T REQUIRED IF YOU DON'T USE 'mini-toastr'
// and if you would use "miniToastr" you have to init in in your App.vue
import miniToastr from 'mini-toastr'// don't forget to make "npm i mini-toastr --save"

//in 'ready section
//  ...
    ready () { //'mounted' instade of ready for Vue 2.0
      miniToastr.init()//or "miniToastr.init(miniToastrConfig)" if you want to specify configuration
    },
//  ...
```

If you want to setup VueNotification's global configuration, you can do it simple:

```JS
VueNotifications.config.timeout = 4000
Vue.use(VueNotifications, options)
```

Also you can use any other word instead of `notifications` for configs:

```JS
VueNotifications.propertyName = 'messages'
Vue.use(VueNotifications, options)
```

## Usage

You've got to specify notifications config:

```JS
export default {
    name: 'DemoView',
    data () {
      //...
    },
    computed: {
      //...
    },
    methods: {
      //...
    },
    notifications: {
      showLoginError: {
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error' //Default: 'info', also you can use VueNotifications.types.error instead of 'error'
      }
    },
    vuex: {
      //...
    }
  }
```
Now you can call `this.showLoginError()` in any place of this page (i.e. in methods, or whatever).

You also can call `.success()`, `.error()` and other methods directly (for example in JavaScript files):

In `some.js`:

```JS
  import VueNotifications from 'vue-notifications'
  VueNotifications.error({message: 'Some Error'})
```
#### Overriding config.

Even if you have specify config, you can ovverride it in any call simple by sending config object: `this.showLoginError({type: 'warn'})`. i.e.:

```JS
 notifications: {
      showLoginError: {
        message: 'Failed to authenticate',
        type: 'error'
      }
    }

this.showLoginError() //error message
this.showLoginError({type: 'warn'}) //info message

//Also you can send here whatever params. All would be passed down to `mini-toastr` or any other lib.
Keep in mind that configs merging by `Object.assign` (no deep copying).
```

## Options

**VueNotification** can work fine with any of your custom options, but by default it would be:

| Name  | Type |  Default |  Description |
|---|---|---|---|
| `title`  | `String`  | `undefined`  |  Notification's title |
| `message`  | `String`  |  `undefined` | Notification's body message. Normally should be set up;  |
| `timeout`  | `Number`  |  `3000` |  time before notifications gone |
| `cb`  |  `Function` | `undefined` |  Callback function; |

#### How to add custom field?

Simple: `this.showLoginError({consoleMessage: 'let it be in console'})`. You've passed a custom config here (`{consoleMessage: 'let it be in console'}`) that will be merged with config from `notifications.showLoginError` and with `global config` via `Object.assign` (beware of shallow copy).

As other option, you can specify as much custom fields as you want in `notifications` section:

```JS
      //...
    notifications: {
      showLoginError: {
        message: 'Failed to authenticate',
        type: 'error', //Also you can use VueNotifications.types.error instead of 'error'
        consoleMessage: 'let it be in console',
        consoleMessage2: 'let it be in console too',
        //etc
      }
    }
      //...
```

And do whatever you want after that:

```JS
function toast ({title, message, type, timeout, cb, consoleMessage}) {
  if (consoleMessage) console[type](consoleMessage) //Here we go!
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)
```

## Browser support.
All modern browsers (`ES5` support require). See [ECMAScript 5 compliant browsers][3].
You can use `ES5` or `ES6` versions as well.

## License

MIT License

Copyright (c) 2016 Sergei Panfilov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[1]: https://github.com/se-panfilov/vue-notifications/releases
[2]: https://github.com/se-panfilov/mini-toastr
[3]: http://caniuse.com/#feat=es5
