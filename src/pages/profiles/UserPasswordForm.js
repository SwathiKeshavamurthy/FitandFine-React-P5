import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { axiosReq } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';
import btnStyles from '../../styles/Button.module.css';

const UserPasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    new_password1: '',
    new_password2: '',
  });

  const { new_password1, new_password2 } = passwordData;
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
      toast.success('Password changed successfully!');
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
      toast.error('Failed to change password.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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

        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          type="submit"
        >
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
