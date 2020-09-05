import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req
      });
      this.resInterceptor = axios.interceptors.response.use(null,error => {
        this.setState({error: error});
      })
    }

    state = {error:null};

    errorConfirmHandler = () => {
      this.setState({error: null})
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <Auxiliary>
          <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      )
    }
  }
};

export default withErrorHandler;