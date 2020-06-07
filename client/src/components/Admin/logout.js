import React from 'react'
import axios from 'axios'

const Logout = (props) =>{

    axios.get(`/api/logout`)
                    .then(
                        request => {
                            setTimeout( () => {
                                props.history.push('/')
                            }, 2000)
                        }
                    )
    return(
        <div className="logout_container">
            Sorry to see you go!
        </div>
    )
}

export default Logout