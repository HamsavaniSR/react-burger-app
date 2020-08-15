import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) =>(

    <header className = {classes.Toolbar}>
        {/* <div>MENU</div> */}
        <DrawerToggle clicked = {props.drawerToggleClicked}/>
        {/* <Logo height="80%"/> */} {/* Use css class to set height of logo */}
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated ={props.isAuth}/>
        </nav>
    </header>

);

export default toolbar;