import React ,{Component} from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import Layout from './HOC/Layout/Layout'
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from './HOC/asyncComponent/aysncComponent';

const asyncCheckout = asyncComponent(()=> {
  return import('./containers/Checkout/Checkout');
})


const asyncOrders = asyncComponent(()=> {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
})

class App extends Component {

  /* state = {
    show : true
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({show : false});
    },5000);
  } */

  componentDidMount() {
    this.props.onTryOrderSignUp();
  }

  render()
  {

    let routes = (
      <Switch>
        <Route path = "/auth" component={asyncAuth}/>
        <Route path = "/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route path = "/checkout" component={asyncCheckout}/>
        <Route path = "/orders" component={asyncOrders}/>
        <Route path = "/logout" component={Logout}/>
        <Route path = "/auth" component={asyncAuth}/>
        <Route path = "/" exact component={BurgerBuilder}/>
         <Redirect to="/"/> 
        </Switch>
      )
    }
    return (
    <div>
      <Layout>  {/* You can give Childrens for Layout component */}
          {/* {this.state.show ? <BurgerBuilder/> : null} */}
          {/* <BurgerBuilder/>
          <Checkout/> */}
          {routes} 
        
      </Layout>
    </div>
  );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryOrderSignUp : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
