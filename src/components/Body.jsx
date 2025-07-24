import React from 'react'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


function Body() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Body
