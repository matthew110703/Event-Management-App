import { useParams } from "react-router-dom";
import moment from "moment";
// UI
import { Container } from "../components";
import {
  editIcon,
  shareIcon,
  adminIcon,
  dateIcon,
  geoIcon,
  usersIcon,
  groupIcon,
  sendIcon,
} from "../assets";

const EventDetail = () => {
  const { id } = useParams();

  const attendees = 0;
  const isEnded = false;
  return (
    <Container>
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
                Event Name
              </h2>
              <div className="divider divider-horizontal"></div>
              <p className="rounded-full bg-info bg-opacity-20 px-2 py-1 text-xs font-semibold uppercase text-info">
                Category
              </p>
            </div>
            {/* Actions */}
            <aside className="flex items-center gap-x-2">
              <button className="btn btn-circle btn-ghost btn-sm md:btn-md">
                <img src={shareIcon} alt="share" className="w-6 lg:w-8" />
              </button>
              <button className="btn btn-circle btn-ghost btn-sm md:btn-md">
                <img src={editIcon} alt="edit" className="w-5 lg:w-6" />
              </button>
            </aside>
          </header>

          <main className="rounded-lg bg-gray-200 p-2">
            <p className="text-xs font-normal md:text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et,
              totam saepe molestiae dolores aut commodi ab? Voluptas tempore
              praesentium dolorum, unde, placeat quas nemo distinctio deleniti
              amet quod ipsam? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Odio et, totam saepe molestiae dolores aut
              commodi ab? Voluptas tempore praesentium dolorum, unde, placeat
              quas nemo distinctio deleniti amet quod ipsam? Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Odio et, totam saepe
              molestiae dolores aut commodi ab? Voluptas tempore praesentium
              dolorum, unde, placeat quas nemo distinctio deleniti amet quod
              ipsam?
            </p>
          </main>

          <footer>
            {/* Details Section  */}
            <section className="*:py-0.5 *:text-xs md:*:text-sm">
              {/* Host Name  */}
              <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
                <img src={adminIcon} alt="host" width={18} />
                <span className="font-semibold text-black">Host</span>
              </div>
              {/* Event Date  */}
              <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
                <img src={dateIcon} alt="datetime" width={18} />
                <time className="font-semibold text-black">
                  {moment("2025-01-25").format("MMMM Do YYYY, h:mm a")}
                </time>
              </div>
              <div className="flex items-center gap-2 rounded-full px-2 md:py-1">
                <img src={geoIcon} alt="location" width={18} />
                <span className="font-semibold text-black">Location</span>
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
                      : "Be the first to join"
                    : attendees + " participants"}
                </span>
              </div>

              {/* Action  */}
              <button
                className="btn- btn btn-info text-white"
                disabled={isEnded}
                onClick={() => {}}
              >
                <img src={groupIcon} alt="profile" width={16} />
                {!isEnded ? "Join" : "Ended"}
              </button>
            </section>
          </footer>
        </section>

        {/* Live Chat */}
        <section className="mt-2 space-y-4 rounded-lg border border-gray-200 p-3 md:basis-1/2 lg:basis-1/3">
          <header className="flex items-center justify-between">
            <h3 className="font- text-lg md:text-xl">Live Chat (Public)</h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              2
              <img src={usersIcon} alt="users" width={16} />
              <span className="text-success">• Online</span>
            </div>
          </header>
          <div className="divider divider-vertical"></div>

          {/* Chat interface */}
          <main className="flex max-h-[600px] min-h-[420px] flex-col-reverse gap-y-1.5 overflow-y-auto rounded-lg bg-gray-200 p-2">
            {/* Chat Bubble  */}
            <div className="max-w-[80%] space-y-0.5 self-end rounded-3xl bg-white px-4 py-1 leading-3">
              <span className="text-xs text-gray-400">Username</span>
              <p className="text-sm">Hello, how are you?</p>
            </div>
            {/* Chat Bubble  */}
            <div className="max-w-[80%] space-y-0.5 self-end rounded-3xl bg-white px-4 py-1 leading-3">
              <span className="text-xs text-gray-400">Username</span>
              <p className="text-sm">Hello, how are you?</p>
            </div>
            {/* Chat Bubble  */}
            <div className="max-w-[80%] space-y-0.5 self-start rounded-3xl bg-white px-4 py-1 leading-3">
              <span className="text-xs text-gray-400">Username</span>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                assumenda quam ullam. Sunt fugiat officia hic libero quia et
                quas quibusdam quam quidem nulla? Delectus consectetur deserunt
                sequi culpa animi?
              </p>
            </div>
          </main>
          <footer>
            <form className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message here..."
                className="input input-bordered w-full"
              />
              <button className="btn btn-circle btn-ghost btn-sm text-white md:btn-md">
                <img src={sendIcon} alt="send" className="w-6 md:w-8" />
              </button>
            </form>
          </footer>
        </section>
      </div>
    </Container>
  );
};

export default EventDetail;
