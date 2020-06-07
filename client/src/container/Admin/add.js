import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBook, clearNewBook } from '../../actions'

class AddBook extends Component{

    state = {
        formdata:{
            name:'',
            author:'',
            review:'',
            pages: '',
            rating: '',
            price: ''
        }
    }

    submitForm = (e) =>{
        e.preventDefault()
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId: this.props.user_reducer.login.id
        }))
    }
 
    onChange = (event, name)=>{
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value
        this.setState({
            formdata: newFormdata
        })
    }

    showNewBook = (book)=>( 
        book.post ?  
        <div className="conf_link">
            Cool!!!
            <Link to={`/books/${book.bookId}`}>
                Click on the Link to See Book
            </Link>
        </div>
        :null
    )

    UNSAFE_componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }

    render(){
        let data = this.state.formdata
        return(
            <div className="rl_container article">
                <form onSubmit = {this.submitForm}>
                    <h2>Add Review</h2>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Text"
                            value={data.name}
                            onChange={(event)=>{this.onChange(event,'name')}}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Author"
                            value={data.author}
                            onChange={(event)=>{this.onChange(event,'author')}}
                        />
                    </div>
                    <div className="form_element">
                        <textarea
                        placeholder="Enter Review"
                            value={data.review}
                            onChange={(event)=>{this.onChange(event,'review')}}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter Pages"
                            value={data.pages}
                            onChange={(event)=>{this.onChange(event,'pages')}}
                        />
                    </div>
                    <div className="form_element">
                        <select 
                            value={data.rating}
                            onChange={(event)=>{this.onChange(event,'rating')}}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter Price"
                            value={data.price}
                            onChange={(event)=>{this.onChange(event,'price')}}
                        />
                    </div>

                    <button type="submit">Add Review</button>

                    {
                        this.props.book_reducer.newbook ?
                            this.showNewBook(this.props.book_reducer.newbook) 
                        :null
                    }

                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        book_reducer: state.book_reducer
    }
}

export default connect(mapStateToProps)(AddBook)