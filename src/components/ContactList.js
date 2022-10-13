import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState(null);
  
  const getQuestion = async (signal) => {
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
    getQuestion({signal: abortCont.signal});

    return () => abortCont.abort();
  }, [])

  const handleDelete = async (id) => {
    const newContacts = contacts.filter((contact) => contact._id !== id);
      axios
      .delete('http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts/'+ id)
      .then((res) => {
        if (res.status === 200) {
          alert('Post deleted!');
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
          <h2>{contact.name}</h2>
          <p>{contact.email} {contact.phone}</p>
          <button onClick={() => handleDelete(contact._id)}>delete contact</button>
          </div>
        ))}
      </div>
  );
}
 
export default ContactList;
