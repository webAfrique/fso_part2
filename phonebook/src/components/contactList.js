import React from 'react'
import phonebook from '../services/phonebook'

const ContactList = ({state}) => {
    const contacts = state.searchResults;
    const del = function(contact){
        let shouldDelete = window.confirm(`Delete ${contact.name}?`);
        if(shouldDelete){ phonebook.deleteContact(contact.id) }
        const newList = state.searchResults.filter(person => person.id !== contact.id);
        state.setSearchResults(newList);
        console.log(state.persons);
        //.then(response => console.log(response))
        //.catch(err => console.log(err))
    }
    return(
        <div>
            {contacts.length > 0 && 
                contacts.map(person => {
                return <div key={person.id}>
                        <span>{person.name} {person.number}</span>
                        <span style={{marginLeft: '5px', color: 'red'}} onClick={()=>{del(person)}}>X</span>
                    </div>
                    }
                )
            }
        </div>
    )
}

export default ContactList

