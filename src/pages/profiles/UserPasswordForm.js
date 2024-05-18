import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";

const UserPasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const { old_password, new_password1, new_password2 } = passwordData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post(`/dj-rest-auth/password/change/`, passwordData);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="old_password"
            value={old_password}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.old_password?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password1"
            value={new_password1}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.new_password1?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password2"
            value={new_password2}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.new_password2?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
          Change Password
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default UserPasswordForm;