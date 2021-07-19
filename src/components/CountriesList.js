import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import Loading from "./Loading"
import { useGlobalContext } from "./context"
import { Link } from "react-router-dom"

const CountriesList = () => {
  const {
    fetchCountries,
    filteredCountries,
    isLoading,
    cardsAmountMultiplier,
    setCardsAmountMultiplier,
  } = useGlobalContext()
  const [isMoreCardsAvailable, setIsMoreCardsAvailable] = useState(true)

  const disableClickStyle = {
    pointerEvents: "none",
    opacity: "0.3",
  }

  // Check whether or not there is more countries to show
  useEffect(() => {
    if (filteredCountries.length < cardsAmountMultiplier * 8) {
      setIsMoreCardsAvailable(false)
    } else {
      setIsMoreCardsAvailable(true)
    }
  }, [cardsAmountMultiplier, filteredCountries])

  // On component load, set default values
  useEffect(() => {
    setCardsAmountMultiplier(1)
    fetchCountries()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (filteredCountries.length === 0 && !isLoading) {
    return (
      <div className="countries">
        <p className="no-countries-notification">
          No countries that match your filters
        </p>
      </div>
    )
  }

  return (
    <div className="countries">
      <div className="countries-list">
        {filteredCountries.map((country, i) => {
          if (i < cardsAmountMultiplier * 8) {
            return (
              <Link
                to={`/country/${country.name}`}
                key={i}
                style={{ textDecoration: "none" }}
              >
                <CountryCard props={country} />
              </Link>
            )
          }
        })}
      </div>
      <div className="countries-btns">
        <button
          className="countries-btn"
          onClick={() => setCardsAmountMultiplier(cardsAmountMultiplier + 1)}
          style={!isMoreCardsAvailable ? disableClickStyle : null}
        >
          show more
        </button>
        <button
          className="countries-btn"
          onClick={() =>
            setCardsAmountMultiplier(Math.ceil(filteredCountries.length / 8))
          }
          style={!isMoreCardsAvailable ? disableClickStyle : null}
        >
          show all
        </button>
      </div>
    </div>
  )
}

export default CountriesList
