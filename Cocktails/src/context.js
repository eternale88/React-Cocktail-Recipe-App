import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //state values
const [loading, setLoading] = useState(true)
const [searchTerm, setSearchTerm] = useState('a')
const [cocktails, setCocktails] = useState([])

//fetch list of drinks
//wrap in useCallback to avoid console error, as if we added this as depencency to useEffect it would cause infinite loop, as this is called every time app renders, and changes state
//basically useCallback says only totally recreate this function when something changes
//we set it up to run everytime search term changes as that is our passed in dependency

//and finally we can add fetch drinks as dependency and avoid infinite loop!
const fetchDrinks = useCallback(async () => {
  setLoading(true)
  try {
    const response = await fetch(`${url}${searchTerm}`)

    const data = await response.json()
    const {drinks} = data
    //if data null/falsy set cocktails back to empty array
    if(!drinks) {
       //clear null fetched value
       setCocktails([])
    } else {
      //results returned
      const newCocktails = drinks.map((drink) => {
        const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink

        //reformat obj to have better field names
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass
        }
      })
      //set out list of cocktails
      setCocktails(newCocktails)
    }
     //console.log(data)
    // set loading false in try, as errors are already handled in cocktail list  page, when length is less than 1
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)

  }
}, [searchTerm])

//useEffect for fetching drinks on search, [] to fetch every time something changes
useEffect(() => {
  fetchDrinks()
}, [searchTerm, fetchDrinks])


  return <AppContext.Provider 
      value={{loading,
              cocktails,
              setSearchTerm
            }}>
      {children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
