import { Route, Switch } from "wouter"
import Header from "./components/Header/Header"
import NotFound from "./components/404"
import Dashboard from "./components/Dashboard"
import PatientsPage from "./components/PatientsPage/PatientsPage"
import PatientDetail from "./components/PatientsPage/PatientDetail"
import LoginPage from "./components/Login/LoginPage"
import WithSession from "./components/Login/WithSession"

function App() {
  console.log('app rerender')
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <WithSession>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/pacientes">
              <PatientsPage />

          </Route>
          <Route path="/pacientes/:id">
              {(params) => (
                  <PatientDetail id={params.id} />
              )}
          </Route>
        </WithSession>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App
