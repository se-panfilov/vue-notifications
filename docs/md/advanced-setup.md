# Advanced Setup

You could setup `vue-notificatio` a little bit more if you want

### Global configuration

`vue-notification` has some default values, such as `timeout` and `type`:

```js
config: {
  type: TYPE.info,
  timeout: 3000
}
```

You can override them via `config` object:

```
VueNotifications.config.timeout = 4000
VueNotifications.config.type = 'error'
```

You have to do it before `Vue.use(VueNotifications, options)` call.

### Your own property name

If for some reasons you aren't happy with \`notifications\`, then you can set your own word for this case:

```
VueNotifications.propertyName = 'messages'
```

You have to do it before `Vue.use(VueNotifications, options)` call.

And as a result you would be able to do:

```js
/...
messages: {
  errorMsg: {
    type: 'error',
    title: 'Error title',
    message: 'Some error msg'
},
//...
```

Instead of

```js
//...
notifications: {
  errorMsg: {
    type: 'error',
    title: 'Error title',
    message: 'Some error msg'
},
//...
```

### Adding custom field

Let's say we want to send our messages not only to UI lib \([mini-toastr](https://github.com/se-panfilov/mini-toastr)?\), but also to console.  
In this case we can add some custom field to our notifications:

```js
notifications: {
  showLoginError: {
    message: 'Failed to authenticate',
    type: 'error', 
    consoleMessage: 'let it be in console' // Our brand new field
  }
}
```

And here is our new mapping function from [Getting Started](/getting-started.md) section

```js
function toast ({title, message, type, timeout, cb, consoleMessage}) {
  if (consoleMessage) console[type](consoleMessage) //Here we go!
  return miniToastr[type](message, title, timeout, cb)
}
```

Don't forget to do:

```js
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)
```

After that

