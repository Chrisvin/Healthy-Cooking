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