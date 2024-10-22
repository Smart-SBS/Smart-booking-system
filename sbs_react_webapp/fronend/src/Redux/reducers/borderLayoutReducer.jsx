const initialState = {
  borderLayout: '', // Initial state for borderLayout
};

const borderLayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BORDER_LAYOUT':
      return {
        ...state,
        borderLayout: action.payload,
      };
    default:
      return state;
  }
};

export default borderLayoutReducer;