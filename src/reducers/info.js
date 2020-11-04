const initialState = {
    user: "Булгак Виктория",
    sum: 0,
    cardsIncome: [
        {name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", descriptio: "Моя зарпата за ноябрь"},
        {name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", descriptio: "Моя зарпата за ноябрь"},
        {name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", descriptio: "Моя зарпата за ноябрь"},
        {name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", descriptio: "Моя зарпата за ноябрь"},
        {name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", descriptio: "Моя зарпата за ноябрь"}
    ]
}

export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case  "SET_SUM":
            return {...state, sum: action.payload};
        default: 
            return state;
    }
}