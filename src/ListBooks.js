import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired
  }

  render() {
    let readBooks = []
    let currentlyReadingBooks = []
    let wantToReadBooks = []
    let otherBooks = []

    for (let i=0; i<this.props.books.length; i++) {
      if (this.props.books[i].shelf === 'currentlyReading') {
        currentlyReadingBooks.push(this.props.books[i])
      } else if (this.props.books[i].shelf === 'wantToRead') {
        wantToReadBooks.push(this.props.books[i])
      } else if (this.props.books[i].shelf === 'read') {
        readBooks.push(this.props.books[i])
      } else {
        console.log('undefined shelf ' + this.props.books[i].shelf)
        otherBooks.push(this.props.books[i])
      }
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf books={ currentlyReadingBooks } title='Currently Reading' onMove={ this.props.onMove } />
            <Shelf books={ wantToReadBooks } title='Want to Read' onMove={ this.props.onMove } />
            <Shelf books={ readBooks } title='Read' onMove={ this.props.onMove } />
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
