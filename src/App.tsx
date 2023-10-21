import { Route, Switch } from "wouter"
import Header from "./components/Header/Header"
import NotFound from "./components/404"
import Dashboard from "./components/Dashboard"
import PatientsPage from "./components/PatientsPage/PatientsPage"
import PatientDetail from "./components/PatientsPage/PatientDetail"
import LoginPage from "./components/Login/LoginPage"
import WithSession from "./components/Login/WithSession"

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <WithSession>
            <Dashboard />
          </WithSession>
        </Route>
        <Route path="/pacientes">
          <WithSession>
            <PatientsPage />
          </WithSession>
        </Route>
        <Route path="/pacientes/:id">
            {(params) => (
              <WithSession>
                <PatientDetail id={params.id} />
              </WithSession>
            )}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App
