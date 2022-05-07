import { async } from 'regenerator-runtime';

import { API_URL, PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

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

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        console.log(data);

        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            img: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            bookmarked: false,
        };
        if (state.bookmarks.some(bk => bk.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch (e) {
        throw e;
    };
};

export const loadSearchResult = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.recipes = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
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

export const addBookmark = function (recipe) {
    // add 
    state.bookmarks.push(recipe);

    // mark recipe as bookmarked

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }
};

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }
};