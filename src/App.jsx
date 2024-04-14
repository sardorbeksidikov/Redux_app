import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./components/Auth";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Dashboard from "./components/Dashboard/Dashboard";
import Deposits from "./components/Dashboard/Deposits";
import Orders from "./components/Dashboard/Order";
import Title from "./components/Dashboard/Title";
import Teachers from "./pages/Teachers";
import Main from "./components/teachers/Main";
import { Provider } from "react-redux";
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store} >
      <Router>
        <div>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route path="/main" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/add" element={<Add />} />
              <Route path="/edit/:id" element={<Edit />} />

              <Route path="/deposits" element={<Deposits />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/title" element={<Title />} />
            </Routes>
          </AuthProvider>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
