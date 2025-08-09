# **🚀 To-Do List**

A full-stack, responsive To-Do list application built with the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows users to create, manage, and track their tasks securely with JSON Web Token (JWT) authentication.

## **✨ Features**

* **User Authentication**: Secure user registration and login using JWT.  
* **Create, Read, Update, Delete (CRUD)**: Full functionality to manage your personal to-do list.  
* **Task Management**: Mark tasks as complete, edit task details, and delete tasks.  
* **Responsive Design**: A clean, modern UI that works great on both desktop and mobile devices.  
* **State Management**: Efficient data handling on the frontend for a smooth user experience.

## **🛠️ Tech Stack**

### **Frontend**

* **React**: A JavaScript library for building user interfaces.  
* **React Router**: For client-side routing.  
* **Axios**: For making API requests to the backend.  
* **CSS Framework**: For styling and responsive design.

### **Backend**

* **Node.js**: A JavaScript runtime for the backend.  
* **Express.js**: A web application framework for building the API.  
* **MongoDB**: A NoSQL database for storing user and task data.  
* **Mongoose**: An object data modeling (ODM) library for MongoDB and Node.js.  
* **JWT (JSON Web Tokens)**: For secure, stateless authentication.  
* **Bcrypt**: For hashing and salting user passwords.

## **⚙️ Prerequisites**

Before you begin, ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (which includes npm)  
* [MongoDB](https://www.mongodb.com/try/download/community)

## **📦 Installation**

Follow these steps to get the development environment running.

### **1\. Clone the Repository**

git clone https://github.com/\[Your\_GitHub\_Username\]/\[Your\_Repository\_Name\].git  
cd \[Your\_Repository\_Name\]

### **2\. Backend Setup**

1. Navigate to the backend directory.  
   cd backend

2. Install the server dependencies.  
   npm install

3. Create a .env file in the backend directory with the following variables:  
   PORT=5000  
   MONGO\_URI=mongodb://127.0.0.1:27017/\[Your\_Database\_Name\]  
   JWT\_SECRET=\[Your\_Strong\_Secret\_Key\]

4. Start the backend server.  
   npm start

### **3\. Frontend Setup**

1. Open a new terminal and navigate to the frontend directory.  
   cd ../frontend

2. Install the client dependencies.  
   npm install

3. Create a .env file in the frontend directory with the following variable:  
   VITE\_API\_URL=http://localhost:5000/api

4. Start the frontend application.  
   npm run dev

The application should now be running at http://localhost:5173 (or the port specified by your Vite server).

## **🚀 Usage**

1. **Register**: Create a new account with a unique email and password.  
2. **Login**: Use your credentials to log in. The JWT will be stored to keep you authenticated.  
3. **Add a Task**: Type a new task in the input field and press Enter or click the "Add" button.  
4. **Manage Tasks**:  
   * Click on a task to mark it as complete.  
   * Click the "Edit" button to modify a task.  
   * Click the "Delete" button to remove a task permanently.

## **🔐 Authentication**

The application uses **JSON Web Tokens (JWT)** for secure, stateless authentication.

1. When a user logs in, the server generates a JWT containing the user's ID.  
2. This token is sent back to the client and stored (e.g., in localStorage).  
3. For every subsequent authenticated request to a protected route, the token is sent in the Authorization header (Bearer \<token\>).  
4. The server verifies the token to ensure the user is authenticated and authorized to access the requested resources.

## **🤝 Contributing**

Contributions are always welcome\! If you have suggestions for improvements or find a bug, please create a new issue or submit a pull request.

## **📄 License**

This project is licensed under the **MIT License**.
