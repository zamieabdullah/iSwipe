import React, { Fragment, useState } from "react"
import "./style.css"

export default (props) => {
    
    const handleClick = () => {
        props.toggle();
    }
    
    return (        
        <div className='modal-content'>
            <span className='close' onClick={handleClick}>
                &times;
            </span>
            <p>{props.message}</p>
        </div>
    )
}