import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const getContacts = async (signal) => {
    await axios
      .get(
        'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts/' +
          id,
        signal
      )
      .then((res) => {
        const contact = res.data.data;
        setContact(contact);
        setName(contact.name);
        setEmail(contact.email);
        setGender(contact.gender);
        contact.phone && setPhone(contact.phone);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = async (id) => {
    axios
      .delete(
        'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts/' +
          id
      )
      .then((res) => {
        if (res.status === 200) {
          alert('Contact deleted!');
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contact = { name, email, phone, gender };
    await axios
      .patch(
        'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts/' +
          id,
        contact
      )
      .then((res) => {
        if (res.status === 200) {
          alert('contact updated!');
          navigate('/');
        } else {
          console.log(res.data.message);
        }
      });
  };

  useEffect(() => {
    const abortCont = new AbortController();
    getContacts({ signal: abortCont.signal });

    return () => abortCont.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!contact) return null;

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Contact Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Contact email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contact phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Contact gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button>Update Contact</button>
        <button onClick={() => handleDelete(id)}>delete contact</button>
      </form>
    </div>
  );
};

export default ContactDetails;
