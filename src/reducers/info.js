const initialState =  {
        idUser: 0,
        userEmail: "",
        userName: "",
        userSum: 0,
        userAvatar: '',
        cardsIncome: [],
        cardsExpenses: [],
}


export default function userInfo(state = initialState, action) {
        switch (action.type) {
            case  "SET_USER_ID":
                return {...state, idUser: action.payload};
            case  "SET_USER_NAME":
                return {...state, userName: action.payload};
            case "SET_USER_EMAIL":
                return {...state, userEmail: action.payload};
            case "SET_USER_SUM":
                return {...state, userSum: action.payload};
            case "SET_USER_AVATAR":
                return {...state, userAvatar: action.payload};
            case "SET_USER_INCOME_CARDS":
                return {...state, cardsIncome: action.payload};
            case "SET_USER_EXPENSES_CARDS":
                return {...state, cardsExpenses: action.payload};
            default:
                return state;
        }
}