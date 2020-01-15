import React, { useState, useEffect, createRef } from 'react'
import './styles.css'

let totalHeight = 0
let index = 0
let offsetArray = []
let heightArray = []

export function throttle(callback, delay, options = {}) {
    let flag = true
    return () => {
        if (flag) {
            flag = false
            setTimeout(() => {
                callback(options)
                flag = true
            }, delay)
        }
    }
}

function Sticky({
    children,
    spaceTop,
    spaceBottom,
    offsetTop = null,
    currentTopValue = 0,
    stackWithPrevious = true,
    throttleInMS = 50
}) {
    const [stickyRef] = useState(createRef())
    function handleScrollOnPage({ positionTop = 0, offsetTop = null, spaceTop = 0, spaceBottom = 0, index }) {
        const comp = stickyRef.current
        const width = comp.offsetWidth
        if (!offsetArray[index]) {
            offsetArray.push(
                offsetTop ||
                    comp.offsetTop -
                        spaceTop -
                        (heightArray.length > 0 ? heightArray.reduce((total = 0, num) => total + num) : 0)
            )
            heightArray.push(comp.offsetHeight)
        }
        let mtset = false
        if (window.pageYOffset >= offsetArray[index]) {
            comp.classList.add('sticky')
            comp.style.width = `${width}px`
            comp.style.paddingTop = `${spaceTop}px`
            comp.style.top = `${positionTop + offsetTop}px`
            comp.style.paddingBottom = `${spaceBottom}px`
            if (!mtset) {
                comp.nextElementSibling.style.marginTop = `${heightArray[index]}px`
                mtset = true
            }
        } else {
            comp.classList.remove('sticky')
            mtset = false
            comp.nextElementSibling.style.marginTop = '0px'
        }
    }

    useEffect(() => {
        if (stickyRef.current.offsetHeight) {
            let ind = index
            let t = throttle(handleScrollOnPage, throttleInMS, {
                positionTop: currentTopValue
                    ? currentTopValue
                    : stackWithPrevious
                    ? totalHeight
                    : totalHeight - (heightArray.length > 0 ? heightArray.reduce((total = 0, num) => total + num) : 0),
                offsetTop: offsetTop,
                spaceTop: spaceTop,
                spaceBottom: spaceBottom,
                index: ind
            })
            window.addEventListener('scroll', t)
            let previousHeight = stickyRef.current.offsetHeight
            totalHeight += previousHeight
            index += 1
            return () => {
                index = 0
                window.removeEventListener('scroll', t)
                offsetArray = []
                heightArray = []
                totalHeight -= previousHeight
            }
        }
    }, [])
    return (
        <div ref={stickyRef} className="stickyParent">
            {children}
        </div>
    )
}

export default Sticky
