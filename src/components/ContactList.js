import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState(null);
  
  const getQuestions = async (signal) => {
    await axios.get(
      'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts', signal
    ).then((res) => {
      const contacts = res.data.data;
      setContacts(contacts);
    }).catch(err=> {
        console.log(err.message);
    })
  }

  useEffect(() => {
    const abortCont = new AbortController();
    getQuestions({signal: abortCont.signal});

    return () => abortCont.abort();
  }, [])

  const handleDelete = async (id) => {
    const newContacts = contacts.filter((contact) => contact._id !== id);
      axios
      .delete('http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts/'+ id)
      .then((res) => {
        if (res.status === 200) {
          alert('Contact deleted!');
          setContacts(newContacts);
        }
      }).catch(err=> {
        console.log(err.message);
      });
  }

  if(!contacts)
    return null;

  return (
    <div className="contactList">
        {contacts.map((contact) => (
          <div className="contact-preview" key = {contact._id}> 
            <Link to={`/contacts/${contact._id}`}>
              <h2>{contact.name}</h2>
              <p>{contact.email} {contact.phone} {contact.gender}</p>
              <button onClick={() => handleDelete(contact._id)}>delete contact</button>
            </Link>
          </div>
        ))}
      </div>
  );
}
 
export default ContactList;
