import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/DailyRoutineCreateEditForm.module.css';

const DailyRoutineCreateForm = () => {
  const [routineData, setRoutineData] = useState({
    person_name: "",
    date: "",
    wake_up_time: "",
    breakfast_time: "",
    lunch_time: "",
    dinner_time: "",
    total_calorie_intake: "",
    water_intake: "",
    sleep_time: "",
    workout_minutes: "",
    junk: false,
    mood: "happy",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setRoutineData((prevRoutineData) => ({
      ...prevRoutineData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post('/dailyroutines/', routineData);
      history.push('/mydailyroutines');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <h1>Create Daily Routine</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="person_name">
          <Form.Label>Person Name</Form.Label>
          <Form.Control
            type="text"
            name="person_name"
            value={routineData.person_name}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.person_name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={routineData.date}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.date?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="wake_up_time">
          <Form.Label>Wake Up Time</Form.Label>
          <Form.Control
            type="time"
            name="wake_up_time"
            value={routineData.wake_up_time}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.wake_up_time?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="breakfast_time">
          <Form.Label>Breakfast Time</Form.Label>
          <Form.Control
            type="time"
            name="breakfast_time"
            value={routineData.breakfast_time}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.breakfast_time?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="lunch_time">
          <Form.Label>Lunch Time</Form.Label>
          <Form.Control
            type="time"
            name="lunch_time"
            value={routineData.lunch_time}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.lunch_time?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="dinner_time">
          <Form.Label>Dinner Time</Form.Label>
          <Form.Control
            type="time"
            name="dinner_time"
            value={routineData.dinner_time}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.dinner_time?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="total_calorie_intake">
          <Form.Label>Total Calorie Intake</Form.Label>
          <Form.Control
            type="number"
            name="total_calorie_intake"
            value={routineData.total_calorie_intake}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.total_calorie_intake?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="water_intake">
          <Form.Label>Water Intake (ml)</Form.Label>
          <Form.Control
            type="number"
            name="water_intake"
            value={routineData.water_intake}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.water_intake?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="sleep_time">
          <Form.Label>Sleep Time</Form.Label>
          <Form.Control
            type="time"
            name="sleep_time"
            value={routineData.sleep_time}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.sleep_time?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="workout_minutes">
          <Form.Label>Workout Minutes</Form.Label>
          <Form.Control
            type="number"
            name="workout_minutes"
            value={routineData.workout_minutes}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.workout_minutes?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="junk">
          <Form.Check
            type="checkbox"
            label="Junk food consumed"
            name="junk"
            checked={routineData.junk}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.junk?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="mood">
          <Form.Label>Mood</Form.Label>
          <Form.Control
            as="select"
            name="mood"
            value={routineData.mood}
            onChange={handleChange}
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="tired">Tired</option>
            <option value="energetic">Energetic</option>
            <option value="stressed">Stressed</option>
          </Form.Control>
        </Form.Group>
        {errors.mood?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

export default DailyRoutineCreateForm;
