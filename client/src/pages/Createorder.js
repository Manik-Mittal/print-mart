import Layout from '../Layout/Layout'
import React from 'react'
//import '/Users/manikmittal/Documents/Printing-Mart/client/src/App.css'

const Createorder = () => {
  return (
    <Layout>
      <div className="row container" style={{ marginTop: '5vh', display: 'flex' }}>
        <h1 className="text-center">Product Details</h1>
        <div className="col-md-6">

        </div>

        <div className="user-info">

          <div className="field">
            <div className="key">Name:</div>

            <div className="key">Description</div>
            <div className="key">Price</div>
          </div>

        </div>
        <div className="below">
          <button class="btn btn-danger add">SEND QUOTATION</button>

        </div>
      </div>


    </Layout>
  )
}

export default Createorder