import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import styles from './App.module.css';
import { Container } from 'react-bootstrap';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostEditForm from "./pages/posts/PostEditForm";
import PostPage from "./pages/posts/PostPage"; 
import PostsPage from "./pages/posts/PostsPage";
import MyCommentsList from "./pages/posts/MyCommentsList";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import DailyRoutineCreateForm from './pages/dailyroutines/DailyRoutineCreateForm';
import DailyRoutineEditForm from './pages/dailyroutines/DailyRoutineEditForm';
import MyDailyRoutineList from './pages/dailyroutines/MyDailyRoutineList';
import Collaborate from './pages/collaborate/Collaborate';
import ChallengesPage from "./pages/challenges/ChallengesPage";
import UserChallengesPage from "./pages/challenges/UserChallengesPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <Router>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PostsPage message="No results found. Adjust the search keyword." />
              )}
            />
            <Route
              exact
              path="/profile/feed"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route
              exact
              path="/profile/likes"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or like a post."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              )}
            />
            <Route
              exact
              path="/profile/comments"
              render={() => (
                <MyCommentsList
                  message="No comments found. Adjust the search keyword or comment on a post."
                />
              )}
            />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/posts/create" render={() => <PostCreateForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
            <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
            <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />}/>
            <Route exact path="/dailyroutines/create" component={DailyRoutineCreateForm} />
            <Route exact path="/dailyroutines" component={MyDailyRoutineList} />
            <Route exact path="/dailyroutines/:id/edit" component={DailyRoutineEditForm} />
            <Route exact path="/collaborate" component={Collaborate} />
            <Route exact path="/challenges" render={() => <ChallengesPage />} />
            <Route exact path="/my-challenges" render={() => <UserChallengesPage />} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
