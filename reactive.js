var vm = {}

var data = {
  name: 'zhangsan',
  age: 18
}

for (var key in data) {
  // 闭包，新建一个函数，保证key的独立的作用域
  (function (key) {
    Object.defineProperty(vm, key, {
      // 监听get可以提高性能，data中有许多属性，有的被用到，有的不被用到，被用到的会走get，不被用到的不走get，未走get的属性，set的时候我们也无需关心，避免不必要的重复渲染
      get: function () {
        console.log('get', data[key])
        return data[key]
      },
      set: function (newVal) {
        console.log('set', newVal)
        data[key] = newVal
      }
    })
  })(key)
}
