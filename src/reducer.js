export const initialState = {
    user: null,
    userName: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_USERNAME: "SET_USERNAME"
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        //whenever it gets the actiontype
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SET_USERNAME:
            return {
                ...state,
                userName: action.userName
            }
        default: 
            return state;
    }
}

export default reducer