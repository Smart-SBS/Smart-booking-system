/* eslint-disable react/prop-types */
import { IoWarningOutline } from "react-icons/io5";

const LoginModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <div className="flex items-center justify-center" style={{ fontSize: '48px', color: '#F44336' }}><IoWarningOutline /></div>
                <h2>Login Required</h2>
                <p>{message}</p>
                <div>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            margin: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        OK
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: '#808080',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            margin: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal