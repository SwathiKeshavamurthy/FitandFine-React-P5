import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import { toast } from 'react-toastify';
import styles from "../../styles/Collaborate.module.css";
import image from "../../assets/about.webp";

const Collaborate = () => {
  const [collaborateData, setCollaborateData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollaborateData({
      ...collaborateData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/collaborate/", collaborateData);
      toast.success("Message sent successfully!");
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
      toast.error("Failed to send message.");
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  const { name, email, message } = collaborateData;

  return (
    <Container className={styles.CollaborateContainer}>
      <Row className="my-4">
        <Col>
          <img src={image} alt="Fit and Fine" className={styles.TopImage} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h1>About Fit and Fine</h1>
          <p>
            Welcome to Fit&amp;Fine, your ultimate fitness companion designed to help you achieve your health and wellness goals. Our platform is built for fitness enthusiasts of all levels, from beginners to seasoned athletes, providing the tools and community support you need to stay motivated and on track.
            At Fit&amp;Fine, we believe that fitness is a journey best taken together. Our mission is to create a supportive and inspiring community where users can set personal goals, track their progress, share their achievements, and shine together. With a wide range of features, including personalized daily routines, social life, and challenges, Fit&amp;Fine is here to help you smile through every step of your fitness journey.
          </p>
          <p>
            Join Fit&amp;Fine today and become a part of our thriving community. Set your goals, sweat through the challenges, share your journey, shine with your achievements, and smile with pride. Together, we can achieve greatness.
            Fit&amp;Fine: Set. Sweat. Share. Shine.
            On this page, you can reach out to us for collaboration opportunities.
            Please fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Collaborate with Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
              {errors.name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              {errors.email?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={message}
                onChange={handleChange}
                required
              />
              {errors.message?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <div className={styles.ButtonGroup}>
              <Button type="submit" className={`${styles.Button} ${styles.SubmitButton}`}>
                Submit
              </Button>
              <Button
                type="button"
                className={`${styles.Button} ${styles.CancelButton}`}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Collaborate;
