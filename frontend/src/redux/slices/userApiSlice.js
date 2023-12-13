import { userApiSlice } from './apiSlice'

const USERS_URL = '/api/users'

export const userSlice = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    googleRegister: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/googleRegister`,
        method: 'POST',
        body: data,
      }),
    }),
    getBooking: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createBooking`,
        method: 'POST',
        body: data,
      }),
    }),
    stripeBooking: builder.mutation({
      query: (data) => ({
        url: `/api/stripe/create-checkout-session`,
        method: 'POST',
        body: data,
      }),
    }),
    confirmBooking: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/changeStaus`,
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verifyOtp`,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/changePassword`,
        method: 'POST',
        body: data,
      }),
    }),
    AddRating: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addRating`,
        method: 'POST',
        body: data,
      }),
    }),

    getGuideData: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getGuide`,
        method: 'POST',
        body: data,
      }),
    }),
    SearchGuide: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getGuide`,
        method: 'POST',
        body: data,
      }),
    }),
    getRatings: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getRatings`,
        method: 'POST',
        body: data,
      }),
    }),
    getSingleGuide: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/getSingleGuide?id=${params.guideId}`,
        method: 'GET',
      }),
    }),
    getUserBooking: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/getBooking?id=${params.bookingId}`,
        method: 'GET',
      }),
    }),
    getUserData: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/getUserData`,
        method: 'GET',
      }),
    }),
    getGuideBookingDates: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getGuidesBookingDates`,
        method: 'POST',
        body: data,
      }),
    }),
    getBookingData: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/getBookingData?id=${params.email}&status=${params.status}`,
        method: 'GET',
      }),
    }),

    createChatRoom: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createRoom`,
        method: 'POST',
        body: data,
      }),
    }),
    SendChat: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sendchat`,
        method: 'POST',
        body: data,
      }),
    }),
    getMessages: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getmessages  `,
        method: 'POST',
        body: data,
      }),
    }),
    checkAvilablityGuide: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/checkAvailablity  `,
        method: 'POST',
        body: data,
      }),
    }),
    getBookedDates: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getBookedDates  `,
        method: 'POST',
        body: data,
      }),
    }),
    getFilteredGuides: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/filterGuides  `,
        method: 'POST',
        body: data,
      }),
    }),
    addFollowGuide: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/follow  `,
        method: 'POST',
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateProfile  `,
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.mutation({
      query: (query) => ({
        url: `${USERS_URL}/getProfile?email=${query.email}&userId=${query.userId}`,

        method: 'GET',
      }),
    }),
    getFollowing: builder.mutation({
      query: (query) => ({
        url: `${USERS_URL}/getFollowing?userId=${query.userId}`,

        method: 'GET',
      }),
    }),
    CancelBooking: builder.mutation({
      query: (query) => ({
        url: `${USERS_URL}/CancelBooking?BookingId=${query.bookingId}&userId=${query.userId}`,

        method: 'GET',
      }),
    }),
    getBlogs: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/getBlog`,
        method: 'GET',
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGoogleRegisterMutation,
  useGetGuideDataMutation,
  useGetSingleGuideMutation,
  useGetBookingMutation,
  useGetBookingDataMutation,
  useStripeBookingMutation,
  useConfirmBookingMutation,
  useGetUserDataMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation,
  useGetUserBookingMutation,
  useCreateChatRoomMutation,
  useSendChatMutation,
  useGetMessagesMutation,
  useAddRatingMutation,
  useGetRatingsMutation,
  useCheckAvilablityGuideMutation,
  useGetBookedDatesMutation,
  useGetFilteredGuidesMutation,
  useGetGuideBookingDatesMutation,
 useAddFollowGuideMutation,
 useUpdateProfileMutation,
 useGetProfileMutation,
 useGetBlogsMutation,
 useGetFollowingMutation,
 useCancelBookingMutation
} = userSlice
