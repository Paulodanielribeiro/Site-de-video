import axios from 'axios'
import { API_URL } from '../config'
import { getTvShow } from '../models/TVShow'
import renderTVShowCard from './TVShowCard'

const $ = document.querySelector.bind(document)
const http = axios.create({
    baseURL: API_URL,
})

const renderSearchForm = (container: HTMLElement) => {

    const htmlContent = `
    <div>
        <form id="search-form">
            <input type="text" name="filter" id="filter" placeholder="Digite o títuilo da série">
            <button id="search">Pesquisar</button>
        </form>
            <div id="loading">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    
    `

    container.innerHTML = htmlContent

    const button = <HTMLButtonElement>$('#search')

    const loading = <HTMLDivElement>$('#loading')
    button.addEventListener('click', () => {
        loading.style.display = "block"
    })

}


// const filter = async (event: Event) => {
const searchTVShows = async () => {

    // event.preventDefault()

    // const filter = <HTMLInputElement>$('#filter')
    // const queryText = filter.value

    const params = new URLSearchParams(document.location.search)
    const filter = params.get('filter')
    // document.querySelector('#loading').style.display = "block"

    // if (queryText) {
    if (filter) {
        const response = await http.get('/search/shows', {
            // params: {q: queryText}
            params: { q: filter }
        })

        if (response.status == 280) {

            const loading = <HTMLDivElement>$('#loading')

            window.addEventListener('load', () => {
                console.log('começou a carregar a página')
                loading.style.display = "block"
            })

            window.onload = () => {
                console.log('terminou de carregar a pagina')
                loading.style.display = "none"
            }

            const { data } = response
            const resultArea = <HTMLDivElement>$('#result-area')
            resultArea.innerHTML = ''

            data.forEach((jsonObj: any) => {
                const { show } = jsonObj
                const tvShow = getTvShow(show)
                renderTVShowCard(tvShow, resultArea)
            })

        }
    }
}

searchTVShows()

export default renderSearchForm
