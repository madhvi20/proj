import React, { useState, useEffect } from "react";

const EditUser = ({ user, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setDateOfBirth(user.dateOfBirth);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...user, name, email, dateOfBirth });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
