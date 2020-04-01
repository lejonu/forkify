import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/base'
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

        // 4. Search for recipes
        await state.search.getResults()

        // 5. Render results on UI
        // console.log( state.search.result )
        searchView.renderResults( state.search.result )
    }


}

elements.searchForm.addEventListener( 'submit', e =>{
    e.preventDefault()
    constrolSearch()
})

