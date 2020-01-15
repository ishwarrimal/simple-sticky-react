import React, { useEffect, useRef } from 'react'
import './styles.css'

let totalHeight = 0
let stickyElements = {}
let index = 0

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
    const stickyRef = useRef(null)
    function handleScrollOnPage({
        positionTop = null,
        offsetTop = null,
        spaceTop = 0,
        spaceBottom = 0,
        stackWithPrevious,
        indexOfSticky
    }) {
        const comp = stickyRef.current
        const width = comp.offsetWidth
        if (!stickyElements[indexOfSticky]) {
            const stickyElem = {}
            stickyElem.offsetTop = offsetTop || comp.offsetTop - totalHeight
            stickyElem.positionTop = totalHeight
            stickyElem.height = comp.offsetHeight
            stickyElem.totalHeight = comp.offsetHeight + spaceTop + spaceBottom
            stickyElements[indexOfSticky] = stickyElem
            totalHeight += comp.offsetHeight + spaceTop + spaceBottom
        }
        let mtset = false
        if (window.pageYOffset >= stickyElements[indexOfSticky].offsetTop) {
            comp.classList.add('sticky')
            comp.style.width = `${width}px`
            comp.style.paddingTop = `${spaceTop}px`
            comp.style.top = `${stickyElements[indexOfSticky].positionTop}px`
            comp.style.paddingBottom = `${spaceBottom}px`
            if (!mtset) {
                comp.nextElementSibling.style.marginTop = `${stickyElements[indexOfSticky].height}px`
                mtset = true
            }
        } else {
            comp.classList.remove('sticky')
            mtset = false
            comp.nextElementSibling.style.marginTop = '0px'
        }
    }

    useEffect(() => {
        let indexOfSticky = index
        let t = throttle(handleScrollOnPage, throttleInMS, {
            positionTop: currentTopValue,
            stackWithPrevious,
            offsetTop: offsetTop,
            spaceTop: spaceTop,
            spaceBottom: spaceBottom,
            indexOfSticky
        })
        window.addEventListener('scroll', t)
        index += 1
        return () => {
            window.removeEventListener('scroll', t)
            let curSticky = stickyElements[indexOfSticky]
            totalHeight -= curSticky.totalHeight
            delete stickyElements[indexOfSticky]
        }
    }, [])
    return (
        <div ref={stickyRef} className="stickyParent">
            {children}
        </div>
    )
}

export default Sticky
