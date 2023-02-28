const initialState = {
    allRecipes: [],
    filterRecipes: [],
    diets: [] ,
    detail: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET-RECIPES':
            return {
                ...state,
                allRecipes: action.payload,
                filterRecipes: action.payload,
            };

        case 'GET-DIETS':
            return {
                ...state,
                diets: action.payload,
            } 
        case 'FILTER_BY_DIET':
            const recipes = state.allRecipes;
            const dietFilter = action.payload === "all" ? recipes //recipes es la copia del estado global donde me traigo all recipes
            : recipes.filter(recipe => recipe.diets.map( r => r.name ).includes( action.payload ));
            return {
                ...state,
                filterRecipes: dietFilter,
                
            } 
        case 'ORDER_BY_NAME':
            let orderRecipes = action.payload === 'asc' ? 
            state.filterRecipes.sort( function (a,b) {
                if(a.title.toLowerCase() > b.title.toLowerCase()){
                    return 1;
                }
                if(b.title.toLowerCase() > a.title.toLowerCase()){
                    return -1
                }
                    return 0;
            }) :
            state.filterRecipes.sort( function ( a, b) {
                if(a.title.toLowerCase() > b.title.toLowerCase()){
                    return -1;
                }
                if(b.title.toLowerCase() > a.title.toLowerCase()){
                    return 1
                }
                    return 0;
            })
            return{
                ...state,
                filterRecipes: orderRecipes
            }

        case 'FILTER_CREATED':
            let recipesFilter = [];
            if( action.payload === 'All'){
                
                recipesFilter = state.allRecipes;
                
            } else if( action.payload === 'Created'){
                
                recipesFilter = state.allRecipes.filter( e => e.MadeOnDb);
                
            } else if( action.payload === 'Api'){
                
                recipesFilter = state.allRecipes.filter( e => !e.MadeOnDb);
                
            }
            // console.log(action.payload);
            return{
                ...state,
                filterRecipes: recipesFilter
            }
            case 'FILTER_M_SCORE':
                const recipeMscore = state.allRecipes
                recipeMscore.sort(function(a,b){
                if(a.spoonacularScore > b.spoonacularScore){
                    return -1;
                    }
                if(b.spoonacularScore > a.spoonacularScore) {
                    return 1
                    }
                return 0;
                })
                const mostPopular = []
                for(let i=0; i<4; i++){
                    mostPopular.push(recipeMscore[i])
                }
                return{
                    ...state,
                    filterRecipes:mostPopular
                }

            case 'ORDER_BY_SCORE':
                    let orderScore = action.payload === 'min' ? 
                    state.filterRecipes.sort( function (a,b) {
                        if(a.spoonacularScore > b.spoonacularScore){
                            return 1;
                        }
                        if(b.spoonacularScore > a.spoonacularScore) {
                            return -1
                        }
                            return 0;
                    }) :
                    state.filterRecipes.sort( function ( a, b) {
                        if(a.spoonacularScore > b.spoonacularScore){
                            return -1;
                        }
                        if(b.spoonacularScore > a.spoonacularScore){
                            return 1
                        }
                            return 0;
                    })
                    return{
                        ...state,
                        filterRecipes: orderScore
                    }
                    
            case 'GET_BY_NAME':
                return{
                    ...state,
                    filterRecipes: action.payload
                }
            case 'GET_DETAILS':
                return {
                    ...state,
                    detail: action.payload
                }
            case 'GET_DETAILRESET':
                let reset = []
                return{
                    ...state,
                    detail:reset
                }
        default:
                return state;
            
    }
}

export default rootReducer;