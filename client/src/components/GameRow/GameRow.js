import React from 'react'
import './style.css'

export default (props) => {


    return (
        <tr>
            <th>{props.game.title}</th>
            <th>{props.game.genre}</th>
            <th>{props.game.short_description}</th>
            <th>{props.game.game_url}</th>
        </tr>
    )
}