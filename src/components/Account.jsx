import React from 'react'
import { Link } from 'react-router-dom'

function Account() {
  return (
    <>
    <Link to={'/dashboard'}><button className='btn btn-success'>Account</button></Link>
    </>
  )
}

export default Account