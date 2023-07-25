import axios from "axios";
let baseURL ;
    if(import.meta.env.MODE === "development"){
        baseURL = "http://localhost:8800/api"
        // baseURL = `${import.meta.env.VITE_PRODUCTION_SERVER}/api`
    }
    else{
        //use .env variables
        baseURL = `${import.meta.env.VITE_PRODUCTION_SERVER}/api`
      }

const makeRequest = axios.create( {
    baseURL: baseURL, 
    withCredentials:true,
    mode:"cors"
} )

export default makeRequest ;