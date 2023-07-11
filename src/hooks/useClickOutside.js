import { useEffect } from "react";

export default function useClickOutside(  ref , callback  ) {
    // console.log( ref , callback )
  const handlclick = ( e )=>{
    if ( ref && ref.current && ! ref.current.contains( e.target ) ){
        console.log( "ref " , ref.current )
        callback();
    };
  }
  useEffect( ()=>{
    window.addEventListener( "click" , handlclick );
    console.log( "ref changed" )
    return ()=>{
        console.log( "removing" )
        window.removeEventListener( "click" , handlclick );
    }
  }, [] )
}
