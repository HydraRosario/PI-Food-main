import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, getDetailsreset } from "../../Redux/actions";
import { useEffect } from "react";
import styles from "./DetailsRecipe.module.css";

export default function DetailsRecipe() {
  const dispatch = useDispatch();
  const recipeId = useParams();
  let myRecipe = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetails(recipeId.id));
    dispatch(getDetailsreset());
  }, [dispatch, recipeId.id]);

  return (
    <div className={styles.background}>
      <div className={styles.contentPadre}>
        {/* Contenedor navBar */}
        <div className={styles.contNavBarPadre}>
          <Link to="/" className={styles.title}>
            LandingPage
          </Link>
          <Link to="/home">
            {" "}
            <button className={styles.button}>Home</button>
          </Link>
          <Link to="/recipes" className={styles.contCraeteRecipe}>
            Create Recipe
          </Link>
        </div>
        <br />
        {myRecipe.length === 0 ? (
          <div className={styles.loading}>
            <p className={styles.loader}>Loading...</p>
          </div>
        ) : (
          /* Contenedor detallesUno */
          <div className={styles.contDetailsPadre}>
            <div className={styles.contDetailOne}>
              {/* contenedor Imagen */}
              <div className={styles.contDetailImgPadre}>
                <div className={styles.contDetailImg}>
                  <img src={myRecipe.image} alt="Img not found" />
                </div>
              </div>

              {/* Contenedor InfoUno */}
              <div className={styles.contDetailInfoPadre}>
                <div className={styles.contDetailInfo}>
                  <h1>{myRecipe.title}</h1>
                  <br />
                  <h3>
                    <span>Dish Type:</span>{" "}
                  </h3>
                  <p className={styles.p1}>
                    {myRecipe.dishTypes?.map((r) => (
                      <li className={styles.li}>- {r.name} </li>
                    ))}
                  </p>
                  <br />
                  <h3>
                    <span>Diet Type:</span>{" "}
                  </h3>
                  <p className={styles.p1}>
                    {myRecipe.diets?.map((r) => (
                      <li className={styles.li}>- {r.name} </li>
                    ))}
                  </p>
                  <br />
                  <h4>
                    <span>Servings:</span> {myRecipe.servings}
                  </h4>
                  <h4>
                    <span>Spoonacular Score:</span> {myRecipe.spoonacularScore}
                  </h4>
                  <h4>
                    <span>Health Score:</span> {myRecipe.healthScore}
                  </h4>
                  <h4>
                    <span>minutes:</span> {myRecipe.readyInMinutes}
                  </h4>
                </div>
              </div>
            </div>
            <br />

            <div className={styles.contDetailTwo}>
              <div className={styles.contDetailTwoSummary}>
                <h5>
                  <span>Summary:</span> {myRecipe.summary}
                </h5>
              </div>
              <br />
              <div className={styles.contDetailTwoInstructions}>
                <h5>
                  <span>Instructions:</span> {myRecipe.instructions}
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
