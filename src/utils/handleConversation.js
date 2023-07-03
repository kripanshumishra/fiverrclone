import makeRequest from "./makeRequest";

const handleConversation = async ( buyer , seller , navigate   ) =>{
  // console.log( buyer , seller )
    if ( !seller || !buyer || !navigate ) return 
    const id = seller + buyer ;
   try {

     const req = await makeRequest.get( `/conversations/${id}` );
     const data = req.data ;
     navigate( `/message/${id}` ) ;
   } catch (error) {
      if( error?.response.status === 404  ){
       const newconversation = await makeRequest.post ( '/conversations/' , {
         to : to,
       } );
       const newconversationdata = newconversation.data;
       navigate( `/message/${newconversationdata.id}` )
      }
     else console.log( "handleConversation()" , error );
   }
 }

export default handleConversation