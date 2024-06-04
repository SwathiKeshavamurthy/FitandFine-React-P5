<div style="display: flex; align-items: center; justify-content: space-between;">
  <img src="documentation/screenshots/favicon.JPG" alt="Fit&Fine Logo" style="width: 50px; height: auto;"><h1 style="margin: 0;">Fit&Fine</h1>
  <img src="documentation/screenshots/favicon.JPG" alt="Fit&Fine Logo" style="width: 50px; height: auto;">
</div>

<h2 style="text-align: center;">Welcome</h2>


Link to Fit&Fine React Frontend Live website: [CLICK HERE!](https://fitandfine-react-p5-f5d23da9d77c.herokuapp.com/)

![Am I Responsive Image](documentation/screenshots/amiresponsive.JPG)

[Fit&Fine Django Rest Framework API Backend Live Link](https://fitandfine-drf-be560b223a3b.herokuapp.com/)

[Fit&Fine React Backend Github Repo](https://github.com/SwathiKeshavamurthy/FitandFine-P5)

# Introduction - Fit and Fine

Welcome to Fit and Fine, a comprehensive fitness and wellness platform designed to promote a healthy and active lifestyle. Fit and Fine connects individuals, fitness enthusiasts, and wellness experts, providing tools and resources to help you achieve your health goals. Our platform offers a variety of features to support your fitness journey, including challenge participation, daily routine tracking, and community interaction. Whether you are looking to improve your fitness, track your daily activities, or engage with a supportive community, Fit and Fine is your go-to destination for all things wellness.

Fit and Fine focuses on leveraging the latest web technologies, including React for the frontend and Django for the backend, ensuring a seamless and engaging user experience. It is designed for anyone passionate about fitness, from beginners to advanced athletes.

**Engage In**

Join Fit and Fine today and become part of a community dedicated to health and wellness. Whether you’re here to set new fitness goals, track your progress, or engage with others who share your passion, we welcome you to our platform. Let's embark on this fitness journey together and achieve a healthier, happier life!


# Table of Contents
- [Introduction - Fit and Fine](#introduction---fit-and-fine)
- [Table of Contents](#table-of-contents)
- [UX Experience](#ux-experience)
  - [Key Features](#key-features)
  - [User Goals](#user-goals)
  - [Planning](#planning)
  - [User Journey](#user-journey)
- [Design](#design)
  - [Colors](#colors)
  - [Fonts](#fonts)
    - [Logo and Branding](#logo-and-branding)
- [Project Planning](#project-planning)
  - [Strategy Plane](#strategy-plane)
  - [Agile Methodologies - Project Management](#agile-methodologies---project-management)
    - [Story Points Allocation](#story-points-allocation)
    - [Sprint Planning](#sprint-planning)
      - [Allocating Story Points to Milestones](#allocating-story-points-to-milestones)
    - [MoSCoW Prioritization](#moscow-prioritization)
    - [User Stories, Milestones, and Epics](#user-stories-milestones-and-epics)
      - [User Stories](#user-stories)
      - [Milestones](#milestones)
      - [Epics](#epics)
  - [Scope Plane](#scope-plane)
    - [Features and Functionalities:](#features-and-functionalities)
  - [Structural Plane](#structural-plane)
    - [Information Architecture:](#information-architecture)
      - [Navigation Structure:](#navigation-structure)
- [Skeleton \& Surface Planes](#skeleton--surface-planes)
  - [Wireframes](#wireframes)
  - [Database Schema - Entity Relationship Diagram](#database-schema---entity-relationship-diagram)
    - [Database Schema](#database-schema)
    - [Entity Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
    - [Tables Overview](#tables-overview)
    - [Relationships](#relationships)
    - [Design Considerations](#design-considerations)
  - [Security](#security)
    - [Data Encryption](#data-encryption)
    - [CSRF Tokens](#csrf-tokens)
    - [Django AllAuth](#django-allauth)
    - [API Security](#api-security)
- [Features](#features)
  - [Existing Features](#existing-features)
    - [Features Functionality](#features-functionality)
    - [CRUD Functionality](#crud-functionality)

# UX Experience

## Key Features

Fit and Fine offers a range of features to help you stay motivated and connected on your wellness journey, including:

- **User Authentication:** Sign up, log in, and manage your profile with ease.
- **Profile Management:** Customize your profile, including personal information and profile picture.
- **Challenge Participation:** Join and create fitness challenges, track your progress, and stay motivated.
- **Daily Routine Tracking:** Log your daily activities, including meals, workouts, and water intake.
- **Community Interaction:** Share updates through - post content, like, and comment on posts within the community.
- **Responsive Design:** Access the platform from any device, whether it's a desktop, tablet, or mobile phone.
- **Resource Hub:** Access a curated selection of fitness and wellness resources, guides, and articles.
- **User Contributions:** Registered users can contribute their own posts, share their fitness journeys, and add to the collective knowledge base of Fit and Fine.
- **About and Collaborate:** Learn more about our mission and vision in the About section, and connect with us through the Collaborate section to share ideas, feedback, or partnership opportunities.
- **Footer:** Navigate easily with our comprehensive footer, which includes links to essential pages, social media channels, and contact information.

## User Goals

- **New Users:** Easily create an account, set up a profile, and start engaging with the community.
- **Returning Users:** Quickly log in, track their fitness progress, participate in challenges, and interact with posts.
- **Community Members:** Comment on posts, like favorite content, and follow other users.
- **Fitness Enthusiasts:** Find and join fitness challenges, log daily routines, and track calorie intake and workouts.
- **Contributors:** Create and share new posts related to fitness and wellness.

## Planning

Fit and Fine is designed with a user-centric approach, ensuring that the platform is intuitive and easy to navigate. The key aspects of the design include:

- **Responsive Design:** The platform is fully responsive, providing a seamless experience on desktops, tablets, and mobile devices.
- **Clean and Modern UI:** A clean, modern interface that focuses on usability and aesthetic appeal.
- **Easy Navigation:** Intuitive navigation menus and a well-structured layout to help users find the features they need quickly.
- **Accessibility:** Features like adjustable text sizes, high contrast modes, and screen reader compatibility to ensure the platform is accessible to all users.

## User Journey

1. **Onboarding:** New users are guided through a simple sign-up process, including profile setup and a brief tutorial on using the platform.
2. **Exploration:** Users can explore the platform, discovering challenges, reading posts, and connecting with other users.
3. **Engagement:** Users actively participate by logging their routines, joining challenges, and interacting with the community through comments and likes.
4. **Tracking Progress:** Users can view their progress over time, track their challenge participation, and see improvements in their daily routines and fitness levels.
5. **Contribution:** Experienced users can share their knowledge by creating posts and helping to grow the community.

By focusing on these key aspects of the user experience, Fit and Fine aims to provide a platform that is not only functional but also enjoyable to use, encouraging users to stay active, engaged, and motivated in their fitness journey.

# Design

## Colors

The color palette for Fit and Fine is derived from the logo's gradient shades, which blend from orange to red, representing energy, vitality, and passion. These colors are used consistently throughout the application to create a cohesive and visually appealing design.

<p align="center">
  <img src="documentation/screenshots/about.webp" alt="Fit&Fine Logo" >
</p>

- **Primary Colors:**
  - **Orange:** Represents energy and enthusiasm. Used for primary buttons and highlights. `#FFA500`
  - **Red:** Symbolizes passion and intensity. Used for alerts and important highlights. `#FF4500`
  
- **Gradient Shades:**
  - **Orange to Red Gradient:** This gradient is used in the logo and various UI elements to create a dynamic and engaging visual effect.

- **Additional Colors:**
  - **White:** Used for backgrounds and text to provide contrast and readability. `#FFFFFF`
  - **Black:** Used for text and icons. `#000000`
  - **Gray:** Used for secondary text and borders. `#808080`

## Fonts

Fit and Fine utilizes two primary fonts from Google Fonts: **Almarai** and **Radio Canada Big**. These fonts are chosen for their readability and modern appearance, which align with the application's theme of fitness and well-being.

- **Almarai:**
  - Used for body text and headings.
  - Font Weights: 300, 400, 700, 800

- **Radio Canada Big:**
  - Used for special headings and emphasized text.
  - Font Weights: 400 to 700 (both italic and normal)

### Logo and Branding

The logo of Fit and Fine, as shown above, combines the primary colors in a gradient effect, providing a strong visual identity for the brand. The heart symbol with a heartbeat line inside emphasizes health and fitness, while the gradient banner below the text "Set. Sweat. Share. Shine." encapsulates the essence of the application's mission.

# Project Planning

## Strategy Plane

**Project Overview:**  
Fit&Fine is a versatile platform created for fitness enthusiasts to document their journeys, engage in challenges, and monitor their daily routines. Acting as a communal hub, it allows users to interact, inspire each other, and stay dedicated to their fitness objectives. Utilizing the latest web technologies, Fit&Fine provides a smooth user experience on all devices.

**Site Goals:**
- Offer a comprehensive resource for fitness enthusiasts to share and discover fitness routines and challenges.
- Cultivate a community where users can connect, motivate, and support one another.
- Ensure a user-friendly interface that is accessible and easy to navigate.
- Incorporate scalable features that adapt to technological advancements and user feedback.

**Target Audience:**
- Fitness enthusiasts ranging from beginners to advanced levels.
- Individuals seeking to join fitness challenges and track their daily routines.
- Users interested in sharing their fitness journeys and engaging with a supportive community.

**User Needs:**
- Access to reliable and current fitness routines and challenges.
- Ability to interact with other community members through comments, likes, and follows.
- Tools to track and manage personal fitness goals and routines.

**Features:**
- Comprehensive fitness challenges and daily routines.
- User profiles for personalized experiences and content tracking.
- Community interaction through comments, likes, and follows.
- Notifications for regular updates and new content.

## Agile Methodologies - Project Management

Fit&Fine utilizes Agile project management to ensure iterative development and continuous improvement. GitHub Projects is used to manage tasks and track progress using a Kanban-style board.

### Story Points Allocation

**Story Points Distribution:**
Story points were allocated to each user story to measure the effort and complexity involved. These points aid in estimating the workload and prioritizing tasks effectively.

**Allocation Guidelines:**
- **Must-have Stories**: Essential features critical to the project's operations were assigned the highest priority.
- **Should-have Stories**: Important but non-essential features that enhance the user experience without being crucial to core functionality. The total story points for "Should-have" stories did not exceed 60% of the total points in any sprint.
- **Could-have Stories**: Desired features considered only after completing the "Must-have" and "Should-have" categories.

### Sprint Planning 

#### Allocating Story Points to Milestones
We need to distribute the 380 story points across the milestones, ensuring they fit within 6 weeks. We will adjust the story points to match the 6-week timeline.

**Milestone 1: Project Setup and Initial Framework**
- **Total Story Points:** 40 (completed in the first week)
- **Breakdown:**
  - **Must-have:** 24 points
  - **Should-have:** 16 points

**Milestone 2: Core Backend APIs**
- **Total Story Points:** 60 (completed in the first and second weeks)
- **Breakdown:**
  - **Must-have:** 36 points
  - **Should-have:** 24 points

**Milestone 3: Basic User Interface and Functionality**
- **Total Story Points:** 100 (completed in the second and third weeks)
- **Breakdown:**
  - **Must-have:** 60 points
  - **Should-have:** 40 points

**Milestone 4: Advanced Features and Final Integration**
- **Total Story Points:** 130 (completed in the third, fourth, and fifth weeks)
- **Breakdown:**
  - **Must-have:** 52 points
  - **Should-have:** 65 points
  - **Could-have:** 13 points

**Milestone 5: Testing and Bug Fixes**
- **Total Story Points:** 50 (completed in the fifth and sixth weeks)
- **Breakdown:**
  - **Must-have:** 20 points
  - **Should-have:** 25 points
  - **Could-have:** 5 points

### MoSCoW Prioritization

To effectively manage project scope, Fit&Fine implements the MoSCoW prioritization method:

- **Must Haves**: Core functionalities including user registration/login, posting fitness updates, and participating in challenges.
- **Should Haves**: Enhanced features like profile customization, dynamic navigation updates, and filtering challenges.
- **Could Haves**: Additional functionalities such as modifying or deleting comments and creating comprehensive documentation.
- **Won't Haves**: Features not essential for the initial launch, such as third-party advertising.

### User Stories, Milestones, and Epics

[Fit&Fine Kanban Board Link](https://github.com/users/SwathiKeshavamurthy/projects/10)

[Fit&Fine User Stories Link](https://github.com/SwathiKeshavamurthy/FitandFine-P5/issues?page=2&q=is%3Aissue+is%3Aclosed)

[Fit&Fine Milestones Link](https://github.com/SwathiKeshavamurthy/FitandFine-P5/milestones)

[Fit&Fine Frontend GitHub Link](https://github.com/SwathiKeshavamurthy/fitandfine-react-p5)

[Fit&Fine Backend GitHub Link](https://github.com/SwathiKeshavamurthy/FitandFine-P5)

#### User Stories

| Title                                      | User Story                                                                                           | MoSCoW Priority  | Milestone                              |
|--------------------------------------------|------------------------------------------------------------------------------------------------------|------------------|----------------------------------------|
| User Registration                          | As a user, I want to register an account so that I can participate in challenges and track my fitness. | MUST HAVE        | Core Backend APIs                      |
| Secure User Login                          | As a user, I want to log in securely so that I can access my personal data and interact with the site. | MUST HAVE        | Core Backend APIs                      |
| User Profile Customization                 | As a user, I want to customize my profile so that I can express myself and manage my preferences.     | MUST HAVE        | Core Backend APIs                      |
| Validation - Data Integrity and User Input | As a developer, I want to validate user input to ensure data integrity.                               | SHOULD HAVE      | Core Backend APIs                      |
| Posting Fitness Updates                    | As a user, I want to post my fitness updates so that I can share my progress with the community.      | MUST HAVE        | Basic User Interface and Functionality |
| Commenting on Posts                        | As a user, I want to comment on posts so that I can engage with the community.                        | MUST HAVE        | Basic User Interface and Functionality |
| Liking Posts                               | As a user, I want to like posts so that I can show my appreciation for the content.                   | MUST HAVE        | Basic User Interface and Functionality |
| Following Other Users                      | As a user, I want to follow other users so that I can stay updated with their activities.             | MUST HAVE        | Basic User Interface and Functionality |
| Searching for Posts and Users              | As a user, I want to search for posts and users so that I can find relevant content and people.       | MUST HAVE        | Basic User Interface and Functionality |
| Pre-login Homepage Viewing                 | As a visitor, I want to view the homepage before logging in so that I can understand the platform.    | MUST HAVE        | Basic User Interface and Functionality |
| Editable User Profiles                     | As a user, I want to edit my profile so that I can update my information and preferences.             | MUST HAVE        | Basic User Interface and Functionality |
| Comprehensive Profile View                 | As a user, I want to view comprehensive profiles so that I can learn more about other users.          | MUST HAVE        | Basic User Interface and Functionality |
| View Daily Routine                         | As a user, I want to view my daily routine so that I can track my fitness activities.                 | MUST HAVE        | Basic User Interface and Functionality |
| Create Daily Routine                       | As a user, I want to create a daily routine so that I can plan and track my daily activities.         | MUST HAVE        | Basic User Interface and Functionality |
| Join Challenge                             | As a user, I want to join fitness challenges so that I can stay motivated and achieve my goals.       | MUST HAVE        | Advanced Features and Final Integration |
| Leave Challenge                            | As a user, I want to leave a challenge so that I can withdraw my participation if needed.             | MUST HAVE        | Advanced Features and Final Integration |
| Create Challenge (Superuser Only)          | As a superuser, I want to create challenges so that I can engage users with fitness activities.       | MUST HAVE        | Advanced Features and Final Integration |
| Edit Challenge (Superuser Only)            | As a superuser, I want to edit existing challenges so that I can update or correct challenge details. | MUST HAVE        | Advanced Features and Final Integration |
| Delete Challenge (Superuser Only)          | As a superuser, I want to delete challenges so that I can remove outdated or irrelevant challenges.   | MUST HAVE        | Advanced Features and Final Integration |
| Logging Out Securely                       | As a user, I want to log out securely so that I can ensure my account is safe.                        | SHOULD HAVE      | Advanced Features and Final Integration |
| Filtering Challenges by Specific Sport     | As a user, I want to filter challenges by specific sport so that I can find challenges that match my interests. | SHOULD HAVE | Advanced Features and Final Integration |
| Managing User Content                      | As a user, I want to manage my content so that I can edit or delete my posts.                         | SHOULD HAVE      | Advanced Features and Final Integration |
| Editing and Deleting Posted Content        | As a user, I want to edit or delete my posted content so that I can correct or remove it if necessary. | SHOULD HAVE      | Advanced Features and Final Integration |
| Dynamic Navigation Bar Updates             | As a user, I want the navigation bar to update dynamically based on my login status and role.         | COULD HAVE       | Advanced Features and Final Integration |
| Dynamic Authentication Display             | As a user, I want the authentication display to be dynamic so that I can see login/register options when logged out and my profile when logged in. | SHOULD HAVE | Advanced Features and Final Integration |
| Authentication - Refreshing Access Tokens  | As a user, I want my session to stay active without frequently logging in.                            | SHOULD HAVE      | Advanced Features and Final Integration |
| Seamless Routing                           | As a user, I want seamless navigation so that I can move through the app without interruptions.       | SHOULD HAVE      | Advanced Features and Final Integration |
| Enhanced Navigation & Authentication       | As a user, I want enhanced navigation and authentication so that I can easily access and use the platform. | SHOULD HAVE | Advanced Features and Final Integration |
| Delete Daily Routine (Schedule) Entries    | As a user, I want to delete my daily routine entries so that I can manage my schedule.                | COULD HAVE       | Advanced Features and Final Integration |
| Edit Daily Routine                         | As a user, I want to edit my daily routine so that I can update my activities.                        | COULD HAVE       | Advanced Features and Final Integration |
| Modify or Delete Comment on a Post         | As a user, I want to modify or delete my comment on a post so that I can correct or remove it.        | COULD HAVE       | Advanced Features and Final Integration |
| Accessing the "About" Page                 | As a user, I want to access the "About" page so that I can learn more about the platform.             | SHOULD HAVE      | Basic User Interface and Functionality  |
| Testing - Ensuring Application Reliability | As a developer, I want to conduct thorough testing so that I can ensure the application is reliable.   | SHOULD HAVE      | Testing and Bug Fixes                  |
| Documentation - Enhancing Understanding    | As a developer, I want to provide clear documentation so that other developers and users can understand the application. | SHOULD HAVE | Testing and Bug Fixes |
| Contact Functionality                      | As a user, I want to have a contact functionality so that I can reach out for support or inquiries.   | COULD HAVE       | Testing and Bug Fixes                  |
| Heroku - Application Deployment            | Deploy the application to a live environment to ensure all features work correctly and the platform is stable. | SHOULD HAVE | Project Setup and Initial Framework |
| ElephantSQL - Database Management          | Manage the database using ElephantSQL for reliable data storage and retrieval.                        | SHOULD HAVE      | Project Setup and Initial Framework    |
| Cloudinary - Media Management              | Integrate Cloudinary for efficient media management and storage.                                     | SHOULD HAVE      | Project Setup and Initial Framework    |
| ReactJS - Frontend Development             | Develop the frontend using ReactJS to ensure a responsive and dynamic user interface.                | MUST HAVE        | Project Setup and Initial Framework    |

#### Milestones

Milestones represent significant checkpoints or goals in the project's timeline, used to track progress and ensure alignment with objectives.

1. **Milestone 1: Project Setup and Initial Framework**
   - Setting up the development environment.
   - Initial project setup and configuration.
   - Establishing database connections (ElephantSQL).

2. **Milestone 2: Core Backend APIs**
   - Developing essential API endpoints for user interactions.
   - Implementing user registration, login, and profile management.
   - Ensuring data validation and security measures.

3. **Milestone 3: Basic User Interface and Functionality**
   - Building core frontend pages for user interactions.
   - Implementing user profile views, posts, and comments.
   - Ensuring responsive design for various devices.

4. **Milestone 4: Advanced Features and Final Integration**
   - Adding advanced functionalities like challenge participation and filtering.
   - Enhancing user interactions with likes, follows, and notifications.
   - Final integration and testing of all features.

5. **Milestone 5: Testing and Bug Fixes**
   - Conducting thorough testing across the entire platform.
   - Resolving any bugs and issues identified.
   - Preparing for deployment.
  
**Deployment**
- Deploy the backend to a service like Heroku, AWS.
- Set up the frontend deployment through platforms.
- Ensure environment variables and production configurations are set properly.
- Conduct a final run-through to ensure the live site functions correctly.

#### Epics

Epics are large bodies of work that can be broken down into smaller tasks or user stories, often spanning multiple sprints or iterations.

**Epic 1: User Management**
**Description:** Implement functionalities related to user registration, login, profile management, and authentication.

**User Stories:**
1. **User Registration:** As a user, I want to register an account so that I can participate in challenges and track my fitness.
2. **Secure User Login:** As a user, I want to log in securely so that I can access my personal data and interact with the site.
3. **User Profile Customization:** As a user, I want to customize my profile so that I can express myself and manage my preferences.
4. **Editable User Profiles:** As a user, I want to edit my profile so that I can update my information and preferences.
5. **Comprehensive Profile View:** As a user, I want to view comprehensive profiles so that I can learn more about other users.
6. **Logging Out Securely:** As a user, I want to log out securely so that I can ensure my account is safe.

**Epic 2: Social Interaction and Community**
**Description:** Develop features that allow users to interact with each other, share their fitness progress, and engage with the community.

**User Stories:**
1. **Posting Fitness Updates:** As a user, I want to post my fitness updates so that I can share my progress with the community.
2. **Commenting on Posts:** As a user, I want to comment on posts so that I can engage with the community.
3. **Liking Posts:** As a user, I want to like posts so that I can show my appreciation for the content.
4. **Following Other Users:** As a user, I want to follow other users so that I can stay updated with their activities.
5. **Managing User Content:** As a user, I want to manage my content so that I can edit or delete my posts.
6. **Modify or Delete Comment on a Post:** As a user, I want to modify or delete my comment on a post so that I can correct or remove it.

**Epic 3: Fitness Challenges and Routines**
**Description:** Create and manage fitness challenges and daily routines, allowing users to join, participate, and track their progress.

**User Stories:**
1. **Create Challenge (Superuser Only):** As a superuser, I want to create challenges so that I can engage users with fitness activities.
2. **Edit Challenge (Superuser Only):** As a superuser, I want to edit existing challenges so that I can update or correct challenge details.
3. **Delete Challenge (Superuser Only):** As a superuser, I want to delete challenges so that I can remove outdated or irrelevant challenges.
4. **View Challenges:** As a user, I want to view available challenges so that I can choose which ones to participate in.
5. **Join Challenge:** As a user, I want to join fitness challenges so that I can stay motivated and achieve my goals.
6. **Leave Challenge:** As a user, I want to leave a challenge so that I can withdraw my participation if needed.
7. **Filtering Challenges by Specific Sport:** As a user, I want to filter challenges by specific sport so that I can find challenges that match my interests.
8. **Create Daily Routine:** As a user, I want to create a daily routine so that I can plan and track my daily activities.
9. **View Daily Routine:** As a user, I want to view my daily routine so that I can track my fitness activities.
10. **Edit Daily Routine:** As a user, I want to edit my daily routine so that I can update my activities.
11. **Delete Daily Routine (Schedule) Entries:** As a user, I want to delete my daily routine entries so that I can manage my schedule.

**Epic 4: Platform Navigation and User Experience**
**Description:** Enhance the user experience by implementing seamless navigation, dynamic updates, and responsive design.

**User Stories:**
1. **Pre-login Homepage Viewing:** As a visitor, I want to view the homepage before logging in so that I can understand the platform.
2. **Accessing the "About" Page:** As a user, I want to access the "About" page so that I can learn more about the platform.
3. **Dynamic Navigation Bar Updates:** As a user, I want the navigation bar to update dynamically based on my login status and role.
4. **Dynamic Authentication Display:** As a user, I want the authentication display to be dynamic so that I can see login/register options when logged out and my profile when logged in.
5. **Seamless Routing:** As a user, I want seamless navigation so that I can move through the app without interruptions.
6. **Enhanced Navigation & Authentication:** As a user, I want enhanced navigation and authentication so that I can easily access and use the platform.

**Epic 5: Testing and Deployment**
**Description:** Ensure the reliability and readiness of the application through thorough testing and deployment processes.

**User Stories:**
1. **Testing - Ensuring Application Reliability:** As a developer, I want to conduct thorough testing so that I can ensure the application is reliable.
2. **Documentation - Enhancing Understanding:** As a developer, I want to provide clear documentation so that other developers and users can understand the application.
3. **Contact Functionality:** As a user, I want to have a contact functionality so that I can reach out for support or inquiries.
4. **Application Deployment:** Deploy the application to a live environment, ensuring all features work correctly and the platform is stable.

## Scope Plane

The scope plane defines the specific features and functionalities that Fit&Fine will offer. It outlines what the application will do to meet user needs and the business goals.

### Features and Functionalities:

1. **User Management:**
   - User Registration: Allow users to create an account to participate in challenges and track their fitness.
   - Secure User Login: Enable users to log in securely to access personal data and interact with the site.
   - Profile Customization: Let users customize their profiles to express themselves and manage their preferences.
   - Editable User Profiles: Provide users with the ability to edit their profiles to update their information.

2. **Social Interaction and Community:**
   - Posting Fitness Updates: Allow users to share their fitness progress with the community.
   - Commenting on Posts: Enable users to comment on posts to engage with the community.
   - Liking Posts: Let users like posts to show appreciation for the content.
   - Following Other Users: Allow users to follow others to stay updated with their activities.

3. **Fitness Challenges and Routines:**
   - Create Challenges: Superusers can create challenges to engage users with fitness activities.
   - Edit/Delete Challenges: Superusers can edit or delete challenges to manage them effectively.
   - View Challenges: Users can view available challenges to decide which ones to participate in.
   - Join/Leave Challenges: Users can join or leave challenges based on their preferences.
   - Filtering Challenges: Users can filter challenges by specific sports to find those that match their interests.
   - Create/View/Edit/Delete Daily Routines: Users can manage their daily fitness routines to track activities.

4. **Platform Navigation and User Experience:**
   - Pre-login Homepage Viewing: Visitors can view the homepage to understand the platform before logging in.
   - Accessing the "About" Page: Users can learn more about the platform through an "About" page.
   - Dynamic Navigation Bar: The navigation bar updates dynamically based on the user's login status and role.
   - Seamless Routing: Ensure smooth navigation throughout the app.
   - Enhanced Navigation & Authentication: Provide a streamlined user experience for accessing and using the platform.

5. **Testing and Deployment:**
   - Thorough Testing: Conduct comprehensive testing to ensure the application's reliability.
   - Documentation: Provide clear documentation to enhance understanding for developers and users.
   - Contact Functionality: Allow users to reach out for support or inquiries.
   - Application Deployment: Deploy the application to a live environment, ensuring stability and correctness.

## Structural Plane

The structural plane outlines the organization and hierarchy of information within Fit&Fine. It defines how the features and functionalities are structured and how users will interact with them.

### Information Architecture:

1. **Home Page:**
   - Overview of the platform
   - Access to login and registration
   - Preview of featured challenges and posts

2. **User Authentication:**
   - Login Page: Secure login form
   - Registration Page: User registration form

3. **User Dashboard:**
   - Summary of user activities
   - Links to user profile, challenges, and daily routines

4. **User Profile:**
   - Profile customization options
   - View and edit profile information
   - Display of user's posts, comments, likes, and followers

5. **Challenges:**
   - Challenge Listing Page: Browse and filter challenges
   - Challenge Detail Page: View challenge details, join or leave challenges
   - Create/Edit Challenge Page: For superusers to manage challenges

6. **Daily Routines:**
   - Daily Routine Listing Page: View user's daily routines
   - Daily Routine Detail Page: View details of a specific routine
   - Create/Edit Daily Routine Page: Manage daily routines

7. **Social Interaction:**
   - Post Listing Page: View posts from followed users and the community
   - Post Detail Page: View detailed post content, comment, and like
   - Create/Edit Post Page: Manage fitness updates

8. **About and Collaborate Page:**
   - Information about Fit&Fine
   - Mission and vision of the platform
   - Collaborate form for users for collaborations, inquiries and support.

9.  **Footer:**
    - Links to social media profiles
    - Quick links to important sections of the site

#### Navigation Structure:

- **Top Navigation Bar:**
  - Home
  - Challenges
  - About&Collaborate
  - Add Post
  - Add Daily Routine
  - Add Challenge(Shown only for logged Superusers)
  - User Profile (dynamic, shows when logged in)
  - Login/Register (dynamic, shows when not logged in)

- **Side Navigation (Username Dashboard):**
  - My Profile
  - My Likes
  - My Feeds
  - My Comments
  - My Challenges
  - My Daily Routines
  - Signout (dynamic, shows when logged in)


- **Footer:**
  - Social Media Links
  - App download Links
  - Copy right

This structure ensures that users can easily navigate through the platform, find relevant information, and interact with the community effectively. The combination of the scope and structural planes provides a comprehensive blueprint for developing and organizing Fit&Fine.

# Skeleton & Surface Planes

## Wireframes

I've used [Balsamiq](https://balsamiq.com/wireframes) to design the site wireframes.

**Home Page Wireframes**
<details>
<summary>Click to View Home Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/home.JPG)
</details>

<details>
<summary>Click to View Home Page after Login wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/homeafterlogin.JPG)

</details>
<br>

**Challenges Page Wireframes**
<details>
<summary>Click to View Challenges Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/challenges.JPG)
</details>
<br>

**Add Challenges Page Wireframes**
<details>
<summary>Click to View Create Challenge Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/addchallenge.JPG)
</details>
<br>

**My Challenges Page Wireframes**

<details>
<summary>Click to View My Challenges Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/mychallenges.JPG)
</details>
<br>

**My Daily Routine Page Wireframes**

<details>
<summary>Click to View My Daily Routine Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/mydailyroutine.JPG)
</details>
<br>

**Add  Daily Routine Page Wireframes**
<details>
<summary>Click to View Create Daily Routine Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/adddailyroutine.JPG)
</details>
<br>

**Register Page Wireframes**
<details>
<summary>Click to View Register Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/register.JPG)
</details>
<br>

**Login Page Wireframes**
<details>
<summary>Click to View Login Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/login.JPG)
</details>
<br>

**My Posts Page Wireframes**
<details>
<summary>Click to View My Posts Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/postview.JPG)
</details>
<br>

**Add Post Page Wireframes**
<details>
<summary>Click to View My Posts Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/addpost.JPG)
</details>
<br>

**My Comments Page Wireframes**
<details>
<summary>Click to View My Comments Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/postview.JPG)
</details>
<br>

**About & Collaborate Page Wireframes**
<details>
<summary>Click to View About & Collaborate Page wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/collaborate.JPG)
</details>
<br>

**Profile Wireframes**
<details>
<summary>Click to View Profile wireframes</summary>

**Desktop**
![wireframes](documentation/wireframes/profile.JPG)
</details>
<br>

## Database Schema - Entity Relationship Diagram

I've used [dbdiagram](https://dbdiagram.io/home) to design my site's ERD.

### Database Schema

The Fit&Fine application is structured on a robust database schema designed to facilitate the efficient organization and retrieval of data. Below is an overview of the database schema and the relationships between the different entities.

### Entity Relationship Diagram (ERD)

The Entity Relationship Diagram (ERD) represents the database schema of Fit&Fine, detailing the system's tables, the data fields within them, and the relationships between the tables.

![ERD of Fit&Fine](documentation/screenshots/erd.png)

### Tables Overview

- **User**: Stores information about the users of the platform, including username, email, and password. The `is_superuser` field indicates whether a user has administrative privileges.

- **Profile**: Contains extended user information such as name, profile image, join date, and other personal details. This table extends the `User` table by associating profiles with user accounts.

- **Challenge**: Central to the application, the `Challenge` table holds data about fitness challenges including title, description, start and end dates, sport type, and the challenge creator (owner).

- **ChallengeParticipant**: Keeps track of which users have joined which challenges. Each record links a user to a specific challenge.

- **DailyRoutine**: Stores data related to users' daily fitness routines, including times for wake-up, meals, workouts, and sleep, as well as additional notes about the user's activities for the day.

- **Post**: Stores posts created by users, including the post content, associated media, creation date, and the user who created the post.

- **Comment**: Enables community interaction by storing comments made by users on posts. Each comment is linked to a specific post and user.

- **Like**: Records likes given by users to posts, tracking which user liked which post.

- **Follower**: Tracks the relationships between users, allowing one user to follow another.

- **About**: Stores static information about the application, such as the company's background, mission statement, and contact details.

- **Collaborate**: Stores user inquiries or messages submitted through the platform's contact form.

### Relationships

- A **one-to-many** relationship exists between `User` and `Challenge`, where one user (as a superuser) can create many challenges.
- A **many-to-many** relationship exists between `User` and `Challenge` through the `ChallengeParticipant` table, allowing multiple users to join multiple challenges.
- A **one-to-many** relationship is set between `Challenge` and `ChallengeParticipant`, where one challenge can have many participants.
- A **one-to-many** relationship exists between `User` and `DailyRoutine`, where one user can have many daily routines.
- A **one-to-many** relationship exists between `User` and `Post`, where one user can create many posts.
- A **one-to-many** relationship exists between `Post` and `Comment`, where one post can have many comments.
- A **one-to-many** relationship exists between `User` and `Comment`, where one user can create many comments.
- A **one-to-many** relationship exists between `Post` and `Like`, where one post can have many likes.
- A **one-to-many** relationship exists between `User` and `Like`, where one user can like many posts.
- A **one-to-many** relationship exists between `User` and `Follower`, where one user can follow many users.
- A **one-to-one** relationship exists between `User` and `Profile`, where each user has one profile.

### Design Considerations

The schema was designed with scalability in mind, ensuring that as the platform grows, new features and data types can be easily incorporated. For example, the separation of the `User` and `Profile` tables allows for flexible user management and the possibility to include additional user attributes in the future without altering the core user authentication system.

## Security

Security is a critical aspect, especially for a platform like Fit&Fine that handles user-generated content and personal data.

### Data Encryption
- All sensitive data, including user passwords and personal information, are encrypted using robust encryption methods to protect against unauthorized access and breaches.

### CSRF Tokens
- CSRF (Cross-Site Request Forgery) tokens are included in every form to help authenticate the request with the server when the form is submitted. The absence of these tokens can leave a site vulnerable to attackers who may steal user data.

### Django AllAuth
- Django AllAuth is an installable framework that handles the user registration and authentication process. Authentication is essential to determine when a user is registered or unregistered and to control what content is accessible on Fit&Fine.

### API Security
- The backend uses Django REST framework (DRF) for building the API, with token-based authentication to ensure secure access to the API endpoints.
- Only authenticated users can perform actions like creating posts, joining challenges, and updating profiles.
- Superuser permissions are required for actions like creating, editing, or deleting challenges.

# Features

## Existing Features

### Features Functionality

| Feature                   | Unregistered User Access | Registered User Access         | CRUD Functionality               |
|---------------------------|--------------------------|--------------------------------|----------------------------------|
| **Landing Page**          | Viewable                 | Viewable                       | Read                             |
| **Registration**          | Available                | N/A                            | Create                           |
| **Login**                 | Available                | N/A                            | Create/Read                      |
| **Browse Challenges**     | Viewable                 | Viewable                       | Read                             |
| **View Challenge Details**| Limited Interaction      | Full Interaction (join, leave, comment) | (superuser only) Read/Create/Update/Delete    |
| **Profile Management**    | Not Available            | Available                      | Create/Read/Update      |
| **Create New Challenge**  | Not Available            | Available (Superuser only)     | Create                           |
| **Edit/Delete Challenge** | Not Available            | Available (Superuser only) | Update/Delete                    |
| **Join/Leave Challenges** | Not Available            | Available                      | Create/Delete                    |
| **Daily Routines**        | Not Available            | Available                      | Create/Read/Update/Delete        |
| **Create Post**           | Not Available            | Available                      | Create                           |
| **Edit/Delete Post**      | Not Available            | Available (Own Posts)          | Update/Delete                    |
| **Like Posts**            | Not Available            | Available                      | Create/Delete                    |
| **Comment on Posts**      | Not Available            | Available                      | Create/Update/Delete             |
| **Search Functionality**  | Available                | Enhanced (user-specific results) | Read                             |
|**Follow/Unfollow**        | Not Available            |	Available	 | Create/Delete             |
| **User Interaction**      | Not Available            | Follow/Unfollow Users, Interact with Community | Create/Read/Delete             |
| **About & Collaborate**   | Viewable                 | Viewable                       | Read/Create                             |

---

### CRUD Functionality

The table below describes the CRUD operations that can be performed on Fit&Fine's main features by a registered, logged-in user.

| Feature               | Create                    | Read                        | Update               | Delete                 |
|-----------------------|---------------------------|-----------------------------|----------------------|------------------------|
| **User Accounts**     | Sign up for a new account | View own and others' profiles | Edit own profile     | - |
| **Challenges**        | Create new challenges (Superuser only) | Browse and read all challenges | Edit own challenges (Superuser only) | Remove challenges (Superuser only) |
| **Challenge Participants** | Join challenges         | View joined challenges      | -                    | Leave challenges        |
| **Daily Routines**    | Add new routines          | View daily routines         | Edit own routines    | Delete own routines     |
| **Posts**             | Publish new posts         | Browse and read all posts   | Edit own posts       | Remove own posts        |
| **Comments**          | Comment on posts          | View comments               | Edit own comments    | Delete own comments     |
| **Likes**             | Like posts   | See likes on posts| -                    | Unlike posts  |
|**Follow/Unfollow**  | Follow users       |	View followers and following lists	 | - | Unfollow users             |
| **Search**            | -                         | Search posts/users          | -                    | -                       |
