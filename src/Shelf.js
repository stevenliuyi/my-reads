import React from 'react'
import Book from './Book'

const Shelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{ props.title }</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { props.books.map((book) => (
          <Book book={ book } onMove={ props.onMove }/>
        )) }
      </ol>
    </div>
  </div>
)

export default Shelf
