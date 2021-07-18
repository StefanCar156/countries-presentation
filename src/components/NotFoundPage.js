import React from "react"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img
        className="not-found-img"
        src="../not-found-img.svg"
        alt="not found"
      />
      <h3 className="not-found-heading">404</h3>
      <p className="not-found-paragraph">
        Looks like you are looking for a country that does not exist.
      </p>
      <Link to="/">
        <button className="not-found-btn">go back</button>
      </Link>
    </div>
  )
}

export default NotFoundPage
