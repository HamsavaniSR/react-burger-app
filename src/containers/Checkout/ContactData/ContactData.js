import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import {updateObject,checkValidity} from '../../../shared/utility';

import * as actions from '../../../store/actions/order';

//import {connect} from 'react-redux'
import {connect} from 'react-redux';
class ContactData extends Component {
    state = {
        orderForm : {
                name : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Name'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                street : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Street'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                zipcode : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Postal Code'
                    },
                    value : '',
                    validation : {
                        required : true,
                        minLength : 5,
                        maxLength : 8
                    },
                    valid : false,
                    touched : false
                },
                country : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Country'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                email : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'email',
                        placeholder : 'Your Email'
                    },
                    value : '',
                    validation : {
                        required : true,
                        isEmail : true
                    },
                    valid : false,
                    touched : false
                },
                deliveryMethod : {
                    elementType : 'select',
                    elementConfig : {
                        options : [{value:'fastest',displayValue : 'Fastest'},
                                    {value: 'cheapest', displayValue:'Cheapest'}]
                    },
                    value : 'fastest', // default value
                    validation : {},
                    valid : true,
                    
                }
        },
        formIsValid : false
     //   loading : false
    }
    orderHandler = (event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        
      //  this.setState ({loading : true});
        const order = {
            ingredients : this.props.ing,
            price : this.props.price,
            orderData : formData,
            userId : this.props.userId
        }
        this.props.onOrderBurger(this.props.token,order);

        /* axios.post('/orders.json',order)
              .then (response => {
                this.setState({loading : false});
                this.props.history.push('/');
              })
              .catch ( error => {
                this.setState({loading : false})
                  console.log(error);
              }); */                                 //any nodename.json
 
    }
    
    inputChangeHandler = (event,inputIdentifier) =>{
       // console.log(event.target.value);
        /* const updatedOrderForm = {
            ...this.state.orderForm
        }; */

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value : event.target.value ,
            valid : checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched : true
        })
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier] : updatedFormElement
        })
       
       /*  const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true; 
         updatedOrderForm[inputIdentifier] = updatedFormElement;*/
        //console.log(updatedFormElement);
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid : formIsValid});
    }

    checkValidity (value,rules) {

        console.log(value);
        console.log(rules);
        let isValid = true;
        /* if(!rules){
            return isValid;
        } */
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength  && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength  && isValid;
        }
        if (rules.isEmail){
            const pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
            //"/^/";
            isValid = pattern.test(value) && isValid;
          } 
  
          if(rules.isNumeric) {
              const pattern ="/^\d+$/";
              isValid = pattern.test(value) && isValid
          }
    
        return isValid;
    }

    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            });
        }

        let form = (<form onSubmit={this.orderHandler}>
            {/* <Input inputtype="input"  type = "text" name= "name" placeholder="Your name"/>
            <Input inputtype="input" type = "email" name= "email" placeholder="Your email"/>
            <Input inputtype="input"  type = "text" name= "street" placeholder="Your street"/>
            <Input inputtype="input" type = "text" name= "postal" placeholder="Your postal code"/> */}
          {/*   <Input elementType="" elementConfig="" value=""/>  */}        
           {formElementsArray.map(formElement => (
                <Input
                key = {formElement.id}
                 elementType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig} 
                 value={formElement.config.value}
                 changed = {(event) => this.inputChangeHandler(event,formElement.id)}
                 invalid = {!formElement.config.valid}
                 touched = {formElement.config.touched}
                 shouldValidate = {formElement.config.validation}/> 
            ))}
            <Button btnType="Success" disabled = {!this.state.formIsValid} >Order</Button>
        </form>); // change state to props
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token :state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (token,orderData) => dispatch(actions.purchaseBurger(token,orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));