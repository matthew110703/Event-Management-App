import { useEffect, useState } from "react";
import { closeIcon } from "../../assets";
import moment from "moment";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../store/alertSlice";
import {
  useCreateEventMutation,
  useGetMetaDataQuery,
  useUpdateEventMutation,
} from "../../store/eventsApiSlice";

const EventForm = ({ onClose, edit = false }) => {
  // Form State
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "public",
    category: "",
    date: "",
    location: "",
    id: "",
  });

  // Redux
  const dispatch = useDispatch();
  const api = useSelector((state) => state.eventsApi.queries);
  const { data: metaData, error, isLoading } = useGetMetaDataQuery();
  const [createEvent, { isLoading: submitting }] = useCreateEventMutation();
  const [updateEvent, { isLoading: updating }] = useUpdateEventMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form Prefill
  useEffect(() => {
    Object.keys(api).forEach((key) => {
      if (key.startsWith("getEvent(")) {
        let event = api[key].data;
        if (event) {
          setForm({
            id: event._id,
            name: event.name,
            description: event.description,
            type: event.type,
            category: event.category,
            date: event.date,
            location: event.location,
          });
        }
      }
    });
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (edit) {
        const { success } = await updateEvent({
          id: form.id,
          body: form,
        }).unwrap();
        if (success) {
          onClose();
          dispatch(
            showAlert({
              message: "Event updated successfully",
              type: "success",
            }),
          );
        }
        return;
      } else {
        const { success } = await createEvent(form).unwrap();
        if (success) {
          onClose();
          dispatch(
            showAlert({
              message: "Event created successfully",
              type: "success",
            }),
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto space-y-4 rounded-lg bg-white p-4 shadow-md md:p-8 lg:w-2/4"
    >
      <input type="hidden" name="id" value={form.id || ""} />
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {edit ? "Edit Event" : "Create Event"}
        </h2>
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
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>
      {/* Description  */}
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="About the event ..."
        rows={4}
        name="description"
        value={form.description}
        onChange={handleChange}
        required
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
                value={"public"}
                onChange={handleChange}
                required
              />
              Public
            </label>
            <label htmlFor="private" className="label gap-2">
              <input
                type="radio"
                name="type"
                id="private"
                className="radio-info radio"
                value={"private"}
                onChange={handleChange}
                required
              />
              Private
            </label>
          </div>
        </label>

        <label htmlFor="category" className="w-full">
          <select
            className="select select-bordered w-full"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select Category
            </option>
            {metaData &&
              metaData?.event?.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </label>
      </section>
      {/* Date & Time  */}
      <section className="flex w-full items-center gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="datetime-local"
            name="date"
            value={moment(form.date).format("YYYY-MM-DDTHH:mm")}
            onChange={handleChange}
            required
          />
        </label>

        <time className="font-semibold text-gray-500" dateTime={form.date}>
          {form.date
            ? moment(form.date).format("ddd Do MMMM YYYY, h:mm A")
            : "Select Date and Time"}
        </time>
      </section>
      {/* Location  */}
      <label className="input input-bordered flex items-center gap-2">
        Location
        <input
          type="text"
          placeholder="Eg. Online | Bangalore, India"
          className="grow"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
      </label>
      {/* Submit  */}
      <button
        type="submit"
        className="btn btn-info w-full text-white"
        disabled={submitting}
      >
        {submitting || updating ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default EventForm;
