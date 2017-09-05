import React, { Component } from 'react'
import "../../stylesheet/component/common/_button_primary.scss"

export function ButtonPrimary(props){
    return(
        <button
        className="button-primary"
        type="submit">
            {props.name}
        </button>
    )
}


