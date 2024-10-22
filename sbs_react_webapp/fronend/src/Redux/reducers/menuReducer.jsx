const initialState = {
  menuTitle: '', // Initial state for menuTitle
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU_TITLE':
      return {
        ...state,
        menuTitle: action.payload,
      };
    default:
      return state;
  }
};

export default menuReducer;
