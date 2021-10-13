import React from 'react'

const SongInput = ({val}) => {
    const sendVal = (event) => {
        if (event.key === 'Enter')
        {
            console.log(event.target.value)
        }
    }

    return (
        <input type="text" 
            placeholder="Enter Spotify URL"
            value={val.inputValue} 
            onChange={e => val.setInputValue(e.target.value)} 
            onKeyDown={e => sendVal(e)}
        />
    )
}

export default SongInput
