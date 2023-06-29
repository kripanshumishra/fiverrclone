import {  useContext, useEffect, useState } from "react";
import "./Messages.css" ;
import makeRequest from "../../utils/makeRequest";
import { authContext } from "../../context/authProvider/authProvider";
import moment from "moment/moment";
import { Link } from "react-router-dom";

export default function Messages() {
  const userData = useContext(authContext).authData;
  const [ tablecontent , setTableContent ] = useState( [
  ] )

  const tableHeader = ["Buyer" , "Last Message" , "Date" ];

 
  const keywordTransformer = ( keyword )=>{
    
    const mapping = { 
      "Buyer" : "buyerName" ,
      "Date" : "updatedAt" ,
      "Seller" : "sellerName", 
      "Last Message" :"lastMessage"
     }
     if ( keyword in mapping ){
      return mapping[keyword]
     }
     return keyword
  };
  const valueTransformer = ( val )=>{
    if ( val && val.length > 22 ) return val.slice( 0, 22 ) + "..."
    return val 
  }

  const getConversations = async (  ) =>{
    try {
      const conversations = await makeRequest.get( "/conversations"  );
      return conversations.data
    } catch (error) {
      return Promise.reject( error )
    }
  }

  useEffect(() => {
    let isMounted = true ;
    console.log( ( userData && userData?.isSeller ) )
    if ( userData ){
      getConversations(  )
    .then ( 
      res=>{
        if( isMounted ){
          const isSeller = ( userData && userData?.isSeller );
        for ( let i = 0 ; i< res.length ; i++ ){
          if ( isSeller && !res[i].readBySeller) res[i]["toBeRead"] = true;
          else if ( !isSeller && !res[i].readByBuyer ) res[i]["toBeRead"] = true;
          res[i]["updatedAt"] = moment(res[i]["updatedAt"]).fromNow();
          res[i]['sellerName'] = res[i]["seller"]?.username ;
          res[i]['buyerName'] = res[i]["buyer"]?.username ;
        }
        setTableContent( res )}
      }
     )
     .catch( err=>{
      console.log( "Messages " , err );
      
     } );
    }
  
    return () => {
    }
  }, [( userData && userData?.isSeller )])
  
  return (
    <div className="container">
      <div className="inline-spacing">
        <div className="messages-header">
          <header>
            <h2>Conversations</h2>
          </header>
        </div>

        <div className="messages-table__wrapper">
          <table className="messages-table">
            <caption className="visually-hidden">
              Table of the conversations made by you
            </caption>
            <thead role="rowgroup">
              <tr role="row">
                {tableHeader.map((head, index) => {
                  return <th key={index}>{head}</th>;
                })}
              </tr>
            </thead>

            <tbody role="rowgroup">
              {tablecontent.map((item, i) => {
                return (
                  <tr className={`${item["toBeRead"] && item["toBeRead"] ? "message-active" :""}`} role="row" key={i + 1000}>
                    {tableHeader.map((keyw, ind) => {
                      let keyword = keywordTransformer( keyw )
                      if ((keyword !== "action") )
                        return (
                          <td role="cell" data-cell={keyw} key={ind}>
                            
                              { 
                               ( keyword === "buyerName" || keyword ==="sellerName" )
                                ?
                                <Link to={`/message/${item.id}`}>
                                  {valueTransformer( item[keyword] )}
                                </Link>
                                :
                                valueTransformer( item[keyword] )

                               }
                            
                            
                          </td>
                        );
                      // if action check wheather there is action to perform or not 
                      // else{
                      //   if ( item[keyword]  ){
                      //     return (
                      //       <td role="cell" data-cell={keyw} key={ind}>
                      //         <button style={{maxWidth:"13em"}} className="btn btn-dark" aria-label="delete the gig">
                      //           {item[keyword]}
                      //         </button>
                      //       </td>
                      //     );
                      //   }
                      // }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
