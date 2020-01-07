import React, { useState, useEffect, createRef } from 'react'
import './styles.css'

let previousHeight = 0
let totalHeight = 0

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

function Sticky({ children, offsetTop = null, currentTopValue = 0, stackWithPrevious = true }) {
    const [stickyRef] = useState(createRef())
    function handleScrollOnPage({ positionTop = 0, offsetTop = 0 }) {
        const comp = stickyRef.current
        const width = comp.offsetWidth
        if (window.pageYOffset >= offsetTop - positionTop) {
            comp.classList.add('sticky')
            comp.style.width = `${width}px`
            comp.style.top = `${positionTop}px`
        } else {
            comp.classList.remove('sticky')
        }
    }

    useEffect(() => {
        if (stickyRef.current.offsetHeight) {
            let t = throttle(handleScrollOnPage, 200, {
                positionTop: currentTopValue
                    ? currentTopValue
                    : stackWithPrevious
                    ? totalHeight
                    : totalHeight - previousHeight,
                offsetTop: offsetTop || stickyRef.current.offsetTop
            })
            window.addEventListener('scroll', t)
            previousHeight = stickyRef.current.offsetHeight
            totalHeight += previousHeight
            return () => {
                window.removeEventListener('scroll', t)
                totalHeight -= previousHeight
            }
        }
    }, [])
    return (
        <div ref={stickyRef} class="stickyParent">
            {children}
        </div>
    )
}

export default Sticky
