import { ContactForm } from "./Component/ContactForm/ContactForm";
import { Filter } from "./Component/Filter/Filter";
import { ContactList } from "./Component/ContactList/ContactList";
import contactsDefault from './path/contactsDefault.json'

import { Component } from "react";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  addContact = (contact) => {
    this.state.contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(`${contact.name} is already in contacts!`)
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  componentDidMount(){
  const contacts = JSON.parse(localStorage.getItem("contacts")) || contactsDefault
  return this.setState(prevState =>({ contacts}))
  }

  componentDidUpdate(prevState){
  if(prevState.contacts !== this.state.contacts){
  return localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  }
  }

  findChange = (event) => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const filterSmall = filter.toLowerCase();
    return contacts.filter((el) => el.name.toLowerCase().includes(filterSmall));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((el) => el.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter find={this.findChange} />

        <ContactList
          contacts={this.filterContacts()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
