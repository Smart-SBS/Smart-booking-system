const initialState = {
  borderStroke: '', // Initial state for borderStroke
};

const strokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BORDER_STROKE':
      return {
        ...state,
        borderStroke: action.payload,
      };
    default:
      return state;
  }
};

export default strokeReducer;