import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/api",
  }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ name, date, type, category, from, to, userId }) => ({
        url: "/events",
        params: {
          name,
          date,
          type,
          category,
          from,
          to,
          userId,
        },
      }),
      providesTags: ["Events"],
    }),

    getUpcomingEvents: builder.query({
      query: (id) => ({
        url: "/events/upcoming",
        params: { userId: id },
      }),
      providesTags: ["Events"],
    }),
    getMetaData: builder.query({
      query: () => "/meta-data",
    }),
    getUserEvents: builder.query({
      query: () => ({
        url: "/events/user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["User"],
    }),
    getEventsJoined: builder.query({
      query: () => ({
        url: "/events/joined",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Events"],
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "/events",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),

      invalidatesTags: ["Events", "User"],
    }),
    getEvent: builder.query({
      query: (id) => ({
        url: `/events/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, body }) => ({
        url: `/events/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["Events", "User"],
    }),
    joinEvent: builder.mutation({
      query: (id) => ({
        url: `/user/join`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: id }),
      }),
      invalidatesTags: ["Events", "User"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetUpcomingEventsQuery,
  useGetMetaDataQuery,
  useGetUserEventsQuery,
  useGetEventsJoinedQuery,
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useJoinEventMutation,
} = eventsApi;
