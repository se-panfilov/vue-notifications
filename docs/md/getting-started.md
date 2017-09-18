# Getting Started

Right after [installation](/installation.md), please include `vue-notifications` lib into your project as following:

```js
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications, options)
```

> **Attention**: By default `vue-notification` sends all messages **to console**. Just because `vue-notification` is a kind of bridge between your app and actual UI notification library. For example you can use [mini-toastr](https://github.com/se-panfilov/mini-toastr) \(`npm i mini-toastr --save`\) as such UI library. Or any other if you want.
>
> That's the core idea - to have single notification interface but keep an ability to replace UI lib without change tons of code

## Setup and configuration \(necessary\)

As I said above - you have to use UI library that would draw actual notifications for you.

For this example I will use [mini-toastr](https://github.com/se-panfilov/mini-toastr)

#### Step-by-step guide

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

#### All together

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



