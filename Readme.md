Of course you can use `position: sticky` in your css, but it's not supported in few browsers. Hence we thought of developing a <Sticky> component for react which works same as `sticky` but switches between `fixed` and `relative` position on the fly.

We present to you a simple sticky component for your react project. 
NOTE: We don't use any external library.
It uses simple `window.onScroll` with `throttle` of `200ms` to not let window event burden your UI.


Wrap the component you want to be sticky within `<Sticky>` component.

You can wrap not just one component but also list of components and `<Sticky>` will make the entire components as sticky.

### NOTE : If you want some of your nested components to hide in sticky, you can give a classname `hideFromSticky` to the component. Our sticky will ignore the component with this class

By default your first `<Sticky>` component will be stuck to the top of the screen and your second `<Sticky>` below it and so on.

Currently there are following options/props that you can pass while calling `<Sticky>`  
  
1.  offsetTop:  
The offset value of the element is the value at which the element gets fixed position when you scroll through. By default this value will be the `element.offsetTop` i.e the distance of the current element from the top of the page. You can specify your own value based on your requirement. 

2. currentTopValue:  
You can specify the top position you want your current sticky element to be at when it gets `fixed` position. By default for the first element its 0 and the following element will stick below the total height of the sticky elements.

3. stackWithPrevious:  
Sometiems we don't want our sticky element to be stacked below the total height of the sticky element for e.g when two element have `float` property and two element lies side by side. In this case we would pass `stackWithPrevious: false` for the second element. By default the value is true

4. throttleInMS:  
Since we use a global event listener to swithc between the `fixed` and `relative` property, we would want to limit the event listener to some specific time. Hence we use this property. By defalut it's 200 ms, that is after every 200 ms the event listener on scroll will be fired. You can give your own value based on your requirement.
