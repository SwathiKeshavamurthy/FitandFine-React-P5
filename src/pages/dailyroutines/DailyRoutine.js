import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { axiosRes } from "../../api/axiosDefaults";
import { toast } from 'react-toastify';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      toast.success("Daily routine deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete daily routine.");
    }
    setShowDeleteModal(false);
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
            <button onClick={() => setShowDeleteModal(true)} className={styles.DeleteButton}>
              Delete
            </button>
          </div>
        )}
      </Card.Body>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Daily Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this daily routine?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default DailyRoutine;
