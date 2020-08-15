import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {withRouter} from 'react-router-dom';

const burger = (props) =>{ //transform ingredients object to array

    console.log(props);
    //(4) [Array(0), Array(0), Array(0), Array(0)] without reduce
    //0: []
    //1: []
    //2: []
    //3: []

    let transformedIngredients = Object.keys(props.ingredients)
                                   .map( igKey => {
                                       return [...Array(props.ingredients[igKey])].map(
                                            (_, i) =>{
                                             return <BurgerIngredients key = {igKey + i }
                                                type={igKey}/>
                                            });
                                   })
                                   .reduce((arr,el) => {
                                       return arr.concat(el)
                                   },[]);  // array flatenning

                                    // (3) [{…}, {…}, {…}]

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
        console.log(transformedIngredients);

    return (
        <div className = {classes.Burger}>
            <BurgerIngredients type="bread-top"/>
         {/*<BurgerIngredients type="cheese"/>
            <BurgerIngredients type="meat"/> */}
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);