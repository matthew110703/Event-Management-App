// Ui
import Modal from "../components/layout/Modal";
import { groupIcon } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const JoinEvent = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  return (
    <Modal>
      <form className="mx-auto space-y-4 rounded-lg bg-white p-4 shadow-md md:w-2/5 md:p-8">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Join Event</h2>
          <Link to={"/dashboard"} className="btn btn-outline btn-sm">
            <span aria-hidden="true">&larr;</span> Go Back
          </Link>
        </header>
        <div className="divider divider-vertical"></div>
        <label htmlFor="room-id" className="form-control w-full">
          <div className="label">
            <span className="label-text">Enter Room ID</span>
          </div>
          <input
            type="text"
            id="room-id"
            className="input input-bordered"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </label>
        <button
          className="btn btn-info w-full text-white"
          type="submit"
          onClick={() => navigate(`/event/${roomId}`)}
        >
          <img src={groupIcon} alt="users" width={24} />
          <span>Join</span>
        </button>
      </form>
    </Modal>
  );
};

export default JoinEvent;
