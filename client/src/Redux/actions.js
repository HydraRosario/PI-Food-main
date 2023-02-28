import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    let recipe = await axios.get("/recipes"); // aca esta mi conexion entre el back y el front.... gracias thunk
    return dispatch({
      type: "GET-RECIPES",
      payload: recipe.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    try {
      let diet = await axios.get("/types");
      return dispatch({
        type: "GET-DIETS",
        payload: diet.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//ruta por nombre
export function getByTitle(title) {
  return async function (dispatch) {
    try {
      let byTitle = await axios.get(`/recipes?name=${title}`); // /recipes?name=bife
      return dispatch({
        type: "GET_BY_NAME",
        payload: byTitle.data, //me devuelve la accion... es lo q devuelve la ruta asignandole el title
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterDiet(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterMScore() {
  return {
    type: "FILTER_M_SCORE",
  };
}

export function orderScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    try {
      let newRecipe = await axios.post("/recipes/recipe", payload); ///recipes/recipe
      console.log(newRecipe);
      return newRecipe;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      let recipe = await axios.get(`/recipes/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: recipe.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetailsreset() {
  return { type: "GET_DETAILRESET" };
}
