import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/MyDailyRoutineList.module.css';

const MyDailyRoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const { data } = await axiosReq.get('/dailyroutines/');
        setRoutines(data);
      } catch (err) {
        setErrors(err.response?.data);
      }
    };

    fetchRoutines();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosReq.delete(`/dailyroutines/${id}/`);
      setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== id));
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <h1>My Daily Routines</h1>
      {errors && errors.map((error, idx) => (
        <Alert variant="warning" key={idx}>{error}</Alert>
      ))}
      <Row>
        {routines.map((routine) => (
          <Col md={4} key={routine.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{routine.person_name || 'My'}'s Routine on {routine.date}</Card.Title>
                <Card.Text>
                  <strong>Wake Up Time:</strong> {routine.wake_up_time} <br />
                  <strong>Breakfast Time:</strong> {routine.breakfast_time} <br />
                  <strong>Lunch Time:</strong> {routine.lunch_time} <br />
                  <strong>Dinner Time:</strong> {routine.dinner_time} <br />
                  <strong>Total Calorie Intake:</strong> {routine.total_calorie_intake} kcal <br />
                  <strong>Water Intake:</strong> {routine.water_intake} ml <br />
                  <strong>Sleep Time:</strong> {routine.sleep_time} <br />
                  <strong>Workout Minutes:</strong> {routine.workout_minutes} minutes <br />
                  <strong>Mood:</strong> {routine.mood} <br />
                  <strong>Junk Food Consumed:</strong> {routine.junk ? 'Yes' : 'No'}
                </Card.Text>
                <Link to={`/dailyroutines/${routine.id}/edit`}>
                  <Button variant="primary" className="mr-2">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(routine.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyDailyRoutineList;
