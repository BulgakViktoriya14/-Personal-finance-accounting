const initialState = {
    user: "Булгак Виктория",
    sum: 0,
    cardsIncome: [
        {id: "card1",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
        {id: "card2",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
        {id: "card3",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
        {id: "card4",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
        {id: "card5",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"}
    ]
}

export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case  "SET_SUM":
            return {...state, sum: action.payload};
        case  "SET_CARDS_INCOME":
            return {...state, cardsIncome: action.payload};
        default: 
            return state;
    }
}