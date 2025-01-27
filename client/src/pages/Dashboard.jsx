import { useState } from "react";
// Redux
import { useSelector } from "react-redux";
import {
  useGetEventsQuery,
  useGetUpcomingEventsQuery,
  useGetMetaDataQuery,
} from "../store/eventsApiSlice";

// UI components
import { clearIcon, closeIcon, filterIcon } from "../assets";
import { Badge, Container, EventCard, Loading } from "../components";

// Constants and Helpers
import { months } from "../lib/constants";

const Dashboard = () => {
  // Redux
  const user = useSelector((state) => state.auth.user);

  // Local state
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    type: "",
    category: "",
    from: "",
    to: "",
    userId: user.id || "",
  });

  // Redux
  const {
    data: events,
    error: eventsError,
    isLoading,
  } = useGetEventsQuery({
    name: filters.name,
    date: filters.date,
    type: filters.type,
    category: filters.category,
    from: filters.from,
    to: filters.to,
    userId: user.id,
  });

  const { data: upcomingEvents, isLoading: loadingUpcomingEvents } =
    useGetUpcomingEventsQuery(user.id);
  const { data: metaData, isLoading: loadingMetaData } = useGetMetaDataQuery();

  return (
    <Container>
      {/* Main Content */}
      <section aria-label="upcoming-events" className="space-y- py-2">
        <h2 className="rounded-t-lg p-3 text-2xl font-bold">Upcoming Events</h2>
        <div className="flex gap-x-4 overflow-x-auto rounded-b-lg bg-gray-50 px-2 py-6 shadow-inner">
          {loadingUpcomingEvents ? (
            <Loading size="52" />
          ) : (
            upcomingEvents?.map((events) => (
              <EventCard
                key={events._id}
                name={events.name}
                category={events.category}
                description={events.description}
                host={events.host.name}
                date={events.date}
                location={events.location}
                attendees={events.attendees.length}
                className={"min-w-[400px]"}
                href={`/event/${events._id}`}
              />
            ))
          )}
        </div>
      </section>

      <div className="divider-veritical divider"></div>

      {/* Filters */}
      <section
        aria-label="filters"
        className="my-3 hidden w-full items-center justify-around p-2 md:flex"
      >
        {/* Categories */}
        <div className="flex w-1/2 flex-wrap gap-2">
          <Badge
            text="All"
            active={filters.category === ""}
            onClick={() => setFilters({ ...filters, category: "" })}
          />
          {!loadingMetaData &&
            metaData?.event?.categories.map((category) => (
              <Badge
                key={category}
                text={category}
                active={filters.category === category}
                onClick={() => setFilters({ ...filters, category: category })}
              />
            ))}
        </div>

        <div className="divider divider-horizontal"></div>

        {/* Months */}
        <div className="flex max-w-[30%] flex-wrap gap-2 *:uppercase">
          {months.map((month, idx) => (
            <Badge
              key={idx}
              text={month.label}
              active={filters.from === month.from && filters.to === month.to}
              onClick={() =>
                setFilters({ ...filters, from: month.from, to: month.to })
              }
            />
          ))}
        </div>

        <div className="divider divider-horizontal"></div>

        {/* Reset Filters */}
        <div className="items-center gap-2 md:flex">
          <img src={filterIcon} alt="filter" width={48} />
          <button
            className={`btn btn-info btn-sm text-white`}
            onClick={() =>
              setFilters({ ...filters, category: "", from: "", to: "" })
            }
            disabled={filters.category === "" && !filters.from && !filters.to}
          >
            Reset
          </button>
        </div>
      </section>

      <div className="divider divider-vertical"></div>

      {/* Search by Name and Date */}
      <section
        aria-label="search"
        className="my-3 flex items-center justify-start p-2"
      >
        {/* Search Bar */}
        <label
          htmlFor="search"
          className="input input-sm input-bordered flex w-1/2 items-center gap-3 md:input-md"
        >
          <input
            id="search"
            type="text"
            className="grow"
            placeholder="Search"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <button
            onClick={() => setFilters({ ...filters, name: "" })}
            hidden={!filters.name}
          >
            <img src={clearIcon} alt="clear" width={16} />
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <div className="divider divider-horizontal"></div>

        {/* Date Picker */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="date"
            className="input input-sm input-bordered flex items-center gap-2 md:input-md"
          >
            <input
              type="date"
              name="date"
              id="date"
              className="grow"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
            <span className="hidden md:block">Date</span>
          </label>
          <button
            onClick={() => setFilters({ ...filters, date: "" })}
            hidden={!filters.date}
          >
            <img src={closeIcon} alt="clear" width={20} />
          </button>
        </div>
      </section>

      {/* Search Results  */}
      <section aria-label="search-results" className="space-y-2 py-2">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <Loading size="52" />
          ) : eventsError ? (
            <p>Error: {eventsError}</p>
          ) : events.length === 0 ? (
            <div className="flex items-center justify-center">
              <p>No events found.</p>
            </div>
          ) : (
            events.map((event) => (
              <EventCard
                key={event._id}
                name={event.name}
                category={event.category}
                description={event.description}
                host={event.host.name}
                date={event.date}
                location={event.location}
                attendees={event.attendees.length}
                href={`/event/${event._id}`}
              />
            ))
          )}
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
