import { useState } from 'react';
import axios from 'axios';
import background from './imagesbg.png';

const projectID = '3d76c029-297b-43f9-b8fc-0d1268b6e60c';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Wrong password.');
    }
  };

  return (
    <div className="wrapper" style={{ backgroundImage: `url(${background})` }}>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input style={{ padding: '13px', marginTop: '300px', marginBottom: '15px' }} type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input style={{ padding: '13px', marginBottom: '30px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span style={{ fontSize: '22px' }}>Login</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;
