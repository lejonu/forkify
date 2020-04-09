import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'
// elements
// Global state of the app
const state = {}

const constrolSearch = async () => {
    // 1. Get the query from the view
    const query = searchView.getInput()
    // console.log( query )

    if( query ){
        // 2. Create new search object an add to state
        state.search = new Search( query )
        // console.log( state.search )

        // 3. Prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader( elements.searchRes )

        // 4. Search for recipes
        await state.search.getResults()

        // 5. Render results on UI
        // console.log( state.search.result )
        clearLoader()
        searchView.renderResults( state.search.result )
    }
}

elements.searchForm.addEventListener( 'submit', e =>{
    e.preventDefault()
    constrolSearch()
})

elements.searchResPage.addEventListener( 'click', e => {
    const btn = e.target.closest( '.btn-inline' )
    if( btn ){
        const goToPage = parseInt( btn.dataset.goto, 10 )
        searchView.clearResults()
        searchView.renderResults( state.search.result, goToPage )
    }
})

/** 
 * Recipe Controller
 */

 const r = new Recipe( 47746 )
 r.getRecipe()
 console.log( r )