import React, { Component } from "react";
import Form from "./Form/Form";
import Filter from './Filter/Filter'
import ContactList from './ContactList/ContactList'
import "./Phonebook.css";


class Phonebook extends Component {
state = {
  contacts: [
    // {name: 'test', number: '1111', id: 1}
  ],
  filterValue: '',
  }
  

  componentDidMount() {

    // -----------------------> Записали значение LocalStorage в наш State при обновлении (условие для того что бы небыло ошибки при пустом массиве)
    const array = localStorage.getItem('contacts');
    const parsedArray = JSON.parse(array);
    if (parsedArray) { 
      this.setState({
        contacts: parsedArray
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // -----------------------> Сохранили сесию в LocalStorage (условие для сравнения с предыдущим массивом)
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

//----------------------------> Добавляет контакт
  addToList = (item) => {
    this.setState((prev) =>({
    contacts: [...prev.contacts, item],
    }))
    console.log(`Добавили контакт ${item.name}`)
  }

//----------------------------> Удаляет конаткт по id (через фильтр оставляет только те id которые не подходят указанному)
  fnRemove = (id) => {
    const newStateContacts = this.state.contacts.filter(item => item.id !== id);
    this.setState({
      contacts: newStateContacts
    });
    console.log(`Удалили контакт c id: ${id}`)
  }

// ---------------------------> Ф-я отображения в инпуте текста
  fnFilterTarget = (event) => {
    this.setState({
      filterValue: event.target.value
      }
    )
  }

// ---------------------------> Ф-я поиска контакта по его имени
  fnFindContact = () => {
    const normalizeValue = this.state.filterValue.toLowerCase()
    const findContact = this.state.contacts.filter(item => item.name.toLowerCase().includes(normalizeValue))
    return findContact;
  }

  render() {

    //-------> Переменная для рендера фильтра 
    const renderFilter = this.fnFindContact();

    return(
      <div className="list">
      <h1 className="list__title">Phonebook</h1>
      <Form
          addToList={this.addToList}
          contacts={this.state.contacts}/>
        <Filter
          filterValue={this.filterValue}
          fnFilterTarget={this.fnFilterTarget}/>
        <ContactList
          contacts={renderFilter}                   //----> до фильтра был this.state.contacts
          fnRemove={this.fnRemove}/>
    </div>
    )
  }
}

export default Phonebook;