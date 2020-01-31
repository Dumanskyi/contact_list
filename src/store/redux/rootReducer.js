
const initialState = {
  loading: false,
  sideBarIsOpen: false,
  myContacts: [],
  myFullContacts: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN":
      return { ...state, sideBarIsOpen: true };

    case "CLOSE":
      return { ...state, sideBarIsOpen: false };

    case "ADD_USER":
      let usersList = [...state.myContacts, action.payload];
      return { ...state, myContacts: usersList };

    case "GET_USER_FULL_INFO":
      let fullUsersList = [...state.myFullContacts, action.payload];
      return { ...state, myFullContacts: fullUsersList};

    case "EDIT_USER":
      let usersListEdit = state.myContacts.filter(
        user => user._id !== action.payload.Id
      );
      usersListEdit = [...usersListEdit, action.payload.data];
      return { ...state, myContacts: usersListEdit};

    case "EDIT_USER_FULL_INFO":
      let fullUsersListEdit = state.myFullContacts.filter(
        user => user._id !== action.payload.Id
      );
      fullUsersListEdit = [...fullUsersListEdit, action.payload.data];
      return {...state, myFullContacts : fullUsersListEdit};

    case "DELETE_USER":
      let contacts = state.myContacts.filter(
        user => user._id !== action.payload
      );
      return { ...state, myContacts: contacts };

    case "ALL_CONTACTS":
      let allContacts = [...action.payload];
      return { ...state, myContacts: allContacts };

    default:
      return state;
  }
}


