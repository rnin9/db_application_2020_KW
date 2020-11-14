import React from 'react'

function MyInfoEditPage({match}){
    const a = match.params.id
    const b = match.params.name

    return(
    <span>This is {a}/{b} page</span>
    )
}

export default MyInfoEditPage