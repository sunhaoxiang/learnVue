// function cb (val) {
//   // 渲染视图
//   console.log("视图更新啦～")
// }

// 响应式实现
function defineReactive (obj, key, val) {
  // 一个Dep类对象
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    enumerable: true, // 属性可枚举
    configurable: true, // 属性可被修改或删除
    get: function reactiveGetter () {
      // 将Dep.target（即当前的Watcher对象存入dep的subs中）
      dep.addSub(Dep.target)
      return val         
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return
      dep.notify()
    }
  })
}

// Vue订阅数据的方法
function observer (value) {
  if (!value || (typeof value !== 'object')) {
    return
  }
  
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key])
  })
}

// 订阅者，用来存放 Watcher 观察者对象
class Dep {
  constructor () {
    // 用来存放Watcher对象的数组
    this.subs = []
  }

  // 在subs中添加一个Watcher对象
  addSub (sub) {
    this.subs.push(sub)
  }

  // 通知所有Watcher对象更新视图
  notify () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

// 观察者
class Watcher {
  constructor () {
    // 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到
    Dep.target = this
  }

  // 更新视图的方法
  update () {
    console.log('视图更新啦～')
  }
}

Dep.target = null

class Vue {
  // Vue构造类
  constructor(options) {
    this._data = options.data
    observer(this._data)
    new Watcher()
    console.log('render~', this._data.test)
  }
}

// 测试
let o = new Vue({
  data: {
    test: "I am test."
  }
})
setTimeout(() => {
  o._data.test = "Hello World."  // 视图更新啦～
}, 3000);
