import React from 'react'

const User = (props)=>{

    let user = props.user_reducer.login
    return (
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" scr="/images/avatar.png"/>
            </div>
            <div className="nfo">
                <div><span>First Name: </span> {user.name}</div>
                <div><span>Last Name: </span>{user.lastname}</div>
                <div><span>Email: </span>{user.email}</div>
            </div>
        </div>
    )
}

export default User