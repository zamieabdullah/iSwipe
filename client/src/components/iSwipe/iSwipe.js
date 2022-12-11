import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import './style.css';

export default (props) => {
    window.saveDataAcrossSessions = true
    
    const webgazer = window.webgazer
    const left_side = window.innerWidth / 4
    const right_side = window.innerWidth - window.innerWidth / 4
    const offset = 500 // half a second
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let start = Number.POSITIVE_INFINITY
    let direction = null
    let current_val = getRandomInt(props.game_arr.length)
    let next_val = getRandomInt(props.game_arr.length)
    let image = newImage(false, current_val)
    let nextImage = newImage(true, next_val)

    
    const addGame = async (game) => {
        try {
            // console.log(props.game_arr[game])
            const resp = await Axios({
                method : 'POST',
                url : 'api/iswipe/addGame',
                params: {
                    game_id: props.game_arr[game].id,
                }
            });
        } catch (e) {
            
        }
    }

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
                addGame(current_val)
            }
        
            start = Number.POSITIVE_INFINITY
            direction = "stop"
            setTimeout(() => {
                image.remove()
                nextImage.classList.remove("next")
                current_val = next_val
                image = nextImage
                next_val = getRandomInt(props.game_arr.length)
                nextImage = newImage(true, next_val)
                direction = "reset"
            }, 200)
        }
    })
    .begin()

    function newImage(next = false, val) {
        const img = document.createElement("img")
        img.src = props.game_arr[val].thumbnail
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