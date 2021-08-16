import React from 'react'
import phonebook from '../services/phonebook'

const NewContact = ({state}) => {

    const getName = (event) => {
        state.setNewName(event.target.value)
  }
      const getNum = (event) => {
        state.setNewNum(event.target.value)
  }

const validateContact = () =>{
  if(state.newName === ""){
    state.setNotification({error: true, message: 'supply a contact name'})
    return true
  }else if(state.newNum === ""){
    state.setNotification({error: true, message: 'supply a phone number'}) 
    return true
  }
}
      const addPerson = (event) => {
        event.preventDefault()
        if(validateContact()) return;
        let params = {name: state.newName, number: state.newNum};
        let existing_contact = state.persons.find(person => person.name === state.newName);
        if(existing_contact){
          let update = window.confirm(`${existing_contact.name} already exits, do you want to replace the number?`);
          if(update){
            phonebook.updateContact(existing_contact.id, params)
           .then(response => {
            state.setPersons([...state.persons, response]);
            state.setNotification({error: false, message: `Updated ${existing_contact.name}`})
           })
           .catch((err) => {
             return {error: true, message: err.message}
           })
          }
        }else{
          phonebook.saveContact({name: state.newName, number: state.newNum})
          .then(response => {
            state.setPersons([...state.persons, response]);
            state.setNotification({error: false, message: `Added ${state.newName}`})
           })
          .catch(() => {
            state.setNotification({error: false, message:`contact not saved`})
           });
        }
        state.setNewName('');
        state.setNewNum('');
      }
      
      return(
        <form>
            <div>
            name: <input onBlur={getName} />
            </div>
            <div>
            number: <input onBlur={getNum} />
            </div>
            <div>
            <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
      )    
}

export default NewContact