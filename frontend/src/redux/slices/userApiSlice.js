import { userApiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userSlice = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    googleRegister: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/googleRegister`,
        method: "POST",
        body: data,
      }),
    }),
    getGuideData: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/getGuide`,
        method: "GET",
      }),
    }),
    getSingleGuide: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/getSingleGuide?id=${params.guideId}`,
        method: "GET",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGoogleRegisterMutation,
  useGetGuideDataMutation,
  useGetSingleGuideMutation
  
} = userSlice;