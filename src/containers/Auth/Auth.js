import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility';

import {connect} from 'react-redux';
class Auth extends Component {

    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Your Mail Id'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Your Password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            }
        },
        isSignup : true
    }

    componentDidMount() {
       
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthPathRedirect();
        }

    }
    inputChangeHandler = (event,controlName) => {
         /* const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched : true
            }
        }  */

        const updatedControls = updateObject(this.state.controls,{
            [controlName] : updateObject(this.state.controls[controlName],{    
                    value : event.target.value,
                    valid : checkValidity(event.target.value,this.state.controls[controlName].validation),
                    touched : true
                }
            )}) 
        this.setState({controls : updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup : !prevState.isSignup
            }
        })
    }
     render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id : key,
                config : this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key = {formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                changed = {(event) => this.inputChangeHandler(event,formElement.id)}
                invalid = {!formElement.config.valid}
                touched = {formElement.config.touched}
                shouldValidate = {formElement.config.validation}/> 
            
        ));

        if(this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;
        //console.log(this.props.error);
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p> // get value of message key from error json object
            )
        }
        let authRedirect = null;

        if(this.props.isAuthenticated) {
           authRedirect= <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                 {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType = "Success" >Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler}
                 btnType ="Danger">
                    Switch to {this.state.isSignup ?'SIGN IN' : 'SIGN UP'}
                </Button>
                

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        burgerBuilding : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth :  (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthPathRedirect : () => dispatch(actions.setAuthPathRedirect('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);