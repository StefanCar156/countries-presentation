import React from "react"
import { BsSun, BsMoon } from "react-icons/bs"
import { useGlobalContext } from "./context"

const Navbar = () => {
  const { isLightMode, setIsLightMode } = useGlobalContext()
  return (
    <header>
      <nav className="nav">
        <h1 className="nav-heading">Where in the world?</h1>
        <button
          className="nav-btn"
          onClick={() => setIsLightMode(!isLightMode)}
        >
          {!isLightMode ? (
            <>
              <BsMoon />
              <span>dark mode</span>
            </>
          ) : (
            <>
              <BsSun /> <span>light mode</span>
            </>
          )}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
