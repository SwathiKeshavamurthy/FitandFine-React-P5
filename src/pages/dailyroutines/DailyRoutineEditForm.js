import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/DailyRoutineCreateEditForm.module.css';

function DailyRoutineEditForm() {
  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [routineData, setRoutineData] = useState({
    person_name: '',
    date: '',
    wake_up_time: '',
    breakfast_time: '',
    lunch_time: '',
    dinner_time: '',
    total_calorie_intake: '',
    water_intake: '',
    sleep_time: '',
    workout_minutes: '',
    junk: false,
    mood: 'happy',
  });

  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        const { data } = await axiosReq.get(`/dailyroutines/${id}/`);
        setRoutineData(data);
      } catch (err) {
        toast.error('Failed to fetch daily routine data.');
      }
    };
    fetchRoutineData();
  }, [id]);

  const {
    person_name,
    date,
    wake_up_time,
    breakfast_time,
    lunch_time,
    dinner_time,
    total_calorie_intake,
    water_intake,
    sleep_time,
    workout_minutes,
    junk,
    mood,
  } = routineData;

  const handleChange = (event) => {
    setRoutineData({
      ...routineData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setRoutineData({
      ...routineData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put(`/dailyroutines/${id}/`, routineData);
      toast.success('Daily routine updated successfully!');
      history.push('/dailyroutines');
    } catch (err) {
      setErrors(err.response?.data);
      toast.error('Failed to update daily routine.');
    }
  };

  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}>Edit Daily Routine</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="person_name">
          <Form.Label>Person Name</Form.Label>
          <Form.Control
            type="text"
            name="person_name"
            value={person_name}
            onChange={handleChange}
          />
          {errors?.person_name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
          />
          {errors?.date?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="wake_up_time">
          <Form.Label>Wake Up Time</Form.Label>
          <Form.Control
            type="time"
            name="wake_up_time"
            value={wake_up_time}
            onChange={handleChange}
          />
          {errors?.wake_up_time?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="breakfast_time">
          <Form.Label>Breakfast Time</Form.Label>
          <Form.Control
            type="time"
            name="breakfast_time"
            value={breakfast_time}
            onChange={handleChange}
          />
          {errors?.breakfast_time?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="lunch_time">
          <Form.Label>Lunch Time</Form.Label>
          <Form.Control
            type="time"
            name="lunch_time"
            value={lunch_time}
            onChange={handleChange}
          />
          {errors?.lunch_time?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="dinner_time">
          <Form.Label>Dinner Time</Form.Label>
          <Form.Control
            type="time"
            name="dinner_time"
            value={dinner_time}
            onChange={handleChange}
          />
          {errors?.dinner_time?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="total_calorie_intake">
          <Form.Label>Total Calorie Intake</Form.Label>
          <Form.Control
            type="number"
            name="total_calorie_intake"
            value={total_calorie_intake}
            onChange={handleChange}
          />
          {errors?.total_calorie_intake?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="water_intake">
          <Form.Label>Water Intake (ml)</Form.Label>
          <Form.Control
            type="number"
            name="water_intake"
            value={water_intake}
            onChange={handleChange}
          />
          {errors?.water_intake?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="sleep_time">
          <Form.Label>Sleep Time</Form.Label>
          <Form.Control
            type="time"
            name="sleep_time"
            value={sleep_time}
            onChange={handleChange}
          />
          {errors?.sleep_time?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="workout_minutes">
          <Form.Label>Workout Minutes</Form.Label>
          <Form.Control
            type="number"
            name="workout_minutes"
            value={workout_minutes}
            onChange={handleChange}
          />
          {errors?.workout_minutes?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="mood">
          <Form.Label>Mood</Form.Label>
          <Form.Control
            as="select"
            name="mood"
            value={mood}
            onChange={handleChange}
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="tired">Tired</option>
            <option value="energetic">Energetic</option>
            <option value="stressed">Stressed</option>
          </Form.Control>
          {errors?.mood?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group controlId="junk">
          <Form.Check
            type="checkbox"
            label="Did you consume junk food?"
            name="junk"
            checked={junk}
            onChange={handleCheckboxChange}
          />
          {errors?.junk?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <div className={styles.ButtonGroup}>
          <Button
            type="submit"
            className={`${styles.Button} ${styles.UpdateButton}`}
          >
            Update
          </Button>
          <Button
            className={`${styles.Button} ${styles.CancelButton}`}
            onClick={() => history.push('/dailyroutines')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default DailyRoutineEditForm;
