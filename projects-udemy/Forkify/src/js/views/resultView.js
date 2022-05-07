import icons from "url:../../img/icons.svg";

import View from "./View";
import previewView from "./previewView.js";
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe is found!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join(' ');
  }
}

export default new ResultView();