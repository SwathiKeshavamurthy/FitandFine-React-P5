import React from "react";
import styles from "../../styles/Comment.module.css";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Comment = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    content,
    created_at,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Media>
      <Link to={`/profiles/${profile_id}`}>
        <Avatar src={profile_image} height={45} />
      </Link>
      <Media.Body className="ml-2">
        <span className={styles.Owner}>{owner}</span>
        <span className={styles.Date}>{created_at}</span>
        <p>{content}</p>
        {is_owner && (
          <MoreDropdown handleDelete={handleDelete} />
        )}
      </Media.Body>
    </Media>
  );
};

export default Comment;
