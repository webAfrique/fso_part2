import React from 'react'

const FilterSearch = ({state}) => {
    const searchContacts = (event) => {
        let str = event.target.value;
        let strRegex = new RegExp(str, 'gi')
        let result = [];
        state.persons.forEach(person => {
          if(/[a-zA-Z]/.test(str) && person.name.match(strRegex) !== null){
            result.push(person)
          }
        })
        state.setSearchResults(result);
      }

      return(
          <>
            search: <input onInput={searchContacts}/>
          </>
      )
}

export default FilterSearch