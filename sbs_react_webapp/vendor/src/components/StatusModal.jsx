/* eslint-disable react/prop-types */
import { FaRegBell } from "react-icons/fa";

const StatusModal = ({ isOpen, onClose, onConfirm, message, isLoading }) => {
    if (!isOpen) return null;

    const isDeactivate = message.toLowerCase().includes('deactivate');

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
                <div className="flex items-center justify-center" style={{ fontSize: '48px', color: isDeactivate ? '#F44336' : '#4CAF50' }}><FaRegBell /></div>
                <p className="my-3">{message}</p>
                <div>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        style={{
                            backgroundColor: isDeactivate ? '#F44336' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            margin: '10px',
                            borderRadius: '5px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isDeactivate ? 'DEACTIVATE' : 'ACTIVATE'}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        style={{
                            backgroundColor: '#808080',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            margin: '10px',
                            borderRadius: '5px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        NO, CANCEL!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusModal;