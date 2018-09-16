
1.
修改：将  i<= len  ，修改为 i< len;
原因：arr最多到 len-1,所以 arr[len] 为 undefined。

2.
修改：将 array = array.splice(i,1)，修改为 array.splice(i,1)
原因：splice 会修改原数据，而将删除的数组内容返回

3.
dom.click 修改为  dom.onclick
原因：click 事件的监听函数为 onclick ，不是 click

4.
修改：将倒数第七行的 var i = 0;修改为 let i =0;
原因：var 定义的变量没有块级作用域，而 let 定义的有。如果没有块级作用域，那么点击之后弹出的 array[i] 都会等于 array.length

5.
修改：将 var dom = '<li>' ... 这一行都删除，并修改为
var dom = document.createElement('li')
dom.innerText = array[i]
原因：创建元素的语句为 document.createElement

6.
修改：将 ul.append(dom),修改为 ul.appendChild(dom)