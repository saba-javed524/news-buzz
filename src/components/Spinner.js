import React from "react"

const Spinner = () => {
  return (
    <div className="spinner d-flex justify-content-center" >
      <div className="my-3 spinner-grow text-dark" role="status">
      </div>
    </div>
    // <div className='text-center'>
    //   <img src={loader} alt='loading' />
    // </div>
  )
}

export default Spinner