import React from 'react'

const Header = ({children}) => {
    return (
        <header>
            <h1 className="hdr-title">share app thang</h1>
            {children}
        </header>
    )
}

export default Header
