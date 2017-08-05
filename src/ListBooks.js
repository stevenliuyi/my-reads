import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  renderBook(book) {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors[0] }</div>
        </div>
      </li>
    )
  }

  renderShelf(shelf, title) {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          { shelf.map(this.renderBook) }
          </ol>
        </div>
      </div>
    )
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
            { this.renderShelf(currentlyReadingBooks, 'Currently Reading') }
            { this.renderShelf(wantToReadBooks, 'Want to Read') }
            { this.renderShelf(readBooks, 'Read') }
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
