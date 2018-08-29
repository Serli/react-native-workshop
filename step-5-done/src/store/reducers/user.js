const defaultState = {
  avatar: require('../../assets/defaultPic.png'),
};
  
export default user = (state = defaultState, action) => {
  let nextState
  switch (action.type) {
  case 'UPDATE_AVATAR':
    nextState = {
      ...state,
      avatar: action.value
    }
    return nextState || state
  default:
    return state
  }
}