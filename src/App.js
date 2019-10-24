import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent'


import *as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/logout';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})
class App extends Component {
  componentDidMount(){
    this.props.onAutoLogin()
  }
  render () {
    let routes = (
      <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/auth" component={asyncAuth}/>
          <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/orders" component={asyncOrders}/>
          <Redirect to="/"/>
        </Switch>
      );
      
    }
    return (
      <div>
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
}

export const mapStateToProps = state =>{
  return {
    isAuth:state.auth.token!==null
  }
}
export const mapDispatchToProps = dispatch =>{
  return {
    onAutoLogin : () => dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
