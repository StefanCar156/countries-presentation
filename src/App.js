import "./scss/App.scss"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Options from "./components/Options"
import CountriesList from "./components/CountriesList"
import Country from "./components/Country"
import { useGlobalContext } from "./components/context"
import NotFoundPage from "./components/NotFoundPage"

function App() {
  const { isLightMode, handleClick } = useGlobalContext()
  return (
    <Router>
      <div
        className={`App ${isLightMode ? `light` : `dark`}`}
        onClick={(e) => handleClick(e)}
      >
        <Navbar />
        <Route path="/" exact component={Options} />
        <Switch>
          <Route path="/" exact component={CountriesList} />
          <Route path="/country/:countryName" exact component={Country} />
          <Route path="/404" component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
