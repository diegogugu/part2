const Persons = ({filteredValue, filteredPersons, persons}) => {
    return (
       <> {filteredValue ?
            filteredPersons.map((persona, index) => (<p key={persona.name + index}>{persona.name} {persona.number}</p>)) :
            persons.map((persona, index) => (<p key={persona.id}>{persona.name} {persona.number}</p>))}</>
    )
}

export default Persons;