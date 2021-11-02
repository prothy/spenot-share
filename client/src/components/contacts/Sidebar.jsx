import React from 'react'

import Contactslist from './ContactsList'
import SearchInput from './SearchInput'

const Sidebar = () => {
    return (
        <aside>
            <SearchInput />
            <Contactslist />
        </aside>
    )
}

export default Sidebar
