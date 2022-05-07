import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerPagination(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const totalPages = Math.ceil(this._data.recipes.length / this._data.perPage);


        // Page 1 , and there are others
        if (curPage === 1 && totalPages > 1) {
            return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }

        // Last page
        if (curPage === totalPages && totalPages > 1) {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1} </span>
            </button>
            `;
        }

        // Others page
        if (curPage > 1 && curPage < totalPages) {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1} </span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
            `;
        }

        // Only Page 1
        if (totalPages === 1) {
            return " ";
        }
    }
}

export default new PaginationView();