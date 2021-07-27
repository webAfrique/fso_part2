import React from 'react'
import phonebook from '../services/phonebook'

const NewContact = ({state}) => {

    const getName = (event) => {
        state.setNewName(event.target.value)
      }
      const getNum = (event) => {
        state.setNewNum(event.target.value)
      }
      const addPerson = (event) => {
        event.preventDefault()
        let nameExists = state.persons.find(person => person.name === state.newName);
        if(nameExists){
          alert(`${state.newName} already exists in the phonebook`)
        }else{
          phonebook.saveContact({name: state.newName, number: state.newNum})
          .then(response => state.setPersons([...state.persons, response]))
          .catch(() => alert('contact not added'))
        }
        state.setNewName('');
        state.setNewNum('');
      }
      
      return(
        <form>
            <div>
            name: <input onChange={getName} value={state.newName}/>
            </div>
            <div>
            number: <input onChange={getNum} value={state.newNum}/>
            </div>
            <div>
            <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
      )    
}

export default NewContact