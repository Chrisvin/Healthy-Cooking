/**
 * Made by Chrisvin Jem Peniel - 2020mt12033@wilp.bits-pilani.ac.in
 */

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

export function getRecipeInformation(id, includeNutrition, responseHandler) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=${includeNutrition}`)
        .then(response => response.json())
        .then(responseJson => {
            responseHandler(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
}