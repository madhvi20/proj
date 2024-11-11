import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from the backend
    axios.get("http://localhost:5000/api/users")
      .then(response => setUsers(response.data))
      .catch(err => console.log("Error fetching users: ", err));
  }, []);

  const addUser = (newUser) => {
    axios.post("http://localhost:5000/api/users", newUser)
      .then(response => setUsers([...users, response.data]))
      .catch(err => console.log("Error adding user: ", err));
  };

  const updateUser = (updatedUser) => {
    axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser)
      .then(response => {
        const updatedUsers = users.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        );
        setUsers(updatedUsers);
      })
      .catch(err => console.log("Error updating user: ", err));
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:5000/api/users/${userId}`)
      .then(response => {
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(err => console.log("Error deleting user: ", err));
  };

  return (
    <div className="App">
      <h1>User Registration</h1>
      {editingUser ? (
        <EditUser user={editingUser} updateUser={updateUser} />
      ) : (
        <AddUser addUser={addUser} />
      )}
      <UserList users={users} deleteUser={deleteUser} setEditingUser={setEditingUser} />
    </div>
  );
}

export default App;
