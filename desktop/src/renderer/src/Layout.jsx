import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-1 p-4">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node, // validates React children
}

export default Layout
