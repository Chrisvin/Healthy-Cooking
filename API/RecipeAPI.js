import { SPOONACULAR_API_KEY } from '../Constants';

export function getRecipes(query, number, offset, responseHandler) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query.length>0 ? query : ''}&number=${number}&offset=${offset}&addRecipeInformation=true`)
        .then(response => response.json())
        .then(responseJson => {
            responseHandler(responseJson, query);
        })
        .catch((error) => {
            console.error(error);
        });
}