import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contact = { name, email, phone, gender };
    await axios
      .post(
        'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts',
        contact
      )
      .then((res) => {
        if (res.status === 201) {
          alert('contact created!');
        }
        navigate('/');
      });
  };

  return (
    <div className="create">
      <h2>Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <label>Contact Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Contact email</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contact phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Contact gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button>Add Contact</button>
      </form>
    </div>
  );
};

export default Create;
