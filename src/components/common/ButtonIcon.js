import React, { Component } from 'react'
import '../../stylesheet/component/common/_button.scss'

export function ButtonIcon(props){
	return(
      <button className={props.class} type="button">
         <div className={props.icon}></div>
      </button>
	)
}