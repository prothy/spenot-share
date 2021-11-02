import React from 'react'

import Contactslist from './ContactsList'
import SearchInput from './SearchBox'

const Sidebar = () => {
    return (
        <aside>
            <SearchInput />
            <Contactslist />
        </aside>
    )
}

export default Sidebar
