import React from 'react'

const SearchResults = ({ hiddenState, charsLeftState }) => {
    const [resHidden, ] = hiddenState
    const [charsLeft, ] = charsLeftState

    return (
        <div>
            <p hidden={!resHidden}>
                {charsLeft}
            </p>
            <div hidden={resHidden}>

            </div>
        </div>
    )
}

export default SearchResults
