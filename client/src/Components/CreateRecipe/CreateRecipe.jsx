import React from 'react';
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipes, getRecipes, getDiets } from '../../Redux/actions'; //traer de actions getdiets y postrecipes..
import styles from './CreateRecipe.module.css';
import { useEffect } from 'react';

function validate(recipe){
    let errors = {};
    let regularExpression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if ( !recipe.title.trim() ) {
        errors.title = "Your recipe need a title!"
    } else if( !regularExpression.test(recipe.title.trim())){
        errors.title = "Title field only accepts letters and blank spaces"
    } 
    else if( !recipe.summary){
        errors.summary ="You need give a brief explanation about your recipe"
    } else if( !recipe.steps){
        errors.steps = "Must tell us how to make that delicius recipe"
    /* }else if(!regExpUrl.test(recipe.image.trim())){
        errors.image = "Must be a URL direction"*/
    } 
    return errors;
}


export default function CreateRecipe() {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets); //me traigo las dietas
    //estado de manejo de errores:
     const [ errors, setErrors ] = useState({});
     //me seteo un estado para crear mi receta... tengo q tener en mi pantalla un formulario => q se guarda en un estado
     let [recipe, setRecipe] = useState({ // hago un objeto =>
         title: "asado", 
         summary: "",
         spoonacularScore: 50, 
         healthScore: 50,
         steps: "", 
         image: "",
         diets: []
     })
     
    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch])


    let handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...recipe,
            [e.target.name] : e.target.value
        }))
    }

    let handleSelect = (e) => {
        /* if(!recipe.diets.includes(e.target.value)){ */
        setRecipe({
            ...recipe,
            diets: [...recipe.diets, e.target.value]
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(recipe));
        if(recipe.title && recipe.summary && recipe.diets.length && !Object.keys(errors).length){
            dispatch(postRecipes(recipe));
            alert('Recipe successfully Created');
            setRecipe({
                title: "", 
                summary: "",
                spoonacularScore: 50, 
                healthScore: 50,
                steps: "", 
                image: "",
                diets: []
            })
        }else {
            alert('All fields are required')
        }
    }

    let handleDelete = (diet) => {
       
        setRecipe({
            ...recipe,
            diets: recipe.diets.filter( d => d !== diet) 
        })
    }

    /* console.log({recipe}); */

  return (
    <div className={styles.background}>
      <div className={styles.contentPadre}>
        {/* Contenedor navBar */}
        <div className={styles.contNavBarPadre}>
            <Link to='/' className={styles.navRec}>LandingPage</Link>  
            <Link to='/home' > <button className={styles.button}>Home</button></Link> 
        </div>


        <div className={styles.CreateRecipePadre}>
            <div className={styles.CreateRecipe}>
            <h1>Create Your Recipe</h1>
            
            <form className={styles.form} onSubmit={ (e) => handleSubmit(e) } >

                <div className={styles.title}>
                    <label>Title: </label>
                    <input 
                    type="text"
                    value={recipe.title}
                    name="title"
                    onChange={(e) => handleChange(e)}
                    />   
                    {
                        errors.title && ( <p>{errors.title}</p>)
                    } 
                </div>

                <div>
                    <label className={styles.title}>Summary: </label>
                    <textarea 
                    type="text"
                    value={recipe.summary}
                    name="summary"
                    maxLength="1000" 
                    onChange={(e) => handleChange(e)}
                    /> 
                    {
                        errors.summary && (<p>{errors.summary}</p>)
                    }   
                </div>
                <div className={styles.scores}>
                    <label >Spoonacular Score: </label>
                    <input 
                    type="range"
                    min="0"
                    max="100"
                    value={recipe.spoonacularScore}
                    name="spoonacularScore"
                    onChange={(e) => handleChange(e)}
                    />    
                    {
                        <p className={styles.range}>{recipe.spoonacularScore}</p>
                    }
                </div>
                <div className={styles.scores}>
                    <label>Health Score: </label>
                    <input 
                    type="range"
                    min="0"
                    max="100"
                    value={recipe.healthScore}
                    name="healthScore"
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        <p className={styles.range}>{recipe.healthScore}</p>
                    }    
                </div>
                <div className={styles.scores}>
                    <label>Steps: </label>
                    <textarea 
                    type="text"
                    value={recipe.steps}
                    name="steps"
                    onChange={(e) => handleChange(e)}
                    />   
                    {
                        errors.steps && ( <p>{errors.steps}</p>)
                    } 
                </div>
                <div className={styles.scores} >
                    <label>Load Image here: </label>
                    <input 
                    type="url"
                    value={recipe.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    />  
                    {
                        errors.image && ( <p>{errors.image}</p>)
                    }  
                </div>
                <div className={styles.scores}>
                    <select onChange={(e) => handleSelect(e)}>
                        <option 
                        value=""
                        hidden name= "diets">Select Diets: </option>
                        { 
                            allDiets?.map(diet => {
                                return ( <option value={diet.name} key={diet.id}>{diet.name}</option>)
                            
                                })
                                }
                    </select>
                    <ul>
                        <li>
                            {
                                recipe.diets.map( diet =>
                                    <div className={styles.del}>
                                        <h5 className={styles.h5}>
                                            {diet}
                                        </h5>
                                        <button onClick={ () => handleDelete(diet)} className={styles.x}>x</button>
                                    </div>
                                )
                            }
                        </li>
                    </ul>
                </div>
                <button type='submit' className={styles.submit}>Create Recipe</button>
                </form>
            </div>
            </div>    
        </div>
    </div>
       
  )
}
