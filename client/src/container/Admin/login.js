import React, { Component} from 'react'
import { connect } from 'react-redux'
import { loginUser} from '../../actions'

class Login extends Component{

    state ={
        email: '',
        password: '',
        error: '',
        success: false
    }

    handleInputEmail =(event)=>{
        this.setState(({email: event.target.value}))
    }

    handleInputPassword =(event)=>{
        this.setState(({password: event.target.value}))
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.user_reducer.login.isAuth){
            this.props.history.push('/user')
        }
    }

    submitForm =(e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    render(){
        let user = this.props.user_reducer
        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2 className="">Log In Here</h2>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit" >Log-In</button>

                    <div className="error">
                    {
                        user.login ? 
                        <div>{user.login.message}</div>
                        :null
                    }
                    </div>

                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(Login)