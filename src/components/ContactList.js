import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState(null);
  
  const getQuestion = async () => {
    await axios.get(
      'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts'
    ).then((res) => {
      const contacts = res.data.data;
      setContacts(contacts);
    })
  }

  useEffect(() => {
    getQuestion();
  }, [])

  const handleDelete = async (id) => {
      axios
      .delete('http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts/'+ id)
      .then(() => {
        alert("Post deleted!");
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
