
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/body'
import LogIn from './components/LogIn'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './components/utils/strore/appStore'
import Feeds from './components/Feeds'

function App() {


  return (
    <>
      <Provider store={appStore} >


        <BrowserRouter basename='/' >
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path="/" element={<Feeds />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

          </Routes>

        </BrowserRouter>
      </Provider>



    </>
  )
}

export default App
