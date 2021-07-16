import React, { useEffect } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { FiChevronDown } from "react-icons/fi"
import { useGlobalContext } from "./context"

const Options = () => {
  const {
    searchInputValue,
    setSearchInputValue,
    setSelectedRegion,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedRegion,
  } = useGlobalContext()

  let regions = ["africa", "americas", "asia", "europe", "oceania"]

  const handleSelectRegion = (e, region) => {
    if (e.target.classList.contains("dropdown-option-active")) {
      region = ""
    }
    setSelectedRegion(region)
  }

  useEffect(() => {
    setSearchInputValue("")
    setSelectedRegion("")
  }, [])
  return (
    <div className="options">
      <label className="options-label">
        <AiOutlineSearch />{" "}
        <input
          type="text"
          className="options-input"
          placeholder="Search for a country..."
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
      </label>
      <div className="options-dropdown dropdown">
        <div
          className="dropdown-select"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="select">Filter by Region</span>
          <FiChevronDown />
        </div>
        <ul
          className={`dropdown-list ${isDropdownOpen && `dropdown-list-open`}`}
        >
          {regions.map((region, index) => {
            return (
              <li
                className={`dropdown-option ${
                  region === selectedRegion && `dropdown-option-active`
                }`}
                key={index}
                onClick={(e) => handleSelectRegion(e, region)}
              >
                {region}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Options
