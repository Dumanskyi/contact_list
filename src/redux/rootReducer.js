

const initialState = {
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





// {
//   name: 'Alexandra', 
//   surname: "Breus",
//   age: 20, 
//   birthday: '27-12-1995',
//   phone: '+38 (067) 187 1839',
//   email: 'someMail_01@gmail.com',
//   instagram: '@misterGreen',
//   _id: shortID(),
// },
// {
//   name: 'Alexandr', 
//   surname: "Teus", 
//   age: 21,
//   birthday: '27-12-1995',
//   phone: '+38 (067) 322 1839',
//   email: 'someMail_02@gmail.com',
//   instagram: '@misterWhite',
//   _id: shortID()
// },
// {
//   name: 'Arthur', 
//   surname: "Fomes", 
//   age: 22,
//   birthday: '27-07-1995',
//   phone: '+38 (067) 777 1839',
//   email: 'someMail_03@gmail.com',
//   instagram: '@misterBrown',
//   _id: shortID()
// },
// {
//   name: 'Boris', 
//   surname: "Ramiras", 
//   age: 21,
//   birthday: '14-01-1995',
//   phone: '+38 (067) 152 1839',
//   email: 'someMail_04@gmail.com',
//   instagram: '@misterRed',
//   _id: shortID()
// },
// {
//   name: 'Bogdan', 
//   surname: "Radriges", 
//   age: 22,
//   birthday: '12-07-1995',
//   phone: '+38 (067) 369 1839',
//   email: 'someMail_05@gmail.com',
//   instagram: '@misterPink',
//   _id: shortID()
// },
// {
//   name: 'Vladimir', 
//   surname: "Mahitas", 
//   age: 21,
//   birthday: '14-08-1995',
//   phone: '+38 (067) 285 1839',
//   email: 'someMail_06@gmail.com',
//   instagram: '@misterOrange',
//   _id: shortID()
// },



