const Filter = ({handleFilterValues, filteredValue}) => {
    return (
      <div>filter shown with <input onChange={handleFilterValues} value={filteredValue} /></div>
    )
}

export default Filter;