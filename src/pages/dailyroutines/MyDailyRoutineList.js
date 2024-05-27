import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import { useLocation, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/noresults.JPG";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/MyDailyRoutineList.module.css";

function MyDailyRoutineList({ message = "No routines found.", filter = "" }) {
  const [routines, setRoutines] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const { data } = await axiosReq.get(`/dailyroutines/?${filter}`);
        
        const filteredData = {
          ...data,
          results: data.results.filter(routine => routine.owner === currentUser?.username),
        };
        setRoutines(filteredData);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchRoutines();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, currentUser]);

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
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container className="mt-3">
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
                        onClick={() => handleDelete(routine.id)}
                      ></i>
                    </span>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <Container className={styles.Content}>
              <Asset src={NoResults} message="You haven't added any Daily Routines yet." />
            </Container>
          )}
        </>
      ) : (
        <Container className={styles.Content}>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
}

export default MyDailyRoutineList;
