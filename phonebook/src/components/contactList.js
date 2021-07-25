import React from 'react'

const ContactList = ({contacts}) => {
    return(
        <div>
            {contacts.length > 0 && 
                contacts.map(person => {
                return <p>{person.name} {person.number}</p>
                    }
                )
            }
        </div>
    )
}

export default ContactList