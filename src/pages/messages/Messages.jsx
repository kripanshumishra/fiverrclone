import { useEffect , useState } from "react";
import "./Messages.css" ;

export default function Messages() {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
    img: "/img/star.png",
  };
  const [ tablecontent , setTableContent ] = useState( [
    {
      id : 1 , 
      Buyer : "Charley chaplen",
      lastmessage :  "Hey ! hows it going ? doing well, been a while since" , 
      date : "1 hour" , 
      action:"Mark as read"
    },
    {
      id : 1 , 
      Buyer : "Joker Gi",
      lastmessage :  "Hey ! hows it going ? doing well, been a while since" , 
      date : "1 hour" , 
    }
  ] )

  const tableHeader = ["Buyer" , "Last Message" , "Date" , "Action"];

 
  const keywordTransformer = ( keyword )=>{
    const mapping = { 
      "buyer" : "buyer" , 
      "Last Message" : "lastmessage" , 
      "Date" : "date" , 
      "Action" : "action",
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
                  <tr className={`${item["action"] && item["action"].length ? "message-active" :""}`} role="row" key={i + 1000}>
                    {tableHeader.map((keyw, ind) => {
                      let keyword = keywordTransformer( keyw )
                      if ((keyword !== "action") )
                        return (
                          <td role="cell" data-cell={keyw} key={ind}>
                            {
                              valueTransformer( item[keyword] )
                            }
                            
                          </td>
                        );
                      // if action check wheather there is action to perform or not 
                      else{
                        if ( item[keyword]  ){
                          return (
                            <td role="cell" data-cell={keyw} key={ind}>
                              <button style={{maxWidth:"13em"}} className="btn btn-dark" aria-label="delete the gig">
                                {item[keyword]}
                              </button>
                            </td>
                          );
                        }
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
