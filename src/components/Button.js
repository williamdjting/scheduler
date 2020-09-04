import React from "react";

import "components/Button.scss";

let classNames = require('classnames');

export default function Button(props) {
  //render button component
   const buttonClass = classNames({
   "button": true,
   "button--confirm": props.confirm,
   "button--danger": props.danger
   });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }

