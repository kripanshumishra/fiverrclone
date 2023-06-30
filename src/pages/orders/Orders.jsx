import {  useContext, useEffect, useState } from "react";
import "./Orders.css" ;
import makeRequest from "../../utils/makeRequest";
import { authContext } from "../../context/authProvider/authProvider";
import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const userData = useContext(authContext).authData;
  const [ tablecontent , setTableContent ] = useState( [
  ] )
  const navigate = useNavigate(  )
  const tableHeader = [  "Image" , "Title" , "Price" , "Contact" ] ;  

 
  const keywordTransformer = ( keyword )=>{
    
    const mapping = { 
      "Image" : "img" ,
      "Title" : "title" ,
      "Price" : "price", 
      "Contact" :"contact"
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

  const getOrders = async (  ) =>{
    try {
      const orders = await makeRequest.get( "/orders"  );
      return orders.data
    } catch (error) {
      return Promise.reject( error )
    }
  }

  const handleConversation = async ( seller , buyer  ) =>{
    
    // conversation id format seller id + buyer id 

     const id = seller + buyer ;
    try {

      const req = await makeRequest.get( `/conversations/${id}` );
      const data = req.data ;
      navigate( `/message/${id}` ) ;
    } catch (error) {
       if( error?.response.status === 404  ){
        const newconversation = await makeRequest.post ( '/conversations/' , {
          sellerId : seller , 
          buyerId : buyer
        } );
        const newconversationdata = newconversation.data;
        navigate( `/message/${newconversationdata.id}` )
       }
      else console.log( "handleConversation()" , error );
    }
  }

  useEffect(() => {
    let isMounted = true ;
    if ( userData ){
      getOrders(  )
    .then ( 
      res=>{
        if( isMounted ){
          console.log( res , "res" )
        setTableContent( res )}
      }
     )
     .catch( err=>{
      console.log( "Messages " , err );
      
     } );
    }
  
    return () => {
    }
  }, [])
  
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
                      if ((keyword !== "img" && keyword !=="contact") )
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
                      else if ( keyword == "img" ){
                        return <td role="cell" data-cell={keyw} key={ind}>
                              <img src={`${item[keyword]}`} alt="image of the gig cover" />
                            </td>
                        
                      }
                      else if ( keyword === "contact" ){
                          return (
                            <td role="cell" data-cell={keyw} key={ind}>
                              <button onClick={(e)=>{
                                handleConversation( item.seller , item.buyer  )
                              }} style={{maxWidth:"13em"}} className="btn btn-dark" aria-label="delete the gig">
                                contact
                              </button>
                            </td>
                          );
                        
                      }
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
