import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const Layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-1 p-4">
        <Header />
        {children}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node, // validates React children
}

export default Layout
