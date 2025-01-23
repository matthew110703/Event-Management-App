import { closeIcon } from "../../assets";

const EventForm = ({ onClose }) => {
  return (
    <form className="mx-auto space-y-4 rounded-lg bg-white p-4 shadow-md md:w-2/4 md:p-8">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Event Form</h2>
        <button
          type="button"
          className="btn btn-circle btn-sm"
          aria-label="close"
          onClick={onClose}
        >
          <img src={closeIcon} alt="close" width={32} />
        </button>
      </header>
      {/* Name  */}
      <label className="input input-bordered flex items-center gap-2">
        Event Name
        <input
          type="text"
          className="grow"
          placeholder="Eg. Job Placement Event"
        />
      </label>
      {/* Description  */}
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Description ..."
        rows={4}
      ></textarea>
      {/* Type & Category  */}
      <section className="flex w-full gap-4">
        <label htmlFor="type" className="input input-bordered">
          <div className="flex items-center gap-2">
            <label htmlFor="public" className="label gap-2">
              <input
                type="radio"
                name="type"
                id="public"
                className="radio-info radio"
                defaultChecked
              />
              Public
            </label>
            <label htmlFor="private" className="label gap-2">
              <input
                type="radio"
                name="type"
                id="private"
                className="radio-info radio"
              />
              Private
            </label>
          </div>
        </label>

        <label htmlFor="category" className="w-full">
          <select className="select select-bordered w-full">
            <option disabled selected>
              Select Category
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </label>
      </section>
      {/* Date & Time  */}
      <section className="flex w-full items-center gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <input type="date" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="time" />
        </label>
        <time className="font-semibold text-gray-500">
          {new Date().toDateString()} {new Date().toLocaleTimeString()}
        </time>
      </section>
      {/* Location  */}
      <label className="input input-bordered flex items-center gap-2">
        Location
        <input
          type="text"
          placeholder="Eg. Online | Bangalore, India"
          className="grow"
        />
      </label>
      {/* Submit  */}
      <button className="btn btn-info w-full text-white">Submit</button>
    </form>
  );
};

export default EventForm;
