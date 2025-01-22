import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import {
  Login,
  Register,
  Dashboard,
  MyEvents,
  EventDetail,
  NotFound,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
