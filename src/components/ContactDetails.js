import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";

const ContactDetails = () => {
    const { id } = useParams()
    const [contact, setContact] = useState(null);
    
    const getQuestion = async (signal) => {
        await axios.get(
            'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts/'+id, signal
          ).then((res) => {
            const contact = res.data.data;
            setContact(contact);
          }).catch(err=> {
              console.log(err.message);
          })
    }

    useEffect(() => {
        const abortCont = new AbortController();
        getQuestion({signal: abortCont.signal});
    
        return () => abortCont.abort();
    }, [])

    if(!contact)
    return null;

    return (
        <div className="contact-preview">
            <div>
                <h2>{contact.name}</h2>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
                <p>{contact.gender}</p>
            </div>
        </div>
    );
}
 
export default ContactDetails;