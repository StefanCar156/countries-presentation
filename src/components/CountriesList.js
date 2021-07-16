import React, { useEffect } from "react"
import CountryCard from "./CountryCard"
import Loading from "./Loading"
import { useGlobalContext } from "./context"
import { Link } from "react-router-dom"

const CountriesList = () => {
  const { fetchCountries, filteredCountries, isLoading, countriesData } =
    useGlobalContext()
  useEffect(() => {
    fetchCountries()
  }, [])

  console.log(countriesData)

  if (isLoading) {
    return <Loading />
  }

  if (filteredCountries.length === 0 && !isLoading) {
    return (
      <div className="countries-list">
        <p className="no-countries-notification">
          No countries that match your filters
        </p>
      </div>
    )
  }

  return (
    <div className="countries-list">
      {filteredCountries.map((country, i) => {
        return (
          <Link
            to={`/country/${country.name}`}
            key={i}
            style={{ textDecoration: "none" }}
          >
            <CountryCard props={country} />
          </Link>
        )
      })}
    </div>
  )
}

export default CountriesList
