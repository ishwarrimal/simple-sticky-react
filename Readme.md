This is a repo for the npm package of `simple-sticky-react` .   
We welcome anyone willing to contribute to this project with a new feature or report a but or suggest any changes.

Of course you can use `position: sticky` in your css, but it's not supported in few browsers. 
Hence we present to you `<Sticky>` component for react which works same as `sticky` but switches between `fixed` and `relative` position on the fly.

We present to you a simple sticky component for your react project.   
NOTE: We don't use any external library.  
It uses simple `window.onScroll` with `throttle` of `200ms` to not let window event burden your UI.  


Wrap the component you want to be sticky within `<Sticky>` component.

You can wrap not just one component but also list of components and `<Sticky>` will make the entire components as sticky.

### NOTE : If you want some of your nested components to hide when it becomes sticky, you can give a classname `hideFromSticky` to the component. Our sticky will ignore the component with this class

By default your first `<Sticky>` component will stick to the top of the screen and your second `<Sticky>` below it and so on.

```
import { Sticky } from 'simple-sticky-react'
<Sticky>
 <list of your compnents />
</Sticky>
```

Currently there are following options/props that you can pass while calling `<Sticky>`  
  
1.  offsetTop:  
The offset value of the element is the value at which the element gets fixed position when you scroll through. By default this value will be the `element.offsetTop` i.e the distance of the current element from the top of the page. You can specify your own value based on your requirement. 

2. currentTopValue:  
You can specify the top position you want your current sticky element to be at when it gets `fixed` position. By default for the first element its 0 and the following element will stick below the total height of the sticky elements.

3. stackWithPrevious:  
Sometiems we don't want our sticky element to be stacked below the total height of the sticky element for e.g when two element have `float` property and two element lies side by side. In this case we would pass `stackWithPrevious: false` for the second element. By default the value is true

4. throttleInMS:  
Since we use a global event listener to swithc between the `fixed` and `relative` property, we would want to limit the event listener to some specific time. Hence we use this property. By defalut it's 200 ms, that is after every 200 ms the event listener on scroll will be fired. You can give your own value based on your requirement.

5. spaceTop & spaceBottom:  
Pass a value when you want to provide some padding to the sticky.


### v1.0.8  
Problem: While creating new sticky, it was considering the height of the previous stikcy component even if its removed from the dom.
Fix: Clean up for stikcy once the element is removed from DOM.

### 1.1.0
Problem: There was a jerking effect while the position was set to fixed from its oriignal state.
Fix: added extra calculations for the same.
