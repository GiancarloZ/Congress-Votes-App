const initialState = { houseMembers: [], senateMember: [], loading: false };

function membersReducer(state = initialState, action){
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

      default:
        return state;
    }
}   

export default membersReducer