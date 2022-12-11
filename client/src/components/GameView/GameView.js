import React, { Fragment, useState } from 'react'
import NoView from '../NoView/NoView'
import GameTable from '../GameTable/GameTable'
import './style.css'

export default (props) => {
    return (
        <Fragment>
            <div style={{textAlign : 'center'}} className='container'>
                {props.game_arr.length !== 0 ? <GameTable game_arr={props.game_arr.list}/>: <NoView />}
            </div>
        </Fragment>
    )
}