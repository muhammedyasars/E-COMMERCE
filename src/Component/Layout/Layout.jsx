import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import './layout.css'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Layout