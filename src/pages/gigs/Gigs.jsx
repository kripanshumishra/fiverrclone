import "./Gigs.css"
import { gigsdata } from "../../../data/data"
import GigCard from "../../component/gigcard/GigCard"
import makeRequest from "../../utils/makeRequest"
import { useEffect, useState } from "react"

export default function Gigs() {
  const [ gigs , setGigs ] = useState( [] )
  const handleGigs = async ()=>{
    try {
      const res = await makeRequest.get( "/gigs/" )
      setGigs( res.data )
      
    } catch (error) {
      console.log( "handleGigs()" , error );
    }

  };
  useEffect( () => {
       handleGigs()
      return ()=>{

      }
  }, [])
  
  return (
    <section className="container inline-spacing">
      <header>
        <h2>AI Artists</h2>
        <p>Explore the boundaries of art and technology with fiverr</p>
      </header>
      <div>
        place for the filters of the page
      </div>
      <div className="gigs-wrapper">
        {
          gigs.map( ( gig , ind ) => {
            return <GigCard key={ind} gig = {{...gig }} />
          } )
        }
      </div>

    </section>
  )
}
