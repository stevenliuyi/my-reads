import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

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

export default ListSearchResults
