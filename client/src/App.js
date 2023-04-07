import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";

import { NavigationContext } from "./context/navigation-context";
import AppLayout from "./layout/AppLayout";
import ThreadPage from "./pages/ThreadPage";
import NewThreadsPage from "./pages/NewThreadsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddNewThreadPage from "./pages/AddNewThreadPage";

import "./App.css";
import ExploreFriendsPage from "./pages/ExploreFriendsPage";
import ExploreTopicsPage from "./pages/ExploreTopicsPage";
import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR } from "./global-settings/colors";

function App() {
  const [currentlyActiveNav, setCurrentlyActiveNav] = useState("new");
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavClick(e) {
    console.log(e.key);
    // setCurrentlyActiveNav(e.key);

    switch (e.key) {
      case "new":
        navigate("/");
        break;
      case "topics":
        navigate("/topics");
        break;
      case "login":
        navigate("/login");
        break;
      case "signup":
        navigate("/signup");
        break;
      case "people":
        navigate("/people");
        break;
      default:
        navigate("/");
    }
  }

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    let lastPathSegment = pathSegments[pathSegments.length - 1];
    if (!lastPathSegment) {
      lastPathSegment = "new";
    }
    setCurrentlyActiveNav(lastPathSegment);
  }, [location]);

  return (
    <NavigationContext.Provider value={{ currentlyActiveNav, handleNavClick }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: PRIMARY_COLOR,
            colorText: PRIMARY_TEXT_COLOR,
            colorTextHeading: PRIMARY_COLOR,
          },
        }}
      >
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="" element={<NewThreadsPage />}></Route>
            <Route path="topics" element={<ExploreTopicsPage />}></Route>
            <Route
              path="categories/thread/:threadId"
              element={<ThreadPage />}
            ></Route>
            <Route
              path="categories/new-thread"
              element={<AddNewThreadPage />}
            ></Route>
            <Route path="people" element={<ExploreFriendsPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </NavigationContext.Provider>
  );
}

export default App;
