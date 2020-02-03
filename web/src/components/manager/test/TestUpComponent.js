import React, { useState } from 'react'
import TestDownComponent from './TestDownComponent'

const TestUpComponent = () => {
    const [state, setState] = useState([])

    return (
        < TestDownComponent arr={state} fn={setState} />
    )

}
export default TestUpComponent