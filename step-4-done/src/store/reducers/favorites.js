const defaultState = {
  movies: [],
};

export default favorites = (state = defaultState, action) => {
  let nextState
  switch (action.type) {
  case 'TOGGLE_FAVORITE':
    const favoriteFilmIndex = state.movies.findIndex(item => item.id === action.value.id)
    if (favoriteFilmIndex !== -1) {
      nextState = {
        ...state,
        movies: state.movies.filter( (item, index) => index !== favoriteFilmIndex)
      }
    }
    else {
      nextState = {
        ...state,
        movies: [...state.movies, action.value]
      }
    }
    return nextState || state;
  case 'CLEAR_FAVORITES':
    nextState = {
      ...state,
      movies: []
    }
    return nextState || state
  default:
    return state
  }
}