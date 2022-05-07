import icons from "url:../../img/icons.svg";

import View from "./View";
import previewView from "./previewView.js";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet!';
    _message = '';

    _generateMarkup() {
        return this._data.map(bk => previewView.render(bk, false)).join(' ');
    }
}

export default new BookmarksView();