import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
// UI
import { Container, EventForm, Modal, Loading } from "../components";
import {
  editIcon,
  shareIcon,
  adminIcon,
  dateIcon,
  geoIcon,
  usersIcon,
  groupIcon,
} from "../assets";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../store/alertSlice";
import {
  useGetEventQuery,
  useJoinEventMutation,
} from "../store/eventsApiSlice";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const isEnded = false;

  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isGuest } = useSelector((state) => state.auth);
  const { data: event, error, isLoading } = useGetEventQuery(id);
  const [joinEvent, { isLoading: joining, error: joinError }] =
    useJoinEventMutation();

  if (isLoading) return <Loading size={"52"} />;

  if (error) return <p>Error: {error.message}</p>;

  const handleJoinEvent = async (e) => {
    e.preventDefault();
    if (isGuest) {
      navigate("/");
      dispatch(
        showAlert({ message: "Please login to join event", type: "info" }),
      );
      return;
    }

    try {
      const { success } = await joinEvent(id).unwrap();
      if (success) {
        dispatch(
          showAlert({ message: "Event joined successfully", type: "success" }),
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: joinError?.data?.error, type: "error" }));
    }
  };

  return (
    <Container>
      {/* Event Form Modal */}
      {showModal && (
        <Modal>
          <EventForm edit onClose={() => setShowModal(!showModal)} />
        </Modal>
      )}

      <button className="btn btn-ghost btn-sm" onClick={() => history.back()}>
        <span aria-hidden="true">&larr;</span> Back
      </button>

      <div className="items-start justify-between gap-2 lg:flex">
        <section
          aria-label="Event Detail"
          className="mt-2 space-y-4 rounded-lg border border-gray-200 p-8 md:basis-1/2 lg:basis-2/3"
        >
          <header className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                {event.name}
              </h2>
              <div className="divider divider-horizontal"></div>
              <p className="rounded-full bg-info bg-opacity-20 px-2 py-1 text-xs font-semibold uppercase text-info">
                {event.category}
              </p>
            </div>
            {/* Actions */}
            <aside className="flex items-center gap-x-2">
              <button
                className="btn btn-circle btn-ghost btn-sm md:btn-md"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard");
                }}
              >
                <img src={shareIcon} alt="share" className="w-6 lg:w-8" />
              </button>

              {user.id === event.host._id && !isEnded && (
                <button
                  className="btn btn-circle btn-ghost btn-sm md:btn-md"
                  onClick={() => setShowModal(!showModal)}
                >
                  <img src={editIcon} alt="edit" className="w-5 lg:w-6" />
                </button>
              )}
            </aside>
          </header>

          <main className="rounded-lg bg-gray-200 p-2">
            <p className="text-xs font-normal md:text-base">
              {event.description}
            </p>
          </main>

          <footer>
            {/* Details Section  */}
            <section className="*:py-0.5 *:text-xs md:*:text-sm">
              {/* Host Name  */}
              <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
                <img src={adminIcon} alt="host" width={18} />
                <span className="font-semibold text-black">
                  {event?.host?.name}
                </span>
              </div>
              {/* Event Date  */}
              <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
                <img src={dateIcon} alt="datetime" width={18} />
                <time className="font-semibold text-black">
                  {moment(event.date).format("MMMM Do YYYY, h:mm a")}
                </time>
              </div>
              <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
                <img src={geoIcon} alt="location" width={18} />
                <span className="font-semibold text-black">
                  {event.location}
                </span>
              </div>
            </section>

            <section className="flex items-center justify-end gap-4 space-y-1">
              {/* Attendees  */}
              <div className="flex items-center gap-2">
                <img src={usersIcon} alt="profile" width={16} />
                <span className="text-xs font-semibold text-gray-500">
                  {event?.attendees.length <= 0
                    ? isEnded
                      ? "No participants"
                      : event?.host._id === user.id
                        ? "No participants yet"
                        : "Be the first to join"
                    : event?.attendees.length + " participants"}
                </span>
              </div>

              {/* Action  */}
              {user.id !== event.host._id && (
                <form onSubmit={handleJoinEvent}>
                  <button
                    className="btn btn-info text-white"
                    disabled={
                      isEnded || event.attendees.includes(user.id) || joining
                    }
                  >
                    <img src={groupIcon} alt="profile" width={16} />
                    {joining && (
                      <span className="loading loading-dots loading-sm"></span>
                    )}
                    {!isEnded
                      ? event.attendees.includes(user.id)
                        ? "Joined"
                        : "Join"
                      : "Ended"}
                  </button>
                </form>
              )}
            </section>
          </footer>
        </section>
      </div>
    </Container>
  );
};

export default EventDetail;
