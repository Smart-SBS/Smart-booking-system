import { useSelector, useDispatch } from 'react-redux';
import {
    closeAuthPopup,
    closeRegistrationPopup
} from '../redux/slices/authPopupSlice';
import AuthPopup from './AuthPopup';
import RegistrationPopup from './RegistrationPopup';

const AuthPopupWrapper = () => {
    const dispatch = useDispatch();
    const isAuthOpen = useSelector(state => state.authPopup.isAuthOpen);
    const isRegistrationOpen = useSelector(state => state.authPopup.isRegistrationOpen);

    const handleAuthClose = () => {
        dispatch(closeAuthPopup());
    };

    const handleRegistrationClose = () => {
        dispatch(closeRegistrationPopup());
    };

    const handleSuccessfulLogin = () => {
        dispatch(closeAuthPopup());
    };

    return (
        <>
            <AuthPopup
                isOpen={isAuthOpen}
                onClose={handleAuthClose}
                onSuccessfulLogin={handleSuccessfulLogin}
            />
            <RegistrationPopup
                isOpen={isRegistrationOpen}
                onClose={handleRegistrationClose}
            />
        </>
    );
};

export default AuthPopupWrapper;