import React, { Component } from "react";

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    
   /*  state = {
        orders : [],
        loading : true
    }
 */
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);

       /*  axios.get('/orders.json') // get data from firebase
        .then (res => {
          //  console.log(res.data);
            const fetchOrderData = [];
            for ( let key in res.data){
                fetchOrderData.push({
                    ...res.data[key],
                    id: key
                 });
            }
            this.setState({loading:false,orders:fetchOrderData})
            console.log(fetchOrderData);
        }).catch(err => {
            this.setState({loading:false})
        }); */
    }

    render () {
        let orders = <Spinner/>
        if(!this.props.loading){ /* state to props */
            orders=  this.props.orders.map(order =>(
                <Order key = {order.id} 
                       ingredients = {order.ingredients}
                       price = {order.price}/>
            ))
           
        }
        return (
            <div> 
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>  {
    return {
        onFetchOrders :  (token,userId) => dispatch(actions.fetchOrders(token,userId))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));