import str from './models/Search'
console.log( str )

// import { add as a, multiply as m, ID } from './views/searchView'

import * as searchView from './views/searchView'

// console.log( `Using imported functions ${ ID, 2 } and ${ m( 3, 4 ) } and ${ a( 5, 5) }`)

console.log( `Using imported functions ${ searchView.ID, 2 } and ${ searchView.multiply( 3, 4 ) } and ${ searchView.add( 5, 5) }`)