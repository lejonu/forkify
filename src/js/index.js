import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import { elements, renderLoader, clearLoader } from './views/base'

// elements
// Global state of the app
const state = {}

// Testing
window.state = state

const controlSearch = async () => {
    // 1. Get the query from the view
    const query = searchView.getInput()
    // const query = 'pizza'

    // console.log( query )

    if( query ){
        // 2. Create new search object an add to state
        state.search = new Search( query )
        // console.log( state.search )

        // 3. Prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader( elements.searchRes )

        try {
            // 4. Search for recipes
            await state.search.getResults()

            // 5. Render results on UI
            // console.log( state.search.result )
            clearLoader()
            searchView.renderResults( state.search.result )
        } catch (error) {
            alert( 'Something went wrong with the search...' )
            clearLoader()
        }


    }
}

elements.searchForm.addEventListener( 'submit', e =>{
    e.preventDefault()
    controlSearch()
})

// window.addEventListener( 'load', e =>{
//     e.preventDefault()
//     controlSearch()
// })

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

//  const r = new Recipe( 47746 )
//  r.getRecipe()
//  console.log( r )

const controlRecipe = async () => {
    // Get the id from url
    const id = window.location.hash.replace( '#', '')
    console.log( id )

    if( id ){
        // Prepare UI for changes
        recipeView.clearRecipe()
        renderLoader( elements.recipe )

        // Highlight selected search item 
        if( state.search ) searchView.highLightSelected( id )

        // Create new recipe object
        state.recipe = new Recipe( id )

        // testing
        // window.r = state.recipe

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe()

            state.recipe.parseIngredients()

            // Calculate servings and time
            state.recipe.calcTime() 
            state.recipe.calcServings() 
        } catch (error) {
            alert( 'Error processing recipe' )
        }


        // Render recipe
        clearLoader()
        recipeView.renderRecipe( state.recipe )

    }
}

// window.addEventListener( 'hashchange', controlRecipe )
// window.addEventListener( 'load', controlRecipe)

[ 'hashchange', 'load' ].forEach( event => window.addEventListener( event, controlRecipe ))

// Handling recipe button clicks

const controlList = () => {
    if( !state.list ) state.list = new List()

    state.recipe.ingredients.forEach( e => {
        const item = state.list.addItem( e.count, e.unit, e.ingredient )

        listView.renderItem( item )
    })
}

// Handle delete and update list item events
elements.shopping.addEventListener( 'click', e => {
    const id = e.target.closest( '.shopping__item').dataset.itemid

    // Handle the delete button
    if( e.target.matches( '.shopping__delete, .shopping__delete *')){
        // Delete from state
        // throw Error( id )
        state.list.deleteItem( id )

        // Delete from UI
        listView.deleteItem( id )
    } 
    // Handle the count update
    else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }

})

/**
 * LIKE CONTROLLER
 */
const controlLike = () => {
    if( !state.likes ) state.likes = new Likes()

    const currenID = state.recipe.id

    // User has not yet liked current recipe
    if( !state.likes.isLiked( currenID )){
        // Add like to the state
        const newLike = state.likes.addLike(
            currenID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )
        // Toggle the like button

        // Add like to  UI list
        console.log( state.likes )
    }
    // User has yet liked current recipe
    else {
        // Remove Like from the state
        state.likes.deleteLike( currenID )
        // Toggle the like button

        // Remove like from UI list
        console.log( state.likes )
    }
}


elements.recipe.addEventListener( 'click', e => {
    
    if( e.target.matches( '.btn-decrease, .btn-decrease *')){
        // Decrease 
        if( state.recipe.servings > 1){
            state.recipe.updateServings( 'dec' )
            recipeView.updateServingsIngredients( state.recipe )
        }

    } else  if( e.target.matches( '.btn-increase, .btn-increase *')){
        // Decrease 
        state.recipe.updateServings( 'inc' )
        recipeView.updateServingsIngredients( state.recipe )
    } else if ( e.target.matches( '.recipe__btn--add, .recipe__btn--add *')){
        // Add ingredients 
        controlList( )
    } else if( e.target.matches( '.recipe__love, .recipe__love *')){
        // Like Controller
        controlLike()
    }

    // console.log( state.recipe )
})

window.l = new List()