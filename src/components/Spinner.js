import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className="container">
        <div className="spinner d-flex justify-content-center" >
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      // <div className='text-center'>
      //   <img src={loader} alt='loading' />
      // </div>
    )
  }
}

export default Spinner