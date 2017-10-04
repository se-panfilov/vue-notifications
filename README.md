[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a6dee4e21d04653b53c0a9618a2cc84)](https://www.codacy.com/app/se-panfilov/vue-notifications?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=se-panfilov/vue-notifications&amp;utm_campaign=Badge_Grade)
[![bitHound Overall Score](https://www.bithound.io/github/se-panfilov/vue-notifications/badges/score.svg)](https://www.bithound.io/github/se-panfilov/vue-notifications) [![bitHound Code](https://www.bithound.io/github/se-panfilov/vue-notifications/badges/code.svg)](https://www.bithound.io/github/se-panfilov/vue-notifications)
[![Code Climate](https://codeclimate.com/github/se-panfilov/vue-notifications/badges/gpa.svg)](https://codeclimate.com/github/se-panfilov/vue-notifications)
[![Build Status](https://travis-ci.org/se-panfilov/vue-notifications.svg?branch=master)](https://travis-ci.org/se-panfilov/vue-notifications)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/se-panfilov/vue-notifications/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/vue-notifications.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-notifications/)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

| [SITE](https://se-panfilov.github.io/vue-notifications/) | [DOCS](https://se-panfilov.github.io/vue-notifications/docs/html/index.html) | [EXAMPLES](https://se-panfilov.github.io/vue-notifications/examples) | [GITHUB](https://github.com/se-panfilov/vue-notifications) | [LICENSE](https://github.com/se-panfilov/vue-notifications/blob/master/LICENSE) |

# vue-notifications

**VueNotifications** - agnostic library for non-blocking notifications.

----

## Introduction and WTF is it?

`vue-notifications` is "Vue.js agnostic non-blocking notifications library"... and it's a lie \)\) Seriously.

`vue-notifications`it's basically **a bridge** between your actual app and UI-notfications libs, like [mini-toastr](https://github.com/se-panfilov/mini-toastr).

### Why do we need this?

Because we want to have a way to show notifications and a way to easy replace UI library that show them without rewrite the code.

### What `vue-notifications` actually do?

It's allow you to declare your notifications in blocks like this one:

```js
export default {
    name: 'DemoView',
    data () {
      //...
    },
    methods: {
      //...
    },
    notifications: {
      showLoginError: { // You can have any name you want instead of 'showLoginError'
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
      }
    }
  }
```

And then call it via `this`: `this.showLoginError()`, and also with some override props: `this.showLoginError({message: 'whatever'})`.

### Why do we need third-party UI lib \(like [mini-toastr](https://github.com/se-panfilov/mini-toastr)\)?

Well, because we want to be agnostic.
That's mean that if at some step you would be fucked up with your UI library, `vue-notifications` will allow you to replace it as much easy as possible. Basically you would be required to replace `vue-notifications`'s config. And that's all.



## Installation

Check the Docs: [Installation](https://se-panfilov.github.io/vue-notifications/docs/html/installation.html)

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

## Getting started

Check the Docs: [Getting started](https://se-panfilov.github.io/vue-notifications/docs/html/getting-started.html)

```JS
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications, options)
```

### Setup and configuration \(necessary\)

As I said above - you have to use UI library that would draw actual notifications for you.

For this example I will use [mini-toastr](https://github.com/se-panfilov/mini-toastr)

##### Step-by-step guide

Let's do everything together

> If you don't want spend too much time with this shit - you can go ahead and copy-past whole code from the bottom of this page

Anyway

* Import `vue-notifications`

Here we're including `vue-notifications` and  `mini-toaster` in our project

```js
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
```

P.S. don't forget to install `mini-toaste` \(`npm i mini-toastr --save`\)

* Setup types of the messages

This one is mostly related to `mini-toastr`. We basically want `mini-toastr` to have these 4 types of messages. Basically 'error' should be red and success - 'green'

```js
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}
```

* Activate `mini-toastr`

Here we make `mini-toasr` initialization with types from above

```js
miniToastr.init({types: toastTypes})
```

* Map `vue-notification` to `mini-toastr`

We want our messages to be called via `vue-notification`but be shown by `mini-toastr`, So :

```js
function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
```

This stuff will forward our messages, so in case of 'success', it will call `miniToastr.success(message, title, timeout, cb)`, in case of 'error' it will call `miniToastr.error(message, title, timeout, cb)` and etc. Keep in mind that the types\(like "success", "error" and etc\) could be whatever you want. In this example we just use default stuff for both libs.

* Activate the plugin

Okay, now we have to pass our `options` into the plugin. Actually `vue-notification` has auto-install, but we want to pass options from above to it, so that's the case why do we do this manually

```js
Vue.use(VueNotifications, options)
```

##### All together

You can just copy-paste code below

```js
import VueNotifications from 'vue-notifications'

// Include mini-toaster (or any other UI-notification library)
import miniToastr from 'mini-toastr'

// We shall setup types of the messages. ('error' type - red and 'success' - green in mini-toastr)
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

// This step requires only for mini-toastr, just an initialization
miniToastr.init({types: toastTypes})

// Here we are seting up messages output to `mini-toastr`
// This mean that in case of 'success' message we will call miniToastr.success(message, title, timeout, cb)
// In case of 'error' we will call miniToastr.error(message, title, timeout, cb)
// and etc.
function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

// Here we map vue-notifications method to function abowe (to mini-toastr)
// By default vue-notifications can have 4 methods: 'success', 'error', 'info' and 'warn'
// But you can specify whatever methods you want.
// If you won't specify some method here, output would be sent to the browser's console
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

// Activate plugin
// VueNotifications have auto install but if we want to specify options we've got to do it manually.
Vue.use(VueNotifications, options)
```

## Usage

Check the Docs: [Usage](https://se-panfilov.github.io/vue-notifications/docs/html/usage.html)

# Usage

```js
export default {
    name: 'DemoView',
    data () {
      //...
    },
    methods: {
      //...
    },
    notifications: {
      showLoginError: { // You can have any name you want instead of 'showLoginError'
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
      }
    }
  }
```

Now you can call `showLoginError` as a common method via this:

```js
this.showLoginError()
```

> **PRO tip**: Technically there is no difference between methods defined in `notifications: {...}` section and in `methods: {...}` section - they are all the same. So that's basically mean that** you shall not define methods with same name in those sections**, because they would overlap each other.

So, now you can do something like that:

```js
methods: {
  login () {
    loginUtil.login(err => if (err) this.showLoginError())
  }
}
```

But wait. What if I want to show some custom message in example above?

Well, in this case you can override `showLoginError()` method:

```js
this.showLoginError({message: err.message})
```

In the same way you can override all the others properties

```js
this.showLoginError({title: 'my title', message: 'just an error', type: 'warn', timeout: 1000})
```

### Options to override

As I said above, you can specify any of following properties

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| title | String | undefined | Notification's title \(can be empty\) |
| messaeg | String | undefined | Notification's body message. Normally should be set up |
| timeout | Number | 3000 | time before notifications gone |
| cb | undefined | undefined | Callback function |

But actually you can add your own properties as well, if you want. Why and how? You can check it in [Advanced Setup](/advanced-setup.md) section.

## Browsers support.

Check the Docs: [Browsers support](https://se-panfilov.github.io/vue-notifications/docs/html/browsers-support.html)

All `ES5-compatable` browsers are supported \(i.g. starting from `IE11`\).
For more information, please chech [ECMAScript 5 compliant browsers](http://caniuse.com/#feat=es5)

If you don't give a fuck about browsers support, it would be better to use `ES6-version`

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
