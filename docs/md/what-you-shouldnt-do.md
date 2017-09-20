# What you should't do

As I told you in [Usage](/usage.md) section - there is no difference between methods defined in `notifications: {...}` section and methods defined in `methods: {...}`section.

That's also mean you can't have two methods with same names in those sections, cause they will overlaps.

So, **BAD**:

```js
export default {
    name: 'DemoView',
    data () {
      //...
    },
    methods: {
      showLoginError () { //Same name!!!
       //...
      }
    },
    notifications: {
      showLoginError: { //Same name!!!
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error' 
      }
    }
  }
```

**GOOD**:

```js
export default {
    name: 'DemoView',
    data () {
      //...
    },
    methods: {
      loginError () {
       //... this.showLoginError() // or whatever
      }
    },
    notifications: {
      showLoginError: {
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error'
      }
    }
  }
```



