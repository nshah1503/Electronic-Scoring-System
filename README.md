# Electronic Scoring System

An **Electronic Scoring System** designed for event scoring, where judges can vote on performer scores in real-time through an admin-controlled interface. This system allows an admin to manage performers and judges, initiate performances, and control voting for each judge.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [How to Run](#how-to-run)
- [Usage](#usage)
- [Screenshots](#screenshots)

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

![Architecture Diagram][https://github.com/nshah1503/Electronic-Scoring-System/blob/094e5376d14debb6d1aff81827e06b44d9b396b9/diagram-export-11-4-2024-6_25_24-PM.svg]
<img src="[svg-url](https://github.com/nshah1503/Electronic-Scoring-System/blob/094e5376d14debb6d1aff81827e06b44d9b396b9/diagram-export-11-4-2024-6_25_24-PM.svg)" alt="Architecture Diagram" width="200"/>

This project follows a modular and scalable architecture with a **Vue.js** frontend, a **Flask** backend, and **AWS DynamoDB** for data persistence. The components are organized as follows:

1. **Frontend** (Vue.js):
   - Manages user interfaces for the Admin and Judge dashboards.
   - Provides a responsive layout for displaying current and past performances, performer status, and voting controls.

2. **Backend** (Flask):
   - API endpoints handle actions like starting performances, updating judge voting status, and storing scores.
   - Uses DynamoDB as the database for storing information about performers and judges, as well as tracking voting status and scores.

3. **Database** (AWS DynamoDB):
   - Three tables: `Performers`, `Judges`, and `Scoreboard`:
     - `Performers`: Stores performer information such as `performerId`, `name`, `emailId`, and `status`.
     - `Judges`: Stores judge information and their voting status.
     - `Scoreboard`: Records the scores submitted by judges for each performer across categories.

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
