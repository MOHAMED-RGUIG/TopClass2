import React from 'react'

function Error({error}) {
  return (
    <div>
        <div className="alert alert-danger col-12 col-md-12" role="alert" style={{width:'380px',margin:'0 auto'}}>
            {error}
        </div>
    </div>
  )
}

export default Error