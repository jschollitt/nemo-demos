import { useState } from 'react'
import { register, login, getCurrentUser } from "./auth";

function App() {
  // values used for user registration
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRepassword, setRegRePassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [registered, setRegistered] = useState("");

  // values used for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  /**
   * Handle user register form submission. Pass form data to auth.js to call backend API
   * @param {Event} event 
   */
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // request API call to register new user
      const success = await register(regUsername, regPassword, regRepassword, regEmail);
      // set result of API call to variable in state
      setRegistered(success);
    } catch (error) {
      alert("registration failed" + error);
    }
  };

  /**
   * Handle user login form submission. Pass form data to auth.js to call backend API
   * @param {Event} event 
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // request login API call
      await login(username, password);
      // request user query API call
      const userData = await getCurrentUser();
      // set result of API call to variable in state
      setUser(userData);
    } catch (error) {
      alert("login failed" + error);
    }
  };

  // return 2 react fragments, 1 for register form, 1 for login form.
  // Display either form or response message for both fragments
  return (
    <div>
      <h1>User registration and login demo</h1>
      <>
        {!registered ? (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={regRepassword}
              onChange={(e) => setRegRePassword(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <br />
            <button type="submit">Register</button>
          </form>
        ) : (
          <div>
            <h2>{regUsername} registered successfully</h2>
          </div>
        )}
      </>
      <>
        {!user ? (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <h2>Welcome, {user.username}</h2>
            <p>Email: {user.email}</p>
          </div>
        )}
      </>
    </div>
  );
}

export default App
