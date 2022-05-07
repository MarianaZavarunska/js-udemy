import 'core-js';
import 'regenerator-runtime/runtime.js';
import { async } from 'regenerator-runtime/runtime.js';

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';



///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // update result
    resultView.update(model.getSearchResultPage());

    bookmarksView.update(model.state.bookmarks)

    // loading recipe

    await model.loadRecipe(id);

    //rendering recipe

    recipeView.render(model.state.recipe);


  } catch (error) {
    recipeView.renderError();
    console.log(error);
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

const controlAddBookmark = function () {
  // Add or Remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(newRecipe);

    recipeView.render(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL 
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    addRecipeView.renderMessage();

    setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000);

  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }

}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmarked(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

