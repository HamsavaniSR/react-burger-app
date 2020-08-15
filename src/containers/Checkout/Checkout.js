import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
//import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';


class Checkout extends Component {
    /* state = {
       ingredients : null,
        totalPrice : 0
    } */

    componentWillMount() {
      //  this.props.onInitPurchase();
    }

    //componentWillMount() { /* componentDidMount issue with null ingredients */
   /*      let price;
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            //['salad','1']
            if(param[0]==='price'){
                price = param[1];
            }else{
                ingredients[param[0]] = + param[1];
            }
        }
        this.setState({ingredients : ingredients, totalPrice:price})
    */ //}

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render () {
        let summary = <Redirect to="/"/>
        
        //console.log(this.)
        if(this.props.ing){ // if no ingredients then checkout page redirect to home page
            const purchasedRedirect  =this.props.purchased ? <Redirect to = "/"/> : null;
            summary =   (
               
            <div> 
                 {purchasedRedirect}
            <CheckoutSummary ingredients = {this.props.ing} totalPrice = {this.props.price}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
            <Route path = {this.props.match.path +'/contact-data'}
                    component = {ContactData}/>
        
            </div>
            )
        }
        return summary;
      /*   return(  */ /* ingredients = {this.state.ingredients} */
            /* <div>
                {summary} */
                /* <Route path = {this.props.match.path +'/contact-data'}
                    component = {ContactData}/> */
            /* </div> */
            
        //)
    }    
}
// Not included as jsx component since state is global done by reducers
//<Route path={this.props.match.path +'/contact-data'} 
  //                  render={(props) => (<ContactData ingredients = {this.props.ing}
    //                totalPrice={this.props.price} /* props will used to push back to the homepage if data is posted in db */
      //              {...props}/>)}/>
const mapStateToProps = state => {
    return {
        ing : state.burgerBuilder.ingredients ,
        purchased : state.order.purchased,// name from reducer ingredient
       price : state.burgerBuilder.totalPrice
    }
}

/* const mapDispatchToProps = dispatch =>{
    return {
        onInitPurchase  : () => dispatch(actions.purchaseInit())
    }
} */

export default connect(mapStateToProps)(Checkout);