import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

// Pages
import { Login, Register, NotFound } from "./pages";

// Redux
import { useSelector } from "react-redux";

// Toast
import { toast, ToastContainer } from "react-toastify";
import { Loading, Protected } from "./components";

// Lazy load the main components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyEvents = lazy(() => import("./pages/MyEvents"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const JoinEvent = lazy(() => import("./pages/JoinEvent"));

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
      <Suspense fallback={<Loading size={"screen"} />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/my-events"
            element={
              <Protected>
                <MyEvents />
              </Protected>
            }
          />
          <Route
            path="/event/:id"
            element={
              <Protected>
                <EventDetail />
              </Protected>
            }
          />
          <Route
            path="/join-event"
            element={
              <Protected>
                <JoinEvent />
              </Protected>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
