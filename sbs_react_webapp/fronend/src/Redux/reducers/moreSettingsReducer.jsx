const initialState = {
  boxLayout: '', // Initial state for boxLayout
  monochrome: '', // Initial state for monochrome
  borderRadius: '',
  iconColor: '',
  themeMode: '',
  screenWidth: '',
};

export const boxLayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOX_LAYOUT':
      return {
        ...state,
        boxLayout: action.payload,
      };
    default:
      return state;
  }
};

export const monochromeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MONOCHROME':
      return {
        ...state,
        monochrome: action.payload,
      };
    default:
      return state;
  }
};

export const borderRadiusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BORDER_RADIUS':
      return {
        ...state,
        borderRadius: action.payload,
      };
    default:
      return state;
  }
};

export const iconColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ICON_COLOR':
      return {
        ...state,
        iconColor: action.payload,
      };
    default:
      return state;
  }
};

export const themeModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME_MODE':
      return {
        ...state,
        themeMode: action.payload,
      };
    default:
      return state;
  }
};

export const screenWidthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCREEN_WIDTH':
      return {
        ...state,
        screenWidth: action.payload,
      };
    default:
      return state;
  }
};
