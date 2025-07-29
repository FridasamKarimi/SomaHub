import { useState } from 'react';
import axios from 'axios';

function Signup({ setToken, setAuthMode, setMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setAuthMode(null);
      setMessage('Signup successful');
    } catch (err) {
      setMessage('Signup error: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="mb-8 p-4 bg-gray-100 rounded-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Signup
      </button>
      <button
        type="button"
        onClick={() => setAuthMode(null)}
        className="ml-4 text-blue-500 hover:underline"
      >
        Cancel
      </button>
    </form>
  );
}

export default Signup;