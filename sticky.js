import React, { useState, useEffect, createRef } from 'react'
import './styles.css'

function throttle(callback, delay) {
    let flag = true
    return () => {
        if (flag) {
            flag = false
            setTimeout(() => {
                callback()
                flag = true
            }, delay)
        }
    }
}

// let flag = true
function Sticky({ children, offsetTop }) {
    const [stickyRef] = useState(createRef())
    function handleScrollOnPage() {
        const comp = stickyRef.current
        const width = comp.offsetWidth
        if (window.pageYOffset >= offsetTop) {
            comp.classList.add('sticky')
            comp.style.width = `${width}px`
        } else {
            comp.classList.remove('sticky')
        }
    }

    useEffect(() => {
        let t = throttle(handleScrollOnPage, 200)
        window.addEventListener('scroll', t)
        return () => window.removeEventListener('scroll', t)
    }, [])
    return (
        <div ref={stickyRef} class="stickyParent">
            {children}
        </div>
    )
}

export default Sticky
