触摸事件，有touchstart touchmove touchend touchcancel。

触发时机：
touchstart：手指触摸到屏幕会触发
touchmove：当手指在屏幕上移动时，会触发
touchend：当手指离开屏幕时，会触发
touchcancel：可由系统进行的触发，比如系统中其他打断了touch的行为，则可以触发该事件

属性有：
changedTouches：保存了所有引发事件的手指信息
targetTouches：保存了当前所触碰屏幕的手指信息
touches：保存了当前所有触碰屏幕的手指信息
target: 触发的元素
currentTarget: 现在的元素，如果是事件代理，则该元素与 target 不一样
