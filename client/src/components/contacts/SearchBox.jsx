import React, { useState } from 'react'

import SearchResults from './SearchResults'

const SearchBox = () => {
    const requiredChars = 3
    
    const [charsLeft, setCharsLeft] = useState('Begin typing...')
    const [resHidden, setResHidden] = useState(true)

    const searchUser = event => {
        const inputLength = event.target.value.length

        setCharsLeft(requiredChars - inputLength + ' more characters needed...')

        if (inputLength >= requiredChars) {
            setResHidden(false)
        } else {
            setResHidden(true)
        }
    }

    return (
        <>
            <input placeholder="Search for a user" onChange={searchUser}/>
            <SearchResults 
                hiddenState={[resHidden, setResHidden]} 
                charsLeftState={[charsLeft, setCharsLeft]} 
            />
        </>
    )
}

export default SearchBox
