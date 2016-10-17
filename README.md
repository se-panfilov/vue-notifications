# vue-notifications

**VueNotifications** - agnostic non-blocking notifications library, that allow you to use notifications in declaration style.

----

##Instalation

via npm:

```shell
npm i vue-notifications --save
```

via bower:

```shell
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

##Usage

***Attention**: By default VueNotification send all messages to console. To activate non-blocking notifiction you've got to use third-party library, like toasr. I suggest you to use [mini-toastr][2] (`npm i mini-toastr --save`)

```JS
import VueNotifications from 'vue-notifications'

//Here we setup messages output to `mini-toastr`
function toast ({title, message, type, timeout, cb, debugMsg}) {
  if (debugMsg) console[type](debugMsg)
  return miniToastr[type](message, title, timeout, cb)
}

//Binding for methods .success(), .error() and etc. You can specify and map your own methods here
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

```


[1]: https://github.com/se-panfilov/vue-notifications/releases
[2]: https://github.com/se-panfilov/mini-toastr
