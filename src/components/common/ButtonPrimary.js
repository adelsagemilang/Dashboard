import React, { Component } from 'react'
import "../../stylesheet/component/common/_button.scss"

export function ButtonPrimary(props){
    return(
        <button
        className={props.class ? props.class : 'button-primary'}
        type="submit">
            {props.name}
        </button>
    )
}


