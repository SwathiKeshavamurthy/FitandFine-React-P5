import React from "react";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/DailyRoutine.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const DailyRoutine = ({
  id,
  owner,
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
  setRoutines,
}) => {
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/dailyroutines/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/dailyroutines/${id}/`);
      setRoutines((prevRoutines) => ({
        ...prevRoutines,
        results: prevRoutines.results.filter((routine) => routine.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.DailyRoutine}>
      <Card.Body>
        <Card.Text><strong>Person Name:</strong> {person_name || "N/A"}</Card.Text>
        <Card.Text><strong>Date:</strong> {date}</Card.Text>
        <Card.Text><strong>Wake Up Time:</strong> {wake_up_time}</Card.Text>
        <Card.Text><strong>Breakfast Time:</strong> {breakfast_time}</Card.Text>
        <Card.Text><strong>Lunch Time:</strong> {lunch_time}</Card.Text>
        <Card.Text><strong>Dinner Time:</strong> {dinner_time}</Card.Text>
        <Card.Text><strong>Total Calorie Intake:</strong> {total_calorie_intake}</Card.Text>
        <Card.Text><strong>Water Intake:</strong> {water_intake} ml</Card.Text>
        <Card.Text><strong>Sleep Time:</strong> {sleep_time}</Card.Text>
        <Card.Text><strong>Workout Minutes:</strong> {workout_minutes} min</Card.Text>
        <Card.Text><strong>Junk Food Consumed:</strong> {junk ? "Yes" : "No"}</Card.Text>
        <Card.Text><strong>Mood:</strong> {mood}</Card.Text>
        {isOwner && (
          <div className={styles.ButtonGroup}>
            <button onClick={handleEdit} className={styles.EditButton}>
              Edit
            </button>
            <button onClick={handleDelete} className={styles.DeleteButton}>
              Delete
            </button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DailyRoutine;
