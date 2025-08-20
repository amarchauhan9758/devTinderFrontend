import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./components/utils/strore/appStore";

import Login from "./components/LogIn";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feeds from "./components/Feeds";
import Connections from "./components/Connections";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import PremiumPlan from "./components/PremiumPlan";
import LandingPage from "./components/LandingPage";

// This component handles login check
function AppRoutes() {
  const user = useSelector((store) => store?.user?.data);

  if (!user || !user.firstName) {
    // User not logged in → show landing page routes
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // User logged in → show main app routes
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:targetUserId" element={<Chat />} />
        <Route path="/plan" element={<PremiumPlan />} />
      </Route>
      <Route path="*" element={<Navigate to="/feeds" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
