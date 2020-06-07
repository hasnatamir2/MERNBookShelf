import React, { PureComponent} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBook, clearBook, updateBook, deleteBook } from '../../actions'

class EditBook extends PureComponent{

    state = {
        formdata:{
            _id: this.props.match.params.id,
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
        console.log(this.state.formdata)
        this.props.dispatch(updateBook(this.state.formdata))
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

    UNSAFE_componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        let book = nextProps.book_reducer.book
        console.log(nextProps)
        this.setState({
            formdata: {
                _id: book._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price
            }
        })
    }

    deletePost = ()=>{
        this.props.dispatch(deleteBook(this.props.match.params.id))
    }

    redirectUser = () =>{
        setTimeout(() => {
            this.props.history.push('/user/user-review')
        }, 1000)
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }

    render(){
        let data = this.state.formdata
        let books = this.props.book_reducer
        return(
            <div className="rl_container article">

                {
                    books.updateBook ? 
                    <div className="edit_confirm">
                        Post Updated
                        <Link to={`/books/${books.book._id}`}>
                            Click Here to See Updated Post
                        </Link>
                    </div>
                    :null
                }

                {
                    books.deletePost ?  
                    <div className="red_tag">
                        Post Deleted
                        {this.redirectUser()}
                    </div>
                    :null
                }
                <form onSubmit = {this.submitForm}>
                    <h2>Edit Review</h2>
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

                    <button type="submit">Edit Review</button>
                    <div className="delete_post">
                        <div className="button"
                            onClick={this.deletePost}
                        >
                            Delete Review
                        </div>
                    </div>

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

export default connect(mapStateToProps)(EditBook)