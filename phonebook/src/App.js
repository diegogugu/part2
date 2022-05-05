import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filteredValue, setFilteredValue] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const getPerson = () => {
    personService
      .getAll()
      .then(response => {
        const persons = response.data;
        setPersons(persons);
      }, err => { setPersons([{ name: 'error loading persons' }]) })
  }

  useEffect(() => getPerson, [])

  const addName = (event) => {
    event.preventDefault();
    if (newName && newName !== '' && newNumber && newNumber !== '') {
      if (personDoesntExists(newName)) {
        personService.create({ name: newName, number: newNumber, id: Date.now() })
          .then(response => {
            setPersons([...persons, response.data]);
            setNewName('');
            setNewNumber('');
            setSuccessMessage(`Added ${response.data.name}`)
            setTimeout(() => {
              setSuccessMessage('');
            }, 2000)
          }, err => alert(err));
        console.log(persons);
      } else {
        updateUser();
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

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(personToDelete.id)
        .then(response => {
          setPersons(persons.filter(persona => persona.id !== personToDelete.id));
        }, error => {
          setErrorMessage(`Information of ${personToDelete.name} has already been removed from server`);
          setTimeout(() => setErrorMessage(''), 5000);
        });
    }
  }

  const updateUser = () => {
    if (window.confirm(`${newName.toLowerCase()} is already added to phonebook, replace the old number with a new one?`)) {
      const found = { name: newName, number: newNumber, id: persons.find(persona => persona.name.toLowerCase() === newName.toLowerCase()).id };
      personService.update(found).then(res => {
        setPersons(persons.map(item => item.id === res.data.id ? res.data : item))
        setSuccessMessage(`Added ${res.data.name}`)
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000)
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <>{successMessage ? <div className='success'>{successMessage}</div>: <></>}</>
      <>{errorMessage ? <div className='error'>{errorMessage}</div>: <></>}</>
      <Filter handleFilterValues={handleFilterValues} filteredValue={filteredValue} />
      <h2>add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredValue={filteredValue} filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App