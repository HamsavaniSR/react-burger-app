import React,{Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';
/*
return array of html elements with each item with key u can return multiple elements
or using Auxillary component (HOC)

TURN LAYOUT component to class so that you can add methods to switch betwen
sidedrawer and toolbar
*/
class Layout extends Component {

    state = {
        showSideDrawer : true
    }

    sideDrawerClosedHandler = () => {
            this.setState({showSideDrawer : false});
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) =>{
            return  {showSideDrawer : !this.state.showSideDrawer}
        }
        );
    }


    render () {
        return (
        <Aux>
            <Toolbar
            isAuth ={this.props.isAuthenticated}
            drawerToggleClicked = {this.sideDrawerToggleHandler}/>
            <SideDrawer 
            isAuth ={this.props.isAuthenticated}
            open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
           {/* <div>Toolbar,SideDrawer,Backdrop</div> */}
            <main className={classes.Content}>
                {this.props.children} {/* Contents from App.js */}
            </main>
        </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);