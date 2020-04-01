import Search from './models/Search'

// Global state of the app
const state = {}

const constrolSearch = async () => {
    // 1. Get the query from the view
    const query = 'pizza'

    if( query ){
        // 2. Create new search object an add to state
        state.search = new Search( query )
        // console.log( state.search )

        // 3. Prepare UI for results

        // 4. Search for recipes
        await state.search.getResults()

        // 5. Render results on UI
        console.log( state.search.result )
    }


}

document.querySelector( '.search' ).addEventListener( 'submit', e =>{
    e.preventDefault()
    constrolSearch()
})

