# Electronic Scoring System

An **Electronic Scoring System** designed for event scoring, where judges can vote on performer scores in real-time through an admin-controlled interface. This system allows an admin to manage performers and judges, initiate performances, and control voting for each judge.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Screenshots](#screenshots)
- [DynamoDB Schema](#dynamodb-schema)

## Overview

The Electronic Scoring System enables an admin to:
- Start and stop performances for each performer.
- Manage the judges' voting process, allowing only one judge to vote at a time.
- Display real-time scoring and updates.
- Track past performances and completed votes.

This setup ensures a smooth, organized scoring experience for events, with a user-friendly interface and real-time interaction.

## Features

- **Admin Interface**: 
  - Add and manage performers and judges.
  - Control which judge can vote at any given time.
  - Monitor the status of each performer and judge in real-time.

- **Judge Interface**:
  - View the performer currently performing.
  - Submit scores for the performer once voting is enabled by the admin.
  - See a timer for the scoring session.

- **Real-time Updates**:
  - Performances and voting status are updated in real-time, ensuring smooth transitions.
  - Admin can reset the voting status when a new performer starts.

## Architecture

![diagram-export-11-4-2024-3_45_07-PM](https://github.com/user-attachments/assets/82133922-bdf7-4348-9b99-51e69cc988ff)

This project follows a modular and scalable architecture with a **Vue.js** frontend, a **Flask** backend, and **AWS DynamoDB** for data persistence. The components are organized as follows:

1. **Frontend** (Vue.js):
   - Manages user interfaces for the Admin and Judge dashboards.
   - Provides a responsive layout for displaying current and past performances, performer status, and voting controls.
   - Hosted on AWS amplify via an image from S3 bucket

2. **Backend** (Flask):
   - API endpoints handle actions like starting performances, updating judge voting status, and storing scores.
   - Uses DynamoDB as the database for storing information about performers and judges, as well as tracking voting status and scores.
   - Uses Gunicorn framework to tunnel flask requests making the system lightweight in terms of memory by removing debugging features
3. **API gateway**:
   - Connects frontend and backend neatly via a door
   - Converts http localhost protocol to https supported by Amplify

## DynamoDB Schema

<p align="center">
  <img src="https://github.com/user-attachments/assets/bed3da51-ca62-48e8-b34e-485a214e889d" alt="Screenshot 2024-11-04 at 11 43 18 PM" width="800"/>
</p>

In this project, AWS DynamoDB is used as the primary database to store information about performers, judges, and scores. The database consists of three main tables, each designed to handle specific parts of the scoring system:

### 1. Performers Table
- **Primary Key**: `performerId` (string) – a unique identifier for each performer.
- **Attributes**:
  - `name` (string): The name of the performer.
  - `emailId` (string): The email address of the performer.
  - `status` (string): Represents the current status of the performer, such as `not performed`, `performing`, or `performed`.

This table holds basic information about each performer and tracks their status throughout the event.

### 2. Judges Table
- **Primary Key**: `judgeId` (string) – a unique identifier for each judge.
- **Attributes**:
  - `name` (string): The name of the judge.
  - `emailId` (string): The email address of the judge.
  - `isVotingNow` (boolean): Indicates if the judge is currently allowed to vote (`true` if voting is enabled for this judge, `false` otherwise).

This table manages the details of each judge, along with a flag to control the voting rights assigned by the admin.

### 3. Scoreboard Table
- **Composite Key**: 
  - `performerId` (string): The ID of the performer being scored.
  - `judgeId` (string): The ID of the judge submitting the score.
- **Attributes**:
  - `scores` (map): A nested object storing scores for different categories, e.g., `{ "category1": 3, "category2": 4, ... }`.

The `Scoreboard` table keeps track of each judge’s scores for each performer, providing a record of all voting results for later analysis and retrieval.

---


## Technologies Used

- **Frontend**: Vue.js with TypeScript for the UI and real-time interactivity.
- **Backend**: Flask (Python) for RESTful API services.
- **Database**: AWS DynamoDB for data storage and real-time data management.
- **Hosting**: Amplify for the Vue.js frontend, EC2 for the Flask backend.
- **Authentication**: Auth0 for secure login and session management.

## Setup and Installation

### Prerequisites

- **Node.js** and **npm** for frontend dependencies.
- **Python** and **pip** for backend dependencies.
- **AWS CLI** configured for DynamoDB access.
- **Auth0** account for authentication setup.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/electronic-scoring-system.git
   cd electronic-scoring-system/backend](https://github.com/nshah1503/Electronic-Scoring-System.git)
2. Setup virtual env:
```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
3. Configure environment variables:
    Create a .env file with the following settings:
    ```
    FLASK_APP=app.py
    FLASK_ENV=development
    AUTH0_DOMAIN=your-auth0-domain
    AUTH0_CLIENT_ID=your-auth0-client-id
    AUTH0_CLIENT_SECRET=your-auth0-client-secret
    ```
4. Start flask server:
    ```
    python app.py
5. Find front-end dir "judge-performers":
    ```
    npm install
    npm run dev

Link to webapp hosted on ec2:
https://staging.dgg9ja99srxzq.amplifyapp.com/

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/57938c9d-7781-435b-ae9a-19cbf7a6e831" alt="Screenshot 2024-11-04 at 11 43 18 PM" width="800"/>
</p>
<p align="center"><em>Login Page</em></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/9bd3dbfa-b05a-434a-9921-541ba82f4ae8" alt="Screenshot 2024-11-04 at 11 43 18 PM" width="300"/>
</p>
<p align="center"><em>Auth0</em></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c275d64d-b680-416c-9842-a7493384353c" alt="Screenshot 2024-11-04 at 11 43 18 PM" width="800"/>
</p>
<p align="center"><em>Admin Page View (Performers)</em></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/70547924-da56-49cf-b9a1-d281c1b78ca1" alt="add caption" width="800"/>
</p>
<p align="center"><em>Admin Page View (Judges)</em></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/e8943da2-8f4b-47ae-b363-8d8935b03129" alt="Screenshot 2024-11-04 at 11 45 05 PM" width="800"/>
</p>
<p align="center"><em>Judges Dashboard</em></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/599d8a93-e60f-4107-a7bc-9199214f817f" alt="Screenshot 2024-11-04 at 11 43 57 PM" width="800"/>
</p>
<p align="center"><em>Final Scores (Bystander view)</em></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0ccb9716-e80f-4903-8699-0b7782b9b28a" alt="Screenshot 2024-11-04 at 11 43 57 PM" width="800"/>
</p>
<p align="center"><em>Amplify Staging Web App</em></p>


