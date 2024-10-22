/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ErrorComponent = ({ error }) => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Row className="justify-content-center w-100">
                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <h1 className="text-danger fw-bold mb-4 h2">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-secondary mb-4">
                                We're sorry, but we encountered an error while loading this page.
                            </p>
                            {error && (
                                <Alert variant="danger" className="mb-4">
                                    <Alert.Heading className="h6 fw-bold">Error details:</Alert.Heading>
                                    <p className="mb-0">
                                        {error.message || 'Unknown error'}
                                    </p>
                                </Alert>
                            )}
                            <div className="text-center">
                                <Button
                                    variant="success"
                                    onClick={handleReload}
                                >
                                    Try Again
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ErrorComponent;