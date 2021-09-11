import React from 'react'

export default function List({pokemon}) {
    return (
        <div>
            {pokemon.map(p =>(
                <div className="Name" key={p}>{p}</div>
            ))}
            
        </div>
    )
}
