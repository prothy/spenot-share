import React from 'react'

const SongInput = ({inputState, msgState}) => {
    const trimUrl = (url) => {
        const splitUrl =  url.split(/(track\/|\?)+/g)
        return splitUrl[2]
    }

    const sendVal = async (event) => {
        const trimmedUrl = trimUrl(inputState.inputValue)

        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + '/api/song/' + trimmedUrl, {
                credentials: 'include',
                mode: 'cors'
            })
            const songData = await res.json()

            msgState.setMessages([...msgState.messages, songData.name])
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <input type="text" 
                placeholder="Enter Spotify URL"
                value={inputState.inputValue} 
                onChange={e => inputState.setInputValue(e.target.value)} 
                onKeyDown={e => { if (e.key === 'Enter') sendVal(e) }}
            />
            <button className="btn" onClick={sendVal}>Send</button>
        </>
    )
}

export default SongInput
