import "./Gigs.css"
import { gigsdata } from "../../../data/data"
import GigCard from "../../component/gigcard/GigCard"

export default function Gigs() {
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
          gigsdata.map( ( gig , ind ) => {
            return <GigCard key={ind} gig = {{...gig }} />
          } )
        }
      </div>

    </section>
  )
}
