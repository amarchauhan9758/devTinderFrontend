import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./components/utils/strore/appStore";
import Feeds from "./components/Feeds";
import Connections from "./components/Connections";
import Signup from "./components/Signup";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feeds />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
