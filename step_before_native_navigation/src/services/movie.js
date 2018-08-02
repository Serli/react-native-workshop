import { THE_MOVIE_DB } from '../api/constants'

export const getPopular = () => {
    return fetch(`${THE_MOVIE_DB.url}movie/popular?api_key=${THE_MOVIE_DB.key}&language=fr-FR&page=1`).then(response => response.json());
  }

export const getCredits = (movie_id) => {
    return fetch(`${THE_MOVIE_DB.url}movie/${movie_id}/credits?api_key=${THE_MOVIE_DB.key}`).then(response => response.json());
  }