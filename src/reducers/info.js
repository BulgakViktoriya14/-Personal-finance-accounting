const initialState =  {
        userEmail: "",
        userName: "",
        userSum: 0,
        cardsIncome: [
            {id: "card1",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
            {id: "card2",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
            {id: "card3",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
            {id: "card4",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"},
            {id: "card5",name: "Зарплата за ноябрь", sum: 200, category: "Зарплата", date: "03.11.2020", description: "Моя зарпата за ноябрь"}
        ],
        cardsExpenses: [
            {id: "card1",name: "Поход в магазин", sum: 50, category: "Магазин", date: "03.11.2020", description: "яйца, сметана, фрукты, тетради, книги"},
            {id: "card2",name: "Оплата проездного", sum: 15, category: "Транспорт", date: "03.11.2020", description: "метро на 15 дней"},
        ],
}


export default function userInfo(state = initialState, action) {
        switch (action.type) {
            case  "SET_USER_NAME":
                return {...state, userName: action.payload};
            case "SET_USER_EMAIL":
                return {...state, userEmail: action.payload};
            case "SET_USER_SUM":
                return {...state, userSum: action.payload};
            default:
                return state;
        }
}