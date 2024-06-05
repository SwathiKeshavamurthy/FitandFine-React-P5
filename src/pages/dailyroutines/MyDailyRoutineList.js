import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useLocation, useHistory } from "react-router";
import { toast } from 'react-toastify';
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/noresults.JPG";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/MyDailyRoutineList.module.css";
import appStyles from "../../App.module.css";

function MyDailyRoutineList({ message = "No routines found.", filter = "" }) {
  const [routines, setRoutines] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const { pathname } = useLocation();
  const history = useHistory();
  const currentUser = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const { data } = await axiosReq.get(`/dailyroutines/?search=${searchTerm}&${filter}`);
        
        const filteredData = {
          ...data,
          results: data.results.filter(routine => routine.owner === currentUser?.username),
        };
        setRoutines(filteredData);
        setHasLoaded(true);
      } catch (err) {
        toast.error("Failed to fetch daily routines.");
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchRoutines();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, currentUser, searchTerm]);

  const handleEdit = (id) => {
    history.push(`/dailyroutines/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosReq.delete(`/dailyroutines/${id}/`);
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
    <Container className="mt-3">
      <Form
        className={styles.SearchBar}
        onSubmit={(event) => event.preventDefault()}
      >
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form.Control
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          type="text"
          className="mr-sm-2"
          placeholder="Search routines by person name"
        />
      </Form>
      {hasLoaded ? (
        <>
          {routines.results.length ? (
            <InfiniteScroll
              dataLength={routines.results.length}
              loader={<Asset spinner />}
              hasMore={!!routines.next}
              next={() => fetchMoreData(routines, setRoutines)}
            >
              <div className={styles.ExcelSheet}>
                <div className={styles.ExcelRow}>
                  <span className={styles.ExcelHeader}>#</span>
                  <span className={styles.ExcelHeader}>Person Name</span>
                  <span className={styles.ExcelHeader}>Date</span>
                  <span className={styles.ExcelHeader}>Wake Up Time</span>
                  <span className={styles.ExcelHeader}>Breakfast Time</span>
                  <span className={styles.ExcelHeader}>Lunch Time</span>
                  <span className={styles.ExcelHeader}>Dinner Time</span>
                  <span className={styles.ExcelHeader}>Total Calorie Intake</span>
                  <span className={styles.ExcelHeader}>Water Intake</span>
                  <span className={styles.ExcelHeader}>Sleep Time</span>
                  <span className={styles.ExcelHeader}>Workout Minutes</span>
                  <span className={styles.ExcelHeader}>Junk Food Consumed</span>
                  <span className={styles.ExcelHeader}>Mood</span>
                  <span className={styles.ExcelHeader}>Actions</span>
                </div>
                {routines.results.map((routine, index) => (
                  <div key={routine.id} className={styles.ExcelRow}>
                    <span className={styles.ExcelCell}>{index + 1}</span>
                    <span className={styles.ExcelCell}>{routine.person_name || "N/A"}</span>
                    <span className={styles.ExcelCell}>{routine.date}</span>
                    <span className={styles.ExcelCell}>{routine.wake_up_time}</span>
                    <span className={styles.ExcelCell}>{routine.breakfast_time}</span>
                    <span className={styles.ExcelCell}>{routine.lunch_time}</span>
                    <span className={styles.ExcelCell}>{routine.dinner_time}</span>
                    <span className={styles.ExcelCell}>{routine.total_calorie_intake}</span>
                    <span className={styles.ExcelCell}>{routine.water_intake} ml</span>
                    <span className={styles.ExcelCell}>{routine.sleep_time}</span>
                    <span className={styles.ExcelCell}>{routine.workout_minutes} min</span>
                    <span className={styles.ExcelCell}>{routine.junk ? "Yes" : "No"}</span>
                    <span className={styles.ExcelCell}>{routine.mood}</span>
                    <span className={styles.ExcelCell}>
                      <i
                        className={`fas fa-edit ${styles.EditIcon}`}
                        onClick={() => handleEdit(routine.id)}
                      ></i>
                      <i
                        className={`fas fa-trash ${styles.DeleteIcon}`}
                        onClick={() => { setShowDeleteModal(true); setRoutineToDelete(routine.id); }}
                      ></i>
                    </span>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : searchTerm ? (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message="No results found with that name." />
            </Container>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Daily Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this daily routine?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(routineToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MyDailyRoutineList;
