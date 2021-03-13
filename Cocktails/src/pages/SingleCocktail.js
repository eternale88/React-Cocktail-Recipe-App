import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

//add uuid library
const SingleCocktail = () => {
  //useParams hook is how react router gives access to url params, in this case our param that we passed in is called 'id'
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState([])
   const [ingredients, setIngredients] = useState([])

  //func for fetching single cocktail, and dealing with api design problem
  const getSingleCocktail = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      
      if(data.drinks) {
        //map initial values, for better readability
        const {strDrink:name, strDrinkThumb: image, strAlcoholic: info, strCategory: category, strGlass: glass, strInstructions: instructions, } = data.drinks[0]

  
        // Get the first drink agin for mapping ingredients.
        var drink = data.drinks[0];
        //start to map measure and ingredient name together
        //to bypass poor api design
        let index = 1;
        let ingredientList = [];
        while (drink['strIngredient' + index]) {
            ingredientList.push({name: drink['strIngredient' + index], amount: drink['strMeasure' + index] ? drink['strMeasure' + index]: "A dash "});
            index++;
        }
      //end of  map measure and ingredient together
    
      //last, print out in console to test, and set it to our new cocktails
        // console.log('Drink: ', drink.strDrink);
        // console.log('Ingredients: ');
        // ingredientArray.forEach((ingredient) => {
        //     console.log(`${ingredient.amount} of ${ingredient.name}`)
        // });

        //assign initial value, and ingredients array to cocktail state
        const newCocktail = {
          name,
          image,
          info,
          category,
          glass,
          instructions
      }

      // set state for ingredients and  general cocktail ingo
        setIngredients(ingredientList)
        
        setCocktail(newCocktail)
    
      } else {
        setCocktail(null)
      }
      setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
    
  }, [id])

  useEffect(() => {
    getSingleCocktail()
  }, [id, getSingleCocktail])

  //check if screen is loading
  if(loading) {
    return <Loading/>
  }
  //if for some reason cocktail isn't there
  if(!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>
  }
  //destructure out values from our newly created cocktail
   const {name, image, category, info, glass, instructions} = cocktail
   
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name}/>
        <div className="drink-info">
        <p>
          <span className="drink-data">name : </span>
          {name}
        </p>
        <p>
          <span className="drink-data">category : </span>
          {category}
        </p>
        <p>
          <span className="drink-data">info : </span>
          {info}
        </p>
        <p>
          <span className="drink-data">glass : </span>
          {glass}
        </p>
        <p>
          <span className="drink-data">instructions : </span>
          {instructions}
        </p>
        <p>
          <span className="drink-data">ingredients : </span>
          {
            ingredients.map((item, index) => {
              //destructure values off of each item
              const {name, amount} = item
             return item ? <span key={index}>{name} - <em>{amount}</em></span> : null
            })
          }
        </p>
        </div>
      </div>
     
     
    </section>
  )
}

export default SingleCocktail
