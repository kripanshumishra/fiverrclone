import { useState } from "react";
export default function useMultipageForm( totalPage ) {

    const [ currentPage , setCurrentPage ] = useState( 0 ) ;
    const next = ()=>{
        if ( currentPage+1 < totalPage ){
            setCurrentPage( pre => pre+1  );
        }
    }
    const previous = (  ) => {
        if ( currentPage - 1 >=0  ){
            setCurrentPage( pre => pre - 1  )
        }
    }

    const isLastPage = () =>{
        return currentPage === totalPage-1
    }

  return [
     currentPage+1 , totalPage , isLastPage , previous , next
  ]
}
