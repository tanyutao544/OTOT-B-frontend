import React from 'react';
import axios from 'axios';

export default class ContactList extends React.Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    axios
      .get(
        'http://ototbwebapp-env-2.eba-h8xavamx.ap-southeast-1.elasticbeanstalk.com/api/contacts'
      )
      .then((res) => {
        const contacts = res.data.data;
        console.log(contacts);
        this.setState({ contacts });
      });
  }

  render() {
    return (
      <ul>
        {this.state.contacts.map((contact) => (
          <li>
            {contact.name} {contact.email}
          </li>
        ))}
      </ul>
    );
  }
}
