import { Link } from "react-router-dom";
import { useState } from "react";

// Ui
import { Container, EventCard, Modal, EventForm, Loading } from "../components";

// Redux
import { useSelector } from "react-redux";
import {
  useGetEventsJoinedQuery,
  useGetUserEventsQuery,
} from "../store/eventsApiSlice";

const MyEvents = () => {
  const [isActiveTab, setIsActiveTab] = useState("My Events");
  const [openForm, setOpenForm] = useState(false);

  // Redux
  const user = useSelector((state) => state.auth.user);
  const {
    data: userEvents,
    error: errorUserEvents,
    isLoading: loadingUserEvents,
  } = useGetUserEventsQuery();

  const {
    data: participatedEvents,
    error: errorParticipated,
    isLoading: loadingParticipatedEvents,
  } = useGetEventsJoinedQuery();

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
        <button
          className="btn btn-info btn-sm text-white"
          onClick={() => setOpenForm(true)}
        >
          + Create Event
        </button>
      </div>
      <div className="divider divider-vertical"></div>
      {(loadingUserEvents || loadingParticipatedEvents) && (
        <Loading size={"52"} />
      )}
      {/* Events  */}
      <section
        aria-label="Events"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* My Events */}
        {isActiveTab === "My Events" && (
          <>
            {!loadingUserEvents &&
              !errorUserEvents &&
              userEvents.map((event) => (
                <EventCard
                  key={event._id}
                  name={event.name}
                  description={event.description}
                  date={event.date}
                  category={event.category}
                  location={event.location}
                  host={event.host.name}
                  attendees={event.attendees.length}
                  href={`/event/${event._id}`}
                  isJoined={event?.attendees?.includes(user.id)}
                  isHost={event.host._id === user.id}
                />
              ))}
          </>
        )}

        {/* Participated Events */}
        {isActiveTab === "Participated" && (
          <>
            {!loadingParticipatedEvents &&
              !errorParticipated &&
              participatedEvents.map((event) => (
                <EventCard
                  key={event._id}
                  name={event.name}
                  description={event.description}
                  date={event.date}
                  category={event.category}
                  location={event.location}
                  host={event.host.name}
                  attendees={event.attendees.length}
                  href={`/event/${event._id}`}
                  isJoined={event?.attendees?.includes(user.id)}
                  isHost={event?.host?._id === user.id}
                />
              ))}
          </>
        )}
      </section>

      {/* Modal  */}
      {openForm && (
        <Modal>
          <EventForm onClose={() => setOpenForm(!openForm)} />
        </Modal>
      )}
    </Container>
  );
};

export default MyEvents;
