import React, { Component } from 'react';
import Aux from '../../HOC/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

//import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/index';

import {connect} from 'react-redux';

/* Paste in reducer file
const INGREDIENT_PRICES ={
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
} */


class BurgerBuilder extends Component{
/* 
    constructor(props){
        super(props);
        this.state = {...}
    } */

    state ={
       /*  ingredients :{
            salad :  0,
            bacon :  0,
            cheese : 0,
            meat :   0
        }, */
   //   ingredients : null,
    //    totalPrice : 4,
    //    purchasable : false, // to disable Order now if no items purchased
        purchasing : false 
       /*  loading : false,
        error : false */
    }

    componentDidMount () {
        this.props.onInitIngredients();
        /* axios.get('https://react-my-burger-app-1.firebaseio.com/ingredients.json')
            .then (response => {
                console.log("axios")
                console.log(response.data)
                this.setState({ingredients : response.data })
            })
            .catch(error => {
                this.setState({error : true})
                console.log(error)
            });  */
    }


    updatePurchaseState (ingredients){
    /*    const ingredients = {
           ...this.state.ingredients
       }; */

       const sum = Object.keys(ingredients)
                .map (igKey =>{
                    return ingredients[igKey]
                })
                .reduce((sum,el) =>{
                        return sum +el;
                },0);
      // this.setState({purchasable : sum > 0})
      return sum > 0;
       //console.log("sum is " +sum);
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout'); // set redirect path  
            this.props.history.push('/auth')
          
        }
    }

    /* addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]; // get price of type
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;  // update the price
        this.setState({ingredients : updateIngredients,totalPrice : newPrice});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){  // to do noting if count is 0
            return ;
        }
        const updatedCount = oldCount -1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]; // get price of type
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;  // update the price
        this.setState({ingredients : updateIngredients,totalPrice : newPrice});
        this.updatePurchaseState(updateIngredients);     
    } */


    purchaseCancelHandler = () =>{
        
            this.setState({purchasing:false})
        
    }

    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout')

       // console.log("Purchase " +this.props);

        /* this.setState ({loading : true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : 'TestCustomer',
                address : {
                    street : 'Test street',
                    zipcode : '32323',
                    country : 'America'
                },
                email : 'test@test.com'
            },
            deliveryMethod : 'fastest'
        }

        axios.post('/orders.json',order)
              .then (response => {
                this.setState({loading : false, purchasing : false})
              })
              .catch ( error => {
                this.setState({loading : false, purchasing : false})
                  console.log(error)
              });                                 //any nodename.json
 */
      // alert('You continue');
/* 
      const queryParams = [];
      
      for (let i in this.state.ingredients){
          queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      } */
      //queryParams.push('price='+this.state.totalPrice);
      //const queryString = queryParams.join('&');
      /* this.props.history.push({
          pathname : '/checkout',
          search : '?' + queryString
      }); */
    }


    render() {

        /* const disabledInfo = {
            ...this.state.ingredients
        } */
        const disabledInfo = {
            ...this.props.ing
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
//{salad : true, meat : false } like that

        let orderSummary = null;
        console.log("this.props.error");
        console.log(this.props.error);
         let burger = this.props.error ? <p>Ingridients cant be loaded</p> : <Spinner/>
         console.log("this.props.ing")
         console.log(this.props.ing)
        /* if(this.state.ingredients){ */
        if(this.props.ing){
         burger = (
        <Aux>
        {/* <Burger ingredients = {this.state.ingredients}/> */}
        <Burger ingredients = {this.props.ing}/>
        {/* <div>Build controls</div>  <BuildControls ingredientAdded = {this.addIngredientHandler}
                        ingredientsRemoved = {this.removeIngredientHandler}*/}
                        {/* No need to pass argument in ingredienAdded/REmoveAdded
                        because  buildCOntrol is passing params in the called function */}
        <BuildControls ingredientAdded = {this.props.onIngredientAdded}
                        ingredientsRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchasable = {this.updatePurchaseState(this.props.ing)}
                        ordered = {this.purchaseHandler}
                        isAuth = {this.props.isAuthenticated} />;
        </Aux>
        );
            orderSummary =   <OrderSummary 
            ingredients = {this.props.ing}
            totalPrice = {this.props.price}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}/>;
        }
        /* if(this.state.loading) {
                orderSummary = <Spinner />
        } */
         return (
            <Aux>
                <Modal show = {this.state.purchasing} 
                modalClosed = {this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps  = state =>{
    return {
        ing : state.burgerBuilder.ingredients, // state.ingredients changed since combinreducer using
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error ,
        isAuthenticated : state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        //onIngredientAdded  : (ingName) => dispatch ({type : actionTypes.ADD_INGREDIENT, ingredientName : ingName}),
        //onIngredientRemoved  : (ingName) => dispatch ({type : actionTypes.REMOVE_INGREDIENT, ingredientName : ingName})
        onIngredientAdded : (ingName) =>  dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) =>  dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthPathRedirect(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));