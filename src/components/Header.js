import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <NavLink activeClassName='selected' exact to='/'></NavLink>
                    {!localStorage.getItem('TOKEN') ?
                    <>
                    <NavLink activeClassName='selected' exact to='/signin'>Sign In</NavLink>
                    <NavLink activeClassName='selected' exact to='signup'>Sign Up</NavLink>
                    </>
                    : 
                    <button onClick={() => {
                        localStorage.removeItem('TOKEN');
                        window.location.replace('/');
                    }}>Log Out</button>
                    }
                </nav>
            </header>
        )
    }
}

export default Header;