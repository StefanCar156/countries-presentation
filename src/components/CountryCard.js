import React from "react"

const CountryCard = ({ props }) => {
  const { flag, name, population, region, capital } = props
  let displayPopulation = population
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <article className="card">
      <img src={flag} alt="germany" className="card-img" />
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <ul className="card-details">
          <li className="card-details-item">
            <span>Population</span>: {displayPopulation}
          </li>
          <li className="card-details-item">
            <span>Region</span>: {region}
          </li>
          <li className="card-details-item">
            <span>Capital</span>: {capital}
          </li>
        </ul>
      </div>
    </article>
  )
}

export default CountryCard
