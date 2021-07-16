import React, { useState, useEffect } from "react"
import { useGlobalContext } from "./context"
import { BsArrowLeft } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"
import Loading from "./Loading"

const Country = () => {
  const { countriesData, fetchCountries, isLoading, setIsLoading } =
    useGlobalContext()
  const [selectedCountry, setSelectedCountry] = useState([])
  const [displayBorders, setDisplayBorders] = useState([])
  let { countryName } = useParams()
  let displayPopulation, displayCurrencies, displayLanguages, urlTitle

  if (countryName) {
    urlTitle = countryName
  }

  const fetchCountry = async () => {
    const req = await fetch(
      `https://restcountries.eu/rest/v2/name/${urlTitle}?fullText=true`
    )
    const res = await req.json()
    setSelectedCountry(res[0])
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchCountry()
  }, [urlTitle])

  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = selectedCountry

  useEffect(() => {
    if (countriesData && borders) {
      let bordersArr = []
      countriesData.map((country) => {
        for (let i = 0; i < borders.length; i++) {
          if (country.alpha3Code === borders[i]) {
            bordersArr.push(country.name)
          }
        }
      })
      setDisplayBorders(bordersArr)
    }
  }, [countriesData, selectedCountry, urlTitle])

  if (population && currencies && languages) {
    let currenciesArr = []
    let langArr = []
    displayPopulation = population
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    currencies.map((currency) => {
      currenciesArr.push(currency.name)
    })
    displayCurrencies = currenciesArr.join(", ")

    languages.map((lang) => {
      langArr.push(lang.name)
    })
    displayLanguages = langArr.join(", ")
  }

  useEffect(() => {
    if (selectedCountry) {
      setIsLoading(false)
    }
  }, [selectedCountry])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="country">
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="country-btn">
          <BsArrowLeft /> <span>Back</span>
        </button>
      </Link>
      <div className="country-main">
        <img src={flag} alt={`Flag of ${name}`} className="country-img" />
        <div className="country-info">
          <h2 className="country-name">{name}</h2>
          <div className="country-details">
            <ul className="country-details-list">
              <li className="country-details-item">
                <span>native name:</span> {nativeName}
              </li>
              <li className="country-details-item">
                <span>population:</span> {displayPopulation}
              </li>
              <li className="country-details-item">
                <span>region:</span> {region}
              </li>
              <li className="country-details-item">
                <span>sub region:</span> {subregion}
              </li>
              <li className="country-details-item">
                <span>capital:</span> {capital}
              </li>
            </ul>
            <ul className="country-details-list">
              <li className="country-details-item">
                <span>top level domain:</span> {topLevelDomain}
              </li>
              <li className="country-details-item">
                <span>currencies:</span> {displayCurrencies}
              </li>
              <li className="country-details-item">
                <span>languages:</span> {displayLanguages}
              </li>
            </ul>
          </div>
          <div className="country-borders">
            <h3 className="country-borders-heading">border countries:</h3>
            <ul className="country-borders-list">
              {displayBorders.length > 0 ? (
                displayBorders.map((border, i) => {
                  return (
                    <Link
                      to={`/country/${border}`}
                      key={i}
                      style={{ textDecoration: "none" }}
                    >
                      <li className="country-borders-item">{border}</li>
                    </Link>
                  )
                })
              ) : (
                <li className="country-borders-item">No border countries</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Country
