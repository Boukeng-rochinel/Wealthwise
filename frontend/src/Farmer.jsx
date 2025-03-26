import React from 'react'

function Farmer(props) {

    let onHisFarm = [];
    if (props.animals){
        onHisFarm = props.animals.map((animal, index) => 
            <p key={index}>{animal}</p>
       );
    }
  return (
    <>
    <div>
    fdgdf
    <p>{props.farmerName}</p>
    {onHisFarm}
  </div>
</>
  )
}

export default Farmer