import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import themeReducer from './themeReducer';
import layoutReducer from './layoutReducer';
import strokeReducer from './strokeReducer';
import borderLayoutReducer from './borderLayoutReducer';
import { borderRadiusReducer, boxLayoutReducer, iconColorReducer, monochromeReducer, screenWidthReducer, themeModeReducer } from './moreSettingsReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  theme: themeReducer,
  layout: layoutReducer,
  stroke: strokeReducer,
  borderLayout: borderLayoutReducer,
  boxLayout: boxLayoutReducer,
  monochrome: monochromeReducer,
  borderRadius: borderRadiusReducer,
  iconColor: iconColorReducer,
  themeMode: themeModeReducer,
  screenWidth: screenWidthReducer,
});

export default rootReducer;
