import axios from 'axios'
import { API_URL } from '../config'
import { getTvShow } from '../models/TVShow'
import renderTVShowCard from './TVShowCard'

export const $ = document.querySelector.bind(document)

 const http = axios.create({baseURL:
API_URL})

export const renderSearchForm = (
    container: HTMLElement) => {
const htmlContent = `
    <div>
    <from id= "search-from">
    <input type= "text" name= "filter" id="filter" placeholder="Digite o video que está procurando>
 <button id="search">Pesquisar</button>
 </form>
    
    
    </div>
`
container.innerHTML = htmlContent
    }

export const searchVideos = async () => {
    const params = new URLSearchParams(document.location.search)
    const filter = params.get('filter')
    if(filter){
        const response = await http.get('/videos',{
            params: {search: filter}
        })
        console.log(response)
        if(response.status == 200){
            const {data} = response
            const {list} = data
            console.log(list)
            const resultArea = <HTMLDivElement>$('#result-area')
            resultArea.innerHTML = ''
            list.forEach((jsonOBJ:any) =>{
                const webVideoThumb = getVideo(jsonOBJ)
                renderWebVideo(
                    webVideoThumb, resultArea)
                     
            })
        }
    }
}


searchVideos()