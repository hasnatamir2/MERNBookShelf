import React, { Component} from 'react'
import { connect } from 'react-redux'
import { getUserPosts } from '../../actions'
import moment from 'moment-js'
import { Link } from 'react-router-dom'

class UserPosts extends Component{

    UNSAFE_componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user_reducer.login.id))
    }

    showPosts = (user) =>(
        user.userPosts ? 
            user.userPosts.map(item => (
                <tr key={item._it}>
                    <td>
                        <Link to={`/user/edit-post/${item._id}`}>
                            {item.name}
                        </Link>
                    </td>
                    <td>
                        {item.author}
                    </td>
                    <td>
                        {moment(item.createAt).format("MM/DD/YY")}
                    </td>
                </tr>
            ))
        
        :null
    )

    render(){
        // console.log(this.props)
        let user = this.props.user_reducer
        return(
            <div className="user_posts">
                <h4>Your Reviews</h4>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showPosts(user)}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(UserPosts)