import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends React.Component {
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.book.imageLinks.thumbnail + ')' }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={ this.props.book.shelf } onChange={(e) => this.props.onMove(this.props.book, e.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ this.props.book.title }</div>
          <div className="book-authors">{ this.props.book.authors }</div>
        </div>
      </li>
    )
  }
}

class Shelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.map((book) => (
              <Book book={ book } onMove={ this.props.onMove }/>
            )) }
          </ol>
        </div>
      </div>
    )
  }
  
}

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired
  }

  render() {
    var readBooks = []
    var currentlyReadingBooks = []
    var wantToReadBooks = []
    var otherBooks = []

    for (var i=0; i<this.props.books.length; i++) {
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

class ListSearchResults extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired
  }

  render() {
    return (
      <ol className="books-grid">
        { this.props.books.length !==0 && this.props.books.map( (book) => (
          <Book book={ book } onMove={ this.props.onMove } />
        ))}
      </ol>
    )
  }  
}

export default ListBooks
export { ListSearchResults }
