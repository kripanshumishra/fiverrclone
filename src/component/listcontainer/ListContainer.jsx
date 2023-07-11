import React, { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

export default function ListContainer({ children, handleClickOutside } ) {
  const contref = useRef();
//   console.log( children , handleClickOutside )
  useClickOutside(contref, handleClickOutside);

  return <div ref={contref}>{children}</div>;
}
