import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getBooks } from '../actions'
import BookItem from '../widgetUI/book_item'


class HomeContainer extends Component{

    UNSAFE_componentWillMount(){
        this.props.dispatch(getBooks(1,0,'desc'))
    }

    renderItems = (books) => (
        books.list ? 
            books.list.map(item => (
                <BookItem { ...item } key={item._id} />
            ))
            :null
    )

    loadmore = ()=>{
        let count = this.props.book_reducer.list.length;
        this.props.dispatch(getBooks(1,count,'desc',this.props.book_reducer.list))
    }

    render(){
        return(
            <div>
                {this.renderItems(this.props.book_reducer)}
                <div className="loadmore" onClick={this.loadmore}>
                    Load More
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        book_reducer: state.book_reducer
    }
}

export default connect(mapStateToProps)(HomeContainer);