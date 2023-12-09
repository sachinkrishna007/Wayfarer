import { userApiSlice } from '../apiSlice'
const ADMIN_URL = '/api/admin'

export const adminSlice = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Adminlogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminAuth`,
        method: 'POST',
        body: data,
      }),
    }),
    guideRequest: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/guideRequests`,
        method: 'POST',
        body: data,
      }),
    }),
    guideAcceptRequest: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/guideAcceptRequests`,
        method: 'POST',
        body: data,
      }),
    }),
    BlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block-user`,
        method: 'POST',
        body: data,
      }),
    }),
    unBlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unblock-user`,
        method: 'POST',
        body: data,
      }),
    }),
    BlockGuide: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block-guide`,
        method: 'POST',
        body: data,
      }),
    }),
    unBlockGuide: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unblock-guide`,
        method: 'POST',
        body: data,
      }),
    }),
    listGuide: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/listGuide`,
        method: 'POST',
        body: data,
      }),
    }),
    getAdminBookingData: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/adminBookingData`,
        method: 'GET',
      }),
    }),
    getAdminDAshboard: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/adminDashboard`,
        method: 'GET',
      }),
    }),
    adminLogout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminLogout`,
        method: 'POST',
        body: data,
      }),
    }),
    CreateCategory: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/category`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useAdminloginMutation,
  useGuideRequestMutation,
  useGuideAcceptRequestMutation,
  useAdminLogoutMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useBlockGuideMutation,
  useUnBlockGuideMutation,
  useListGuideMutation,
  useGetAdminBookingDataMutation,
  useGetAdminDAshboardMutation,
  useCreateCategoryMutation
} = adminSlice
