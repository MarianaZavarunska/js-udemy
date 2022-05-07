import 'core-js';
import 'regenerator-runtime/runtime.js';
import { async } from 'regenerator-runtime/runtime.js';

import * as model from './model.js';
// import { recipeView, searchView, resultView, paginationView } from './views';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // update result
    resultView.update(model.getSearchResultPage());

    // loading recipe

    await model.loadRecipe(id);

    //rendering recipe

    recipeView.render(model.state.recipe);


  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    //render page
    resultView.render(model.getSearchResultPage());


    // render pagination
    paginationView.render(model.state.search);

  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  //render page
  resultView.render(model.getSearchResultPage(goToPage));


  // render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {

  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
};

init();

