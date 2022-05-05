const Persons = ({ filteredValue, filteredPersons, persons, handleDelete }) => {
    return (
        <> {filteredValue ?
            filteredPersons.map((persona, index) => (<p key={persona.name + index}>{persona.name} {persona.number}<button onClick={() => handleDelete(persona)}>Delete</button></p>)) :
            persons.map((persona, index) => (<p key={persona.id}>{persona.name} {persona.number}<button onClick={() => handleDelete(persona)}>Delete</button></p>))}</>
    )
}

export default Persons;