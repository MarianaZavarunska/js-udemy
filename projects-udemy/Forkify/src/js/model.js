import { async } from 'regenerator-runtime';

import { API_KEY, API_URL, PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';
// import { sendJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        page: 1,
        perPage: PER_PAGE,
        recipes: [],
    },
    bookmarks: [],
};

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        img: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
};
export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
        state.recipe = createRecipeObject(data);

        console.log(state.recipe);
        if (state.bookmarks.some(bk => bk.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch (e) {
        throw e;
    };
};

export const loadSearchResult = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

        state.search.recipes = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                img: rec.image_url,
                ...(rec.key && { key: rec.key }),
            };
        });
        state.search.page = 1;

    } catch (error) {
        throw e;
    }
};

export const getSearchResultPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * 10;
    const end = page * 10;

    return state.search.recipes.slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

export const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    // add 
    state.bookmarks.push(recipe);

    // mark recipe as bookmarked

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }
    persistBookmarks();
};

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }
    persistBookmarks();
};

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearLocaleStorage = function () {
    localStorage.clear('bookmarks');
};

// clearLocaleStorage();

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                // const ingArr = ing[1].replaceAll(' ', '').split(',');
                const ingArr = ing[1].split(',').map(el => el.trim());
                if (ingArr.length !== 3) throw new Error('Wrong ingredient format!');

                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description };
            });
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };

        const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (error) {
        throw error;
    }

}

