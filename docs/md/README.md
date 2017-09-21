# Introduction and WTF is it?

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

