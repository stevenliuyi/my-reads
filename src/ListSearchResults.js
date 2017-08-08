import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const ListSearchResults = (props) => (
  <ol className="books-grid">
    { props.books.length !==0 && props.books.map( (book) => (
      <Book book={ book } onMove={ props.onMove } />
    ))}
  </ol>
)

ListSearchResults.propTypes = {
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired
}

export default ListSearchResults
