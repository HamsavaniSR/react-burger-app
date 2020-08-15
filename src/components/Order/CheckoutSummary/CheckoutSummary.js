import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}> 
            <h1>We hope it tastes well!</h1>
            <div style = {{width : '100%',height:'300px',margin : 'auto'}}>
                <Burger ingredients= {props.ingredients}/>
            </div>
            <p> Total Price is {props.totalPrice}</p>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CHECKOUT CANCEL</Button>
            <Button btnType="Success" clicked = {props.checkoutContinued}>CHECKOUT CONTINUE</Button>
        </div>
    )
}
export default checkoutSummary;