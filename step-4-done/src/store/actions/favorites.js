export const toggle = (movie) => {
    const action = { type: "TOGGLE_FAVORITE", value: movie }
    return action;
};

export const clear = () => {
    const action = { type: "CLEAR_FAVORITES" }
    return action;
};