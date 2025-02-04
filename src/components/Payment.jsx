import React from 'react'

function Payment() {
  return (
    <>
    <button className='btn btn-success p-2 ms-2'>Buy Course</button>
    <p>Price: 4999rs</p>
    <p>Final Price:3999rs</p>
    <div style={{ display: 'flex', alignItems: 'center' }}>
  <input type="text" className="form-control" placeholder="coupon code" />
  <button className="btn btn-success ms-3">Apply code</button>
</div>

    </>
  )
}

export default Payment