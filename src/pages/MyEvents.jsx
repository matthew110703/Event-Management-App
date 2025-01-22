import { Link } from "react-router-dom";
import { useState } from "react";

// Ui
import { Container, EventCard } from "../components";

const MyEvents = () => {
  const [isActiveTab, setIsActiveTab] = useState("My Events");

  return (
    <Container>
      <div className="mt-12 flex items-baseline justify-between gap-4">
        {/* Tabs  */}
        <div className="flex">
          <Link
            to={"#"}
            className={`text-xl font-semibold md:text-2xl ${isActiveTab === "My Events" ? "text-info" : "text-gray-400"}`}
            onClick={() => setIsActiveTab("My Events")}
          >
            My Events
          </Link>
          <div className="divider divider-horizontal"></div>
          <Link
            to={"#"}
            className={`text-xl font-semibold md:text-2xl ${isActiveTab === "Participated" ? "text-info" : "text-gray-400"}`}
            onClick={() => setIsActiveTab("Participated")}
          >
            Participated
          </Link>
        </div>

        {/* Action  */}
        <button className="btn btn-info btn-sm text-white">
          + Create Event
        </button>
      </div>
      <div className="divider divider-vertical"></div>
      {/* Events  */}
      <section
        aria-label="Events"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <EventCard
          name={"Event Name"}
          category={"Category"}
          description={"Description"}
          host={"Host"}
          date={"2025-12-12T12:00:00.000Z"}
          location={"Location"}
          attendees={"Attendees"}
        />
        <EventCard
          name={"Event Name"}
          category={"Category"}
          description={"Description"}
          host={"Host"}
          date={"2025-12-12T12:00:00.000Z"}
          location={"Location"}
          attendees={"Attendees"}
        />
        <EventCard
          name={"Event Name"}
          category={"Category"}
          description={"Description"}
          host={"Host"}
          date={"2025-12-12T12:00:00.000Z"}
          location={"Location"}
          attendees={"Attendees"}
        />
        <EventCard
          name={"Event Name"}
          category={"Category"}
          description={"Description"}
          host={"Host"}
          date={"2025-12-12T12:00:00.000Z"}
          location={"Location"}
          attendees={"Attendees"}
        />
      </section>
    </Container>
  );
};

export default MyEvents;
