import renderSearchForm from './components/SearchForm'
import './style.css'
import './response.css'
import './fonts.css'
import './keyframes.css'


const $ = document.querySelector.bind(document)

/**
 *  Casting: conversão explícita de tipos
 */

const app = <HTMLDivElement>$('#app')
renderSearchForm(app)

const resultArea = document.createElement('div')
resultArea.id = 'result-area'
app.insertAdjacentElement('beforeend', resultArea)
