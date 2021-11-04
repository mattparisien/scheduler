import React from "react";

import "components/Button.scss";

export default function Button(props) {
   return (
      <button class={props.confirm ? 'button--confirm' : ''}>
         {props.children}
      </button>
   )
}
