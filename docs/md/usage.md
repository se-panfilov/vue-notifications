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

