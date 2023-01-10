import {Heading, Navbar as BulmaNavbar} from 'react-bulma-components'
import React, {useEffect, useState} from 'react'

export const Navbar = ({router}) => {

    const [lastPage, setLastPage] = useState(router === null ? undefined : router.pathname);

    useEffect(() => {
        if (router !== null && router.pathname !== lastPage) {
            setLastPage(router.pathname)
        }
    })

    return (
        <BulmaNavbar className="isFixed">
            <BulmaNavbar.Brand>
                <BulmaNavbar.Item>
                    <Heading className='has-text-danger'>24Room</Heading>
                </BulmaNavbar.Item>
            </BulmaNavbar.Brand>
            <BulmaNavbar.Menu>
                <div className="navbar-end">
                    <a className="navbar-item has-text-danger" href="/logout">Logout</a>
                </div>
            </BulmaNavbar.Menu>
        </BulmaNavbar>
    )
}