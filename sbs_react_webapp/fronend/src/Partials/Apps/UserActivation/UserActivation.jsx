/* eslint-disable react/prop-types */
const UserActivation = ({ isOpen, onClose, onConfirm, message, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '300px',
                }}
            >
                <div style={{ fontSize: '48px', color: '#FFA500' }}>!</div>
                <h2 id="modal-title">Are you sure?</h2>
                <p aria-live="polite">{message}</p>
                <div>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            margin: '10px',
                            borderRadius: '5px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1,
                        }}
                    >
                        {isLoading ? 'SENDING...' : 'RESEND ACTIVATION LINK'}
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
                            opacity: isLoading ? 0.7 : 1,
                        }}
                    >
                        NO, CANCEL!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserActivation;
