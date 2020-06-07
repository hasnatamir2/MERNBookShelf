import React, {Component} from 'react'
import { connect } from 'react-redux'
import {auth} from '../actions'

export default function(ComposedClass, reload){
    class AuthenticationCheck extends Component{

        state = {
            loading: true
        }

        UNSAFE_componentWillMount(){
            this.props.dispatch(auth())
        }

        UNSAFE_componentWillReceiveProps(nextProps){
            this.setState({loading:false})

            if(!nextProps.user_reducer.login.isAuth){
                if(reload){
                    this.props.history.push('/login')
                }
            }
            else{
                if(reload === false){
                    this.props.history.push('/user')
                }
            }
        }

        render(){

            if(this.state.loading){
                return (
                    <div className="loader">Loading...</div>
                )
            }
            return(
                <ComposedClass {...this.props} user_reducer={this.props.user_reducer} />
            )
        }
    }
    
    function mapStateToProps(state){
        return {
            user_reducer: state.user_reducer
        }
    }
    
    return connect(mapStateToProps)(AuthenticationCheck)
}