const Total = ({ parts }) => {
    const totalExercises = parts
        .map((parts) => { return parts.exercises ? parts.exercises : 0 })
        .reduce((initial, accumulator) => { return initial + accumulator })
    return <>
        <strong>Number of exercises {totalExercises}</strong>
    </>
}

export default Total