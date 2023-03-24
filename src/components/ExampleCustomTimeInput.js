import React from 'react'

const ExampleCustomTimeInput = ({timeOption,setTimeOption,arrayOfTimes}) => {
    
    return (
        <select
            onChange={e => setTimeOption(e.target.value)}
            value={timeOption}
            style={{ border: "solid 1px pink" }}
        >
            {arrayOfTimes.map(eachTime => <option value={eachTime}>{eachTime}</option>)}
        </select>

    )
}

export default ExampleCustomTimeInput