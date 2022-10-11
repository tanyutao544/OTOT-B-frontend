import { useState } from "react";

export default function ContactList() {
    const [contacts, setContacts] = useState(null)
    return <div>Contacts List</div>;

    const getContactListToRender = () => {
        return contacts.map((contacts, idx) => {
            return <div className="contact">{contacts.name}</div>;
        })
    }
}