const initialState = {
  layout: '', // Initial state for layout
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LAYOUT':
      return {
        ...state,
        layout: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;