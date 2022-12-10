import React, { Fragment } from 'react';
import Axios from 'axios';
import './style.css';

export default () => {
    window.saveDataAcrossSessions = true
    
    const webgazer = window.webgazer
    const left_side = window.innerWidth / 4
    const right_side = window.innerWidth - window.innerWidth / 4
    const offset = 500 // half a second
    
    let start = Number.POSITIVE_INFINITY
    let direction = null
    let image = newImage()
    let nextImage = newImage(true)
    
    webgazer
    .setGazeListener((data, time) => {
        if (data == null || direction === "stop") return
        
        if (
            data.x < left_side &&
            direction !== "left" && direction !== "reset"
        ) {
            start = time
            direction = "left"
        } else if (
            data.x > right_side &&
            direction !== "right" && direction !== "reset"
        ) {
            start = time
            direction = "right"
        } else if (data.x >= left_side && data.x <= right_side) {
            start = Number.POSITIVE_INFINITY
            direction = null
        }
        
        if (start + offset < time) {
            if (direction === "left") {
                image.classList.add("left")
            } else {
                image.classList.add("right")
            }
        
            start = Number.POSITIVE_INFINITY
            direction = "stop"
            setTimeout(() => {
                image.remove()
                nextImage.classList.remove("next")
                image = nextImage
                nextImage = newImage(true)
                direction = "reset"
            }, 200)
        }
    })
    .begin()
    
    function newImage(next = false) {
        const img = document.createElement("img")
        img.src = "https://picsum.photos/1000?" + Math.random()
        if (next) img.classList.add("next")
        document.body.append(img)
        return img
    }
    
    webgazer.showVideoPreview(false).showPredictionPoints(false)
    return (
        <Fragment>
        </Fragment>
    )
}