import React from 'react'

function Earthquakes({ topEarthquakes }) {
    const earthquakes = topEarthquakes.map((earthquake, index) => (
        <li className="earthquake" key={index}>
            <h3>Title: {earthquake.title} </h3>
            <p>Lat: {earthquake.latitude}</p>
            <p>Long: {earthquake.longitude}</p>
            <p>Kilometers: {earthquake.kilometers}</p>
        </li>
    )

    )


    return (
        <div className="earthquakes">
            <ul>
                {earthquakes}
            </ul>
        </div>
    )
}

export default Earthquakes
