import React, { useState, useContext, useEffect } from "react"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [searchInputValue, setSearchInputValue] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [isLightMode, setIsLightMode] = useState(false)
  const [countriesData, setCountriesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchFilteredCountries, setSearchFilteredCountries] = useState([])
  const [regionFilteredCountries, setRegionFilteredCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countriesData)
  const [cardsAmountMultiplier, setCardsAmountMultiplier] = useState()

  const url = "https://restcountries.eu/rest/v2/all"

  const fetchCountries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      setCountriesData(data)
      setIsLoading(false)
    } catch (error) {
      alert("An error occured. Please try later.")
    }
  }

  useEffect(() => {
    setFilteredCountries(countriesData)
  }, [countriesData])

  const handleSearchCountries = async () => {
    let value = searchInputValue
    let region = selectedRegion
    let valueUrl, regionUrl, valueArray, regionArray

    // VALUE ARRAY //

    if (!value) {
      valueUrl = "https://restcountries.eu/rest/v2/all"
    } else {
      valueUrl = `https://restcountries.eu/rest/v2/name/${value}`
    }

    try {
      const response = await fetch(valueUrl)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status === 404) {
            valueArray = []
          } else {
            valueArray = resData
          }
        })
    } catch (error) {
      console.log(error)
    }

    // REGION ARRAY //

    if (!region) {
      regionUrl = "https://restcountries.eu/rest/v2/all"
    } else {
      regionUrl = `https://restcountries.eu/rest/v2/region/${region}`
    }

    try {
      const response = await fetch(regionUrl)
        .then((res) => res.json())
        .then((resData) => (regionArray = resData))
    } catch (error) {
      console.log(error)
    }

    // ARRAY INTERSECTION //
    setSearchFilteredCountries(valueArray)
    setRegionFilteredCountries(regionArray)
  }

  useEffect(() => {
    let intersection = []
    if (
      searchFilteredCountries.length > 0 &&
      regionFilteredCountries.length > 0
    ) {
      searchFilteredCountries.map((country) => {
        for (let i = 0; i < regionFilteredCountries.length; i++) {
          if (country.name === regionFilteredCountries[i].name) {
            intersection.push(country)
          }
        }
      })
    }
    setFilteredCountries(intersection)
  }, [searchFilteredCountries, regionFilteredCountries])

  useEffect(() => {
    handleSearchCountries()
  }, [searchInputValue, selectedRegion])

  useEffect(() => {
    setIsDropdownOpen(false)
  }, [selectedRegion])

  const handleClick = (e) => {
    let target = e.target
    if (
      target.classList.contains("dropdown") ||
      target.classList.contains("dropdown-select") ||
      target.classList.contains("dropdown-list")
    ) {
      return
    } else {
      setIsDropdownOpen(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        searchInputValue,
        setSearchInputValue,
        handleSearchCountries,
        fetchCountries,
        countriesData,
        isLoading,
        setIsLoading,
        isDropdownOpen,
        setIsDropdownOpen,
        selectedRegion,
        setSelectedRegion,
        filteredCountries,
        isLightMode,
        setIsLightMode,
        handleClick,
        cardsAmountMultiplier,
        setCardsAmountMultiplier,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
