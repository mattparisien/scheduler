import React from "react";

import "components/Button.scss";

export default function Button(props) {
   return (
      <button className={props.confirm ? 'button button--confirm' : 'button'}>
         {props.children}
      </button>
   )
}
