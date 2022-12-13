import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  // going with uncontrolled input for a change, so we will use useRef to get values
  const searchValue = React.useRef('')
  const { setSearchTerm } = useGlobalContext()

  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  //setup auto focus on input
  React.useEffect(() => {
    searchValue.current.focus()
  }, [])
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search for your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
