import React from 'react'

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Job</th>
            <th></th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

const Table = (props) => {
    const {characterData, removeCharacter} = props

    return (
        <table>
            <TableHeader />
            <TableBody characterData={characterData}
                       removeCharacter={removeCharacter} />
        </table>
    )
}

export default Table