import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterSearch from './components/filterSeacrch'
import NewContact from './components/newContact'
import ContactList from './components/contactList'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ searchResults, setSearchResults ] = useState([]);

  const stateObj = {persons, setPersons, newName, setNewName, newNum, setNewNum, searchResults, setSearchResults}

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(response => {
           console.log(response.data)
         })
  })

  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSearch state={stateObj}/>
      <h3>Add new contact</h3>
      <NewContact state={stateObj}/>
      <h2>Numbers</h2>
      <ContactList contacts={searchResults}/>
    </div>
  )
}

export default App