// import InfiniteScroll from 'infinite-scroll';
// import libraries
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import classes
import PostApiService from './js/posts-servise';
import LoadMoreBtn from './js/load-more-btn';
import PageLoadStatus from './js/load-status';
import formSticky from './js/form-sticky';
// get elements
const refs = {
  formSearch: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};
// Create exemples classes
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const pageLoadStatus = new PageLoadStatus({
  selector: '.page-load-status',
});

const postApiService = new PostApiService();
const lightbox = new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  captionsData: 'alt',
  enableKeyboard: true,
});
const obsOptions = {
  root: null,
  rootMargin: '100px',
  treshold: 1,
};
const observer = new IntersectionObserver(onLoading, obsOptions);

// Make add event listener
refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
window.addEventListener('scroll', formSticky);

// Event search btn
function onSearch(e) {
  e.preventDefault();
  pageLoadStatus.hide();

  postApiService.query = e.target.searchQuery.value.trim();
  loadMoreBtn.show();
  postApiService.resetPage();
  clearGallery();
  fetchPosts();
}

function onLoadMore() {
  fetchPosts();

  pageLoadStatus.show();
  observer.observe(pageLoadStatus.refs.pageLoadStatus);
}

// Get posts
function fetchPosts() {
  loadMoreBtn.hide();
  pageLoadStatus.loadingShow();

  postApiService.fetchPost().then(data => {
    const curentPage = postApiService.page - 1;
    postApiService.hits = data.totalHits;

    if (!data.totalHits) {
      loadMoreBtn.hide();
      pageLoadStatus.errorShow();

      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (!data.hits.length) {
      loadMoreBtn.hide();
      pageLoadStatus.lastElemShow();
      return;
    }
    renderPost(data.hits);
    if (curentPage === 1) {
      Notify.success(`Hooray! We found ${postApiService.hits} images.`);
      loadMoreBtn.show();
    }
    pageLoadStatus.enable();
  });
}
// Create markup posts
function renderPost(data) {
  let markupPost = data
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__item" href="${largeImageURL}">
                  <div class="photo-card">
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${likes}</p>
                        <p class="info-item"><b>Views</b> ${views}</p>
                        <p class="info-item"><b>Comments</b> ${comments}</p>
                        <p class="info-item"><b>Downloads</b> ${downloads}</p>
                      </div>
                    </div>
                 </a>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markupPost);
  lightbox.refresh();
  // smoothScroll();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function onLoading(entries) {
  await entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.isIntersecting);
      fetchPosts();
    }
  });
}
