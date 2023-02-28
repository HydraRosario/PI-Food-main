import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, filterDiet, orderByName, filterCreated, getDiets, orderScore,} from '../../Redux/actions';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';

function Home() {

const dispatch = useDispatch();
const allRecipes = useSelector(state => state.filterRecipes);
const allDiets = useSelector(state => state.diets);
// console.log("recetas", allRecipes);
const [currentPage, setCurrentPage] = useState(1); 
const [recipesPagination] = useState(9);
const lastRecipeNumber = currentPage * recipesPagination;
const firstRecipeNumber = lastRecipeNumber - recipesPagination;
const currentRecipes = allRecipes.slice(firstRecipeNumber, lastRecipeNumber );

const [setOrder] = useState(''); //para setear los estados en los filtros

const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
}

useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
}, [dispatch]);

function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
    dispatch(getDiets());
}

function handleDiets(e) {
    e.preventDefault();
    dispatch(filterDiet(e.target.value));
    /* setCurrentPage(1); */
}

function handleOrderByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(e.target.value);
  
}

function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value));
}


function handlerOrderScore(e){
    e.preventDefault();
    dispatch(orderScore(e.target.value))
    /* setCurrentPage(1); */
    setOrder(e.target.value);
}

  return (
    <div className={styles.background}>
        <div className={styles.contentPadre}>
            {/* {console.log(allRecipes)} */}
            {/* Contenedor navBar */}
            <div className={styles.contNavBarPadre}>
                <Link to='/' className={styles.title}>LandingPage</Link>  
                <SearchBar className={styles.search}/>
                <Link to='/recipes' className={styles.contCraeteRecipe}>Create Recipe</Link>
                <button className={styles.button} onClick={e => handleClick(e)}>Refresh</button>
            </div>

            <br />
            
            {/* Filtros */}    
            <div className= {styles.filters}>
                <select name='' id='filter' onChange={(e) => handleOrderByName(e)} >
                    <option value="order"> Select Order </option>
                    <option value="asc"> A/Z </option>
                    <option value="desc"> Z/A </option>
                </select>
                <br />
                    <select onChange={(e) => handleDiets(e)}>
                    <option value="all" >Diets</option>
                    { 
                    allDiets?.map(diet => {
                        // console.log(allDiets);
                        return  <option value={diet.name} key={diet.id}>{diet.name}</option>
                    
                        })}
                    </select>
                <br />
                    <select name='' id='' onChange={ (e) => {handlerOrderScore(e)}}>
                        <option value="score">Spoonacular Score</option>
                        <option value="min">Min Score</option>
                        <option value="max">Max Score</option>
                    </select>
                <br/>
                    <select name="" id="" onChange={(e)=>{handleFilterCreated(e)}}>
                        <option value="All">All Recipes</option>
                        <option value="Created">Created</option>
                        <option value="Api">Existing</option>
                    </select>
            </div>
            <br />
            
            {/* Paginado superior */}
            <div className = {styles.paginationTop}>
                <Pagination 
                    recipesPagination = {recipesPagination}
                    allRecipes = {allRecipes.length}
                    pagination = {pagination}
                />
            </div>

            {/* Cards */}
            <div className={styles.containerRecipe}>
                {
                currentRecipes?.map((r) => {
                        return (
                            <Link to={ `/recipes/${r.id}` }>
                            <Card className={styles.cards}
                                image={r.image}
                                title={r.title}
                                dishTypes={r?.dishTypes?.map( dishtype => <p>{dishtype.name}</p>)}
                                diets={r.diets.map(recipe => (<p className={styles.diet} >{recipe.name}</p>))}
                                spoonacularScore={`Spooancular Score: ${r.spoonacularScore}`}
                                servings={`Servings: ${r.servings}`}
                                key={r.id}
                            />
                            </Link>
                        )
                    })
                }
            </div>

            {/* Paginado inferior */}
            <div className = {styles.paginationBottom}>
                <Pagination 
                    recipesPagination = {recipesPagination}
                    allRecipes = {allRecipes.length}
                    pagination = {pagination}
                />
            </div>
                
        </div>
    </div>
)}

export default Home;
