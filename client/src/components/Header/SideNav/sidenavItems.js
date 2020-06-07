import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

const SidenavItems = ({user_reducer})=>{

    const items = [
        {
            type:'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restriction: false
        },
        {
            type:'navItem',
            icon: 'file-text-o',
            text: 'My Profile',
            link: '/user',
            restriction: true
        },
        {
            type:'navItem',
            icon: 'file-text-o',
            text: 'Add Admin',
            link: '/user/register',
            restriction: true
        },
        {
            type:'navItem',
            icon: 'fa fa-sign-in',
            text: 'Login',
            link: '/login',
            restriction: false,
            exclude: true
        },
        {
            type:'navItem',
            icon: 'file-text-o',
            text: 'My Reviews',
            link: '/user/user-review',
            restriction: true
        },
        {
            type:'navItem',
            icon: 'file-text-o',
            text: 'Add Review',
            link: '/user/add',
            restriction: true
        },
        {
            type:'navItem',
            icon: 'fa fa-sign-out',
            text: 'Logout',
            link: '/user/logout',
            restriction: true
        }
    ]

    // const element = (item,i)=>(
    //     <div key={i} className={item.type}>
    //             <Link to={item.link}>
    //                 <FontAwesome name={item.icon}/>
    //                 {item.text}
    //             </Link>
    //     </div>
    // )

    const showItems = ()=>(
        user_reducer.login ? 
            items.map((item,i)=>{
                if(user_reducer.login.isAuth){
                    return !item.exclude ?
                        // element(item,i)
                        <div key={i} className={item.type}>
                                <Link to={item.link}>
                                    <FontAwesome name={item.icon}/>
                                    {item.text}
                                </Link>
                        </div>
                    :null
                } else {
                    return !item.restriction ?
                        // element(item.i)
                        <div key={i} className={item.type}>
                                <Link to={item.link}>
                                    <FontAwesome name={item.icon}/>
                                    {item.text}
                                </Link>
                        </div>
                    :null
                }
            })
        :null
    )

    return(
        <div>
            {showItems()}
        </div>
    )
}

function mapStateToProps(state){
    return{
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(SidenavItems)