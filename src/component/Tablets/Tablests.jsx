import "./Tablets.css";
export default function Tablests({ tablets_arr , onClickHandler}) {
  return (
    <div className="tablets-container">
        
        {
            tablets_arr.map( ( t ,  ind  )=>{
                return <div key={ind} className="tab-wrapper">
                    <button onClick={()=>{
                      onClickHandler( t )
                    }} type="button" aria-label="remove the tab" className="tablet-btn" >X</button>
                    <span className="tablet-tab" >
                    {t}
                </span>
                    
                     </div>

            })
        }
    </div>
  )
}
