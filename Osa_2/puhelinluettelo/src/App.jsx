/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personRequests'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('')

  const handleNotification = (message, color) => {
    setMessage(message)
    setNotificationColor(color)
    setTimeout(() => {
      setMessage(null)
      setNotificationColor('')
    }, 3000)
  }

  useEffect(() => {
    personService 
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])
 
  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    
    const personExists = persons.find(person => person.name === newName)

    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...personExists, number: newNumber }
        personService
          .update(personExists.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== personExists.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            handleNotification(`${newName} updated`, 'green')
          })
          .catch(error => {
            handleNotification(`Information of ${newName} has already been removed from server`, 'red')
            setPersons(persons.filter(person => person.id !== personExists.id))
          })
      }
    } else {
      const newId = persons.length > 0
        ? Math.max(...persons.map(person => parseInt(person.id))) + 1
        : 1
      const newPersonWithId = { ...newPerson, id: newId.toString() }
      personService
        .create(newPersonWithId)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          handleNotification(`${newName} added`, 'green')
        })
      }
    }
      const deletePerson = person => {
      if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          handleNotification(`${person.name} deleted`, 'red')
        })
        .catch(error => {
          handleNotification(`Information of ${newName} has already been removed from server`, 'red')
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={notificationColor} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {personsToShow.map(person => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><button onClick={() => deletePerson(person)}>delete</button></td>
            </tr>
          ))}        
        </tbody>
      </table>
    </div>
  )
}

export default App
