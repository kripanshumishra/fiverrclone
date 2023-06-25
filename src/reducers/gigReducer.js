const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    category: "",
    cover: "",
    images: [],
    desc: "",
    shortTitle: "this is short title",
    shortDesc: "this is short desc",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: 0,
};


const gigReducer = ( state , action ) =>{
    switch( action.type ){
        case "CHANGE_INPUT" :
            return { 
                ...state , 
                [action.payload.name] : action.payload.value
             };
        case "ADD_IMAGES":
            console.log( action.payload )
            const inter = [ ...state.images  ]
            for ( let i = 0 ; i< action.payload.images.length ;  i++ ) inter.push( action.payload.images[i] )
            return {
                ...state , 
                images: [...inter] , 
                cover : inter[0]
            };
        case "ADD_FEATURE":
            return {
                ...state , 
                features: [ ...state.features , action.payload ],
            };
        
        case "REMOVE_FEATURE":
            return {
                ...state , 
                features : state.features.filter( 
                    ( feature ) => feature !== action.payload
                 )
            };
        default :
            throw new Error("no such action allowed!")  
    }
}

const Actions  = {
    change_input : "CHANGE_INPUT" , 
    add_images : "ADD_IMAGES" , 
    add_feature : "ADD_FEATURE" , 
    remove_feature : "REMOVE_FEATURE" , 
}

const change_input = ( name , value  , dispach ) =>{
    dispach( { type: Actions.change_input ,  payload : { name : name , value : value } } )
}

const add_images = ( images , dispach )=>{
    dispach( {type: Actions.add_images , payload : { images }} )
}

const add_feature = ( feature , dispach ) =>{
    dispach( {type:Actions.add_feature , payload: feature} )
}

const remove_feature = ( feature , dispach ) =>{
    dispach( {type:Actions.remove_feature , payload : feature} )
}

export { change_input , add_feature , remove_feature , add_images , INITIAL_STATE , gigReducer } ; 