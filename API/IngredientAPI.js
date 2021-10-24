/**
 * Made by Chrisvin Jem Peniel - 2020mt12033@wilp.bits-pilani.ac.in
 */

import { SPOONACULAR_API_KEY } from '../Constants';

export function getIngredients(query, number, offset, responseHandler) {
    fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${SPOONACULAR_API_KEY}&query=${query.length>0 ? query : 'a'}&number=${number}&offset=${offset}&metaInformation=true`)
        .then(response => response.json())
        .then(responseJson => {
            responseHandler(responseJson, query);
        })
        .catch((error) => {
            console.error(error);
        });
}

export function getIngredientInformation(id, responseHandler) {
    fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${SPOONACULAR_API_KEY}`)
        .then(response => response.json())
        .then(responseJson => {
            responseHandler(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
}