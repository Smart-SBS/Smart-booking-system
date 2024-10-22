export const setBoxLayout = (boxLayout) => {
    return {
        type: 'SET_BOX_LAYOUT',
        payload: boxLayout,
    };
};

export const setMonoChrome = (monochrome) => {
    return {
        type: 'SET_MONOCHROME',
        payload: monochrome,
    };
};

export const setBorderRadius = (borderRadius) => {
    return {
        type: 'SET_BORDER_RADIUS',
        payload: borderRadius,
    };
};

export const setIconColor = (iconColor) => {
    return {
        type: 'SET_ICON_COLOR',
        payload: iconColor,
    };
};

export const setSelectedMod = (themeMode) => {
    return {
        type: 'SET_THEME_MODE',
        payload: themeMode,
    };
};

export const setScreenWidth = (screenWidth) => {
    return {
        type: 'SET_SCREEN_WIDTH',
        payload: screenWidth,
    };
};