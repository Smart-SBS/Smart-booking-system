/* eslint-disable react/prop-types */
const PopularModal = ({ isOpen, onClose, onConfirm, message, isLoading }) => {
    if (!isOpen) return null;

    const isMarkingPopular = message.toLowerCase().includes('popular');

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
                <div style={{ fontSize: '48px', color: isMarkingPopular ? '#4287f5' : '#f58442' }}>!</div>
                <h2>Are you sure?</h2>
                <p>{message}</p>
                <div>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        style={{
                            backgroundColor: isMarkingPopular ? '#4287f5' : '#f58442',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            margin: '10px',
                            borderRadius: '5px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isMarkingPopular ? 'MARK AS POPULAR' : 'MARK AS REGULAR'}
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

export default PopularModal;