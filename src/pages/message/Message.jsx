import Profilepicture from "../../component/profiledisplay/Profilepicture";
import "./Message.css";
import makeRequest from "../../utils/makeRequest";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../context/authProvider/authProvider";

export default function Message() {
  const [msgs , setMsgs] = useState( [] )
  const authData = useContext( authContext ).authData;
  const formref = useRef()
  const { id  } = useParams()
  const getMessages = async ( id )=>{
    try {
      const messages = await makeRequest.get( `/messages/${id}` ) ;
      return messages.data;
    } catch (error) {
      return Promise.reject( error );
    }
  }

  const sendMessage = async( id  )=>{
    try {
      const data = { ... Object.fromEntries(  new FormData( formref.current ) ) };
      data["conversationId"] = id;
      let sentmsg = await makeRequest.post( "/messages/" , data ) ; 
      sentmsg = sentmsg.data;
      // console.log( sentmsg )
      setMsgs(pre =>[...pre , sentmsg]);
      // clearing all the input fields
      formref.current.reset();
    } catch (error) {
      console.log( "messages" , error );
    }
  }
  useEffect(() => {
    let isMounted = true;
    if ( authData ){
      getMessages( id  )
    .then( res=> {
      console.log( "res " , res  )
      if( isMounted ){
        console.log( res );
        setMsgs( res );
      }
    } )
    .catch( err =>{
      console.log( "Message" , err );
    } )
    }
    return () => {
      isMounted = false;
    };
  }, [(authData && authData?._id)])
  

  return (
    <div className="message-page-container">
      <div className="container" >
      <section className="message-page-wrapper ">
      <header className="message-page-header">
        <h2 className="inline-spacing"> Message Page </h2>
        <hr aria-hidden="true" />
      </header>
      <div className='text-display-area inline-spacing'>

        {
          msgs.map( ( msg , ind )=>{
            return (<div key={ind} className={`${ msg.user.toString() === authData._id ? "owner-container" :"" } msg-container`}>
            {/* <div aria-hidden="true" className='message-page-user-brand' >
              <Profilepicture userInitial={"K"} userPP={"/img/fun.jpg"} />
            </div> */}
            <div className='msg-display'>
              <p>{msg.desc}</p>
            </div>
          </div>)
          } )
        }

        
      </div>
      <div className="message-creation-area">
        <form onSubmit={ async (e)=>{
          e.preventDefault();
          await sendMessage( id )
        }} ref={formref} className="message-creation-form">
          <label className="visually-hidden" htmlFor="create-msg" > write the message </label>
          <textarea name="desc" placeholder="Enter your message..." required={true} aria-required={true} id="create-msg"></textarea>
          <button className="btn btn-primary">
            submit
          </button>
          
        </form>
      </div>
    </section>
    </div>
    </div>
  )
}
