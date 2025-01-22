// UI components
import { clearIcon, closeIcon, filterIcon } from "../assets";
import { Badge, Container, EventCard } from "../components";

// Constants
import { months } from "../lib/constants";

const Dashboard = () => {
  return (
    <Container>
      {/* Main Content */}
      <section aria-label="upcoming-events" className="space-y- py-2">
        <h2 className="rounded-t-lg p-3 text-2xl font-bold">Upcoming Events</h2>
        <div className="flex gap-x-4 overflow-x-auto rounded-b-lg bg-gray-50 px-2 py-6 shadow-inner">
          <EventCard
            name="React Summit 2022"
            category="tech"
            description="The largest React conference in the world"
            host="React Community"
            date="2022-10-15T09:00:00Z"
            location="San Francisco, CA"
            attendees={0}
            className={`w-[500px]`}
          />

          <EventCard
            name="Vue.js Conference"
            category="tech"
            description="The official Vue.js conference"
            host="Vue.js Community"
            date="2022-11-15T09:00:00Z"
            location="Amsterdam, Netherlands"
            attendees={0}
            className={`w-[500px]`}
          />
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
          <Badge text="All" active />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
          <Badge text="New" />
          <Badge text="Sports" />
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="flex max-w-[30%] flex-wrap gap-2 *:uppercase">
          {months.map((month) => (
            <Badge key={month.value} text={month.label} />
          ))}
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="items-center gap-2 md:flex">
          <img src={filterIcon} alt="filter" width={48} />
          <button className={`btn btn-info btn-sm text-white`}>Reset</button>
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
          />
          <button>
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
              defaultValue={"2025-01-01"}
            />
            <span className="hidden md:block">Date</span>
          </label>
          <button>
            <img src={closeIcon} alt="clear" width={20} />
          </button>
        </div>
      </section>

      {/* Search Results  */}
      <section aria-label="search-results" className="space-y-2 py-2">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EventCard
            name="React Summit 2022"
            category="tech"
            description="The largest React conference in the world"
            host="React Community"
            date="2022-10-15T09:00:00Z"
            location="San Francisco, CA"
            attendees={0}
          />

          <EventCard
            name="Vue.js Conference"
            category="tech"
            description="The official Vue.js conference"
            host="Vue.js Community"
            date="2022-11-15T09:00:00Z"
            location="Amsterdam, Netherlands"
            attendees={0}
          />
          <EventCard
            name="React Summit 2022"
            category="tech"
            description="The largest React conference in the world"
            host="React Community"
            date="2022-10-15T09:00:00Z"
            location="San Francisco, CA"
            attendees={0}
          />

          <EventCard
            name="Vue.js Conference"
            category="tech"
            description="The official Vue.js conference"
            host="Vue.js Community"
            date="2022-11-15T09:00:00Z"
            location="Amsterdam, Netherlands"
            attendees={0}
          />
          <EventCard
            name="React Summit 2022"
            category="tech"
            description="The largest React conference in the world"
            host="React Community"
            date="2022-10-15T09:00:00Z"
            location="San Francisco, CA"
            attendees={0}
          />

          <EventCard
            name="Vue.js Conference"
            category="tech"
            description="The official Vue.js conference"
            host="Vue.js Community"
            date="2022-11-15T09:00:00Z"
            location="Amsterdam, Netherlands"
            attendees={0}
          />
          <EventCard
            name="React Summit 2022"
            category="tech"
            description="The largest React conference in the world"
            host="React Community"
            date="2022-10-15T09:00:00Z"
            location="San Francisco, CA"
            attendees={0}
          />

          <EventCard
            name="Vue.js Conference"
            category="tech"
            description="The official Vue.js conference"
            host="Vue.js Community"
            date="2022-11-15T09:00:00Z"
            location="Amsterdam, Netherlands"
            attendees={0}
          />
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
