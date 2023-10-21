import { Route, Switch } from "wouter"
import Header from "./components/Header"
import NotFound from "./components/404"
import Dashboard from "./components/Dashboard"
import PatientsPage from "./components/PatientsPage/Page"
import PatientDetail from "./components/PatientsPage/PatientDetail"

/**
model Patient {
  id           Int            @id @default(autoincrement())
  names        String
  surnames     String
  documentType String
  document     String         @unique
  gender       String         @db.Char(1)
  Appointments Appointments[]
  Diagnose     Diagnose[]
}
 */

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/">
          <Dashboard />
        </Route>
        <Route path="/pacientes">
          <PatientsPage />
        </Route>
        <Route path="/pacientes/:id">
          {({ id }) => <PatientDetail id={id} />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App
