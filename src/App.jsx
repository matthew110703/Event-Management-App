import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Pages
import {
  Login,
  Register,
  Dashboard,
  MyEvents,
  EventDetail,
  JoinEvent,
  NotFound,
} from "./pages";

// Redux
import { useSelector } from "react-redux";

// Toast
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  // Redux
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (alert.message) {
      toast[alert.type](alert.message);
    }
  }, [alert]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/join-event" element={<JoinEvent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
