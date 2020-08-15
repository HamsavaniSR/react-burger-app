import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null,
            
        }
        componentWillMount() {

            this.requestInterceptor = axios.interceptors.request.use(req => {
                console.log("ErrorHandler error"+req);
                this.setState({error : null});
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(resp => resp,error => {
                console.log("ErrorHandler error"+error);
                this.setState({error : error});
            });
        }

        componentWillUnmount () {
            console.log('Component will unmount');
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error:null})
        }

        render (){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed = {this.errorConfirmedHandler}>
                        Something not working ! { this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }        
    }
}

export default withErrorHandler;