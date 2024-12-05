# **Role-Based Access Control (RBAC) UI**

## **Project Overview**
This project is a **Role-Based Access Control (RBAC)** User Interface designed to provide administrators with a secure and efficient way to manage users, roles, and permissions. The application is built using React and Material-UI, offering a responsive and intuitive dashboard that simplifies complex RBAC workflows.

## **Features**
1. **User Management**
   - View users in a tabular format with options to edit, delete, or update roles dynamically.
   - Assign roles such as **Admin**, **Moderator**, or **Client** using a dropdown menu.
   - Create new users with minimal inputs like name, email, and role.
   - Search, sort, and filter users for easy navigation.

2. **Role Management**
   - Define roles and associated permissions (e.g., Read, Write, Delete).
   - Dynamic role assignment with the flexibility to modify roles as needed.

3. **Dynamic Permissions**
   - Assign and display permissions clearly for each role.
   - Allow modifications to permissions directly from the UI.

4. **Mock API Integration**
   - Simulated API calls for CRUD operations on users and roles.
   - Mock server responses for a seamless experience.

5. **Responsive Design**
   - Fully responsive and accessible UI for all devices, ensuring usability across platforms.

## Setup Instructions

### 1. Clone the repository:

##  Clone the repository to your local machine:

```bash
git clone <repository_url>
cd <project_directory>
```

### 2. Install Dependencies:

```bash   
cd client
npm install
```

```bash
cd server
npm install
```

### 3. Set Up Environment Variables:
## Frontend .env File:
### In the frontend directory, create a .env file and add the following variables:

```bash
# Frontend Environment Variables
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Backend .env File:
### In the backend directory, create a .env file and add the following variables:

```bash
# Backend Environment Variables
MONGODB_URL=<your mongo_db_url>
ADMIN_EMAIL=<the mail you want to make admin>
```

### 4.Run the Development Server:
## Start the React Application:

```bash
cd client
npm run dev
```

Start the Backend API:
Next, navigate to the backend directory and start the backend server:

```bash
cd client
npm run dev
```

## **Technologies Used**
- **Frontend**: React, Material-UI (MUI)
- **Backend**: Node.js, Express.js (Mock APIs)
- **Database**: MongoDB (for real implementation)

