import React from 'react';
import { Form, Container, Row, Col, Image } from 'react-bootstrap';

const HackTeamInvestorProfile = () => {
    return (
        <Container>
            <Row className="mt-4">
                <Col md={4}>
                    <Image
                        src="/path-to-default-image.jpg"
                        alt="Team Image"
                        rounded
                        fluid
                    />
                    <Form.Group className="mt-2">
                        <Form.Control id="teamImage" label="Upload Team Image" custom type="file"/>
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <Form>
                        <Form.Group controlId="teamName">
                            <Form.Label>Team Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Team Name" />
                        </Form.Group>
                        <Form.Group controlId="teamMembers">
                            <Form.Label>Team Members</Form.Label>
                            <Form.Control type="text" placeholder="Enter Team Members" />
                        </Form.Group>
                        <Form.Group controlId="budget">
                            <Form.Label>Budget (Read-only)</Form.Label>
                            <Form.Control type="text" readOnly value="$100,000" />
                        </Form.Group>
                        <Form.Group controlId="teamUsername">
                            <Form.Label>Team Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Team Username" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default HackTeamInvestorProfile;
