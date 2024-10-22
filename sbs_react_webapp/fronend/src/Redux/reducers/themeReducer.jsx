const initialState = {
  themeColor: '', // Initial state for themeColor
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME_COLOR':
      return {
        ...state,
        themeColor: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
