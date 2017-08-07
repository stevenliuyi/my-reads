import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks, { ListSearchResults } from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  moveBook = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.filter((e) => e.id !== book.id).concat(book)
    }))
    BooksAPI.update(book, shelf)
  }

  searchBooks = (query) => {
    const trimmedQuery = query.trim()
    if (trimmedQuery !== '') {
      BooksAPI.search(trimmedQuery, 20).then((books) => {
        if (books instanceof Array ) {
          this.setState({searchResults: books})
        } else {
          this.setState({searchResults: []})
        }
      })
    } else {
        this.setState({searchResults: []})
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search"
                onClick={ () => ( this.setState({ searchResults: [] }))}>Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={ (event) => this.searchBooks(event.target.value) }
                />
              </div>
            </div>
            <div className="search-books-results">
              <ListSearchResults books={ this.state.searchResults} onMove={ this.moveBook } />
            </div>
          </div>
        )}/>
        <Route exact path="/" render={ () => (
          <div>
            <ListBooks books={this.state.books} onMove={this.moveBook} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
