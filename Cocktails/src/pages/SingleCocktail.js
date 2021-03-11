import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  //useParams hook is how react router gives access to url params, in this case our param that we passed in is called 'id'
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [cocktails, setCocktails] = useState(null)

  const getSingleCocktail = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      if(data.drinks) {
        const {strDrink:name, strDrinkThumb: image, strAlcoholic: info, strCategory: category, strGlass: glass, strInstructions: instructions, } = data.drinks[0]
      } else {
        setCocktails(null)
      }
      setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
    
  }

  useEffect(() => {
    getSingleCocktail()
  }, [id])
  return (
    <div>
      <h2>{id}</h2>
    </div>
  )
}

export default SingleCocktail
