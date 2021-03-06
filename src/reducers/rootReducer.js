const initialState = { houseMembers: [], senateMember: [], bills: [], loading: false, users: [], currentUser:[] };

function rootReducer(state = initialState, action){
    switch(action.type) {
        case 'LOADING_HOUSE_MEMBERS':
            return {
                ...state,
                houseMembers: action.members,
                loading: true
            }
        case 'LOADING_SENATE_MEMBERS':
            return {
                ...state,
                senateMembers: action.members,
                loading: true
            }   
        case 'ADD_HOUSE_MEMBERS':
            return {
            ...state,
            houseMembers: action.members,
            loading: false
            }

        case 'ADD_SENATE_MEMBERS':
            return {
            ...state,
            senateMembers: action.members,
            loading: false
            }

        case 'LOADING_BILLS':
            return {
                ...state,
                bills: action.bills,
                loading: true
            }   
        case 'ADD_BILLS':
            return {
                ...state,
                bills: action.bills,
                loading: false
            }
        case 'POST_MEMBERS':
            return {
                ...state,
                senateMembers: action.members,
                houseMembers: action.members,
            }
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.user
            }
        case 'CLEAR_USER':
            return {
                ...state,
                currentUser: {}
            };
        case 'LOAD_USERS':
            return {
                ...state,
                users: action.user
            };
        default:
            return state;
        }
}   

export default rootReducer