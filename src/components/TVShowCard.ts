import TVShow from '../models/TVShow';

const imageNotFound = '/img/no-img-portrait-text.png'

const renderTVShowCard = (show: TVShow, container: HTMLElement) => {
    const htmlContent = `
        
        <div class="tv-card">
            <a id="modal-${show.id}" href="show.html?id=${show.id}"> 
                <div class="show-banner">
                    <img src="${show.imageUrl || imageNotFound}" alt="${show.name}">
                </div>

                <h3>${show.name}</h3>
            </a>
        </div>
    `
    container.innerHTML += htmlContent
}

export default renderTVShowCard