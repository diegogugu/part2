import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [filteredValue, setFilteredValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const getPerson = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      const persons = response.data;
      setPersons(persons);
    }, err => {setPersons([{name: 'error loading persons'}])})
  }

  useEffect(() => getPerson, [])

  const addName = (event) => {
    event.preventDefault();
    if (newName && newName !== '' && newNumber && newNumber !== '') {
      if (personDoesntExists(newName)) {
        setPersons([...persons, { name: newName, number: newNumber, id: Date.now() }]);
        setNewName('');
        setNewNumber('');
        console.log(persons);
      } else {
        alert(`${newName.toLowerCase()} is already added to phonebook`);
      }
    }
  }

  const personDoesntExists = (name) => {
    return !persons.find(persona => persona.name.toLowerCase() === name.toLowerCase());
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterValues = (event) => {
    setFilteredValue(event.target.value);
    setFilteredPersons(persons.filter(persona => persona.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterValues={handleFilterValues} filteredValue={filteredValue} />
      <h2>add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredValue={filteredValue} filteredPersons={filteredPersons} />
    </div>
  )
}

export default App