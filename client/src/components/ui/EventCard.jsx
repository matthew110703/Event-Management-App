import moment from "moment";
import { useNavigate } from "react-router-dom";

// UI
import {
  geoIcon,
  dateIcon,
  usersIcon,
  adminIcon,
  groupIcon,
} from "../../assets";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../../store/alertSlice";

const EventCard = ({
  name,
  category,
  description,
  host,
  date,
  location,
  attendees,
  href,
  className,
  isJoined,
  isHost,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isGuest } = useSelector((state) => state.auth);
  const handleJoin = () => {
    if (isGuest) {
      dispatch(
        showAlert({
          message: "Please login to join the event",
          type: "info",
        }),
      );
      return navigate("/");
    }
    navigate(href);
  };
  const isEnded = date < new Date().toISOString();

  return (
    <article
      className={`flex min-w-[300px] max-w-[600px] flex-col justify-between gap-2 rounded-lg border p-4 shadow-md transition duration-300 ease-in-out hover:shadow-xl md:gap-4 ${className}`}
      onClick={handleJoin}
    >
      <header>
        <div className="flex items-center justify-between">
          <h3 className="text-ellipsis text-wrap text-lg font-semibold md:text-xl">
            {name}
          </h3>
          <p className="rounded-full bg-info bg-opacity-20 px-2 py-1 text-xs font-semibold uppercase text-info">
            {category}
          </p>
        </div>
      </header>

      <main className="rounded-lg bg-gray-200 p-2">
        <p className="line-clamp-3 select-none text-ellipsis text-xs font-light md:text-sm">
          {description}
        </p>
      </main>
      <footer>
        {/* Details Section  */}
        <section className="*:py-0.5 *:text-xs md:*:text-sm">
          {/* Host Name  */}
          <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
            <img src={adminIcon} alt="host" width={18} />
            <span className="font-semibold text-black">{host}</span>
          </div>
          {/* Event Date  */}
          <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
            <img src={dateIcon} alt="datetime" width={18} />
            <time className="line-clamp-2 text-ellipsis text-wrap font-semibold text-black">
              {moment(date).format("MMMM Do YYYY, h:mm a")}
            </time>
          </div>
          <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
            <img src={geoIcon} alt="location" width={18} />
            <span className="line-clamp-2 text-ellipsis text-wrap font-semibold text-black">
              {location}
            </span>
          </div>
        </section>

        <section className="flex items-center justify-end gap-4 space-y-1">
          {/* Attendees  */}
          <div className="flex items-center gap-2">
            <img src={usersIcon} alt="profile" width={16} />
            <span className="text-xs font-semibold text-gray-500">
              {attendees <= 0
                ? isEnded
                  ? "No participants"
                  : isHost
                    ? "No participants yet"
                    : "Be the first to join"
                : attendees + " participants"}
            </span>
          </div>

          {/* Action  */}
          {!isHost && (
            <button
              className="btn btn-info btn-sm text-white"
              disabled={isEnded || isJoined}
              onClick={handleJoin}
            >
              <img src={groupIcon} alt="profile" width={16} />
              {!isEnded ? (isJoined ? "Joined" : "Join") : "Ended"}
            </button>
          )}
        </section>
      </footer>
    </article>
  );
};

export default EventCard;
