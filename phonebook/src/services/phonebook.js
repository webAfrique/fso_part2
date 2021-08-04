import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveContact = (params) => {
    const request = axios.post(baseUrl, params)
    return request.then(response => response.data)
}

const updateContact = (id, params) => {
  const request = axios.patch(`${baseUrl}/${id}`, params)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {getContacts, saveContact, updateContact, deleteContact}