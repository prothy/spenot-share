import React from 'react'

const SongInput = ({val}) => {
    const trimUrl = (url) => {
        const splitUrl =  url.split(/(track\/|\?)+/g)
        return splitUrl[2]
    }

    const sendVal = async (event) => {
        const trimmedUrl = trimUrl(event.target.value)
        if (event.key === 'Enter')
        {
            console.log(trimmedUrl)
            await fetch(process.env.REACT_APP_SERVER_URL + '/api/song/' + trimmedUrl, {
                credentials: 'include',
                mode: 'cors'
            }).catch(e => console.error(e))
        }
    }

    return (
        <input type="text" 
            placeholder="Enter Spotify URL"
            value={val.inputValue} 
            onChange={e => val.setInputValue(e.target.value)} 
            onKeyDown={sendVal}
        />
    )
}

export default SongInput
