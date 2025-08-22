import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const Header = props => {
  const location = useLocation();

  const pageName = location.pathname.replace("/", "");
  const displayName = pageName
    ? pageName.charAt(0).toUpperCase() + pageName.slice(1)
    : "Home";
  return (
    <div className='flex flex-1'>
      <nav className='w-full flex justify-between items-center px-2 py-4'>
        <div>{displayName}</div>
        <div>Logo</div>
      </nav>
    </div>
  )
}

Header.propTypes = {}

export default Header