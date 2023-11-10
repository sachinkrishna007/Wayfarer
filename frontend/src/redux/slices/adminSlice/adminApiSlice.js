import { userApiSlice } from "../apiSlice";
const ADMIN_URL = "/api/admin";

export const adminSlice = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Adminlogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminAuth`,
        method: "POST",
        body: data,
      }),
    }),
    guideRequest: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/guideRequests`,
        method: "POST",
        body: data,
      }),
    }),
    guideAcceptRequest: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/guideAcceptRequests`,
        method: "POST",
        body: data,
      }),
    }),
  
    adminLogout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminLogout`,
        method: "POST",
        body: data,
      }),
    }),
  
  }),
});

export const { useAdminloginMutation,useGuideRequestMutation,useGuideAcceptRequestMutation,useAdminLogoutMutation} = adminSlice;
