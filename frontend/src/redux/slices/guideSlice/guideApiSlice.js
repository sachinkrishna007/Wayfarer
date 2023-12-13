import { userApiSlice } from '../apiSlice'
const GUIDE_URL = '/api/guide'

export const guideSlice = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    guideLogin: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/authGuide`,
        method: 'POST',
        body: data,
      }),
    }),
    guideRegister: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/registerGuide`,
        method: 'POST',
        body: data,
      }),
    }),

    guideLogout: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guideLogout`,
        method: 'GET',
        body: data,
      }),
    }),

    guideAddLanguage: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guideAddLanguage`,
        method: 'POST',
        body: data,
      }),
    }),

    guideAddPrice: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guideAddPrice`,
        method: 'POST',
        body: data,
      }),
    }),
    guideAddDesc: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guideAddDesc`,
        method: 'POST',
        body: data,
      }),
    }),
    guideGetData: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/getGuideData`,
        method: 'POST',
        body: data,
      }),
    }),
    guideChangePassword: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/Changepassword`,
        method: 'POST',
        body: data,
      }),
    }),
    GuideSendChat: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guidesendchat`,
        method: 'POST',
        body: data,
      }),
    }),
    GuideAddCatagory: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/AddCategory`,
        method: 'POST',
        body: data,
      }),
    }),
    GuidegetMessages: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guidegetmessages`,
        method: 'POST',
        body: data,
      }),
    }),
    GuideDeleteLang: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/deleteLanguage`,
        method: 'POST',
        body: data,
      }),
    }),
    GuideActivate: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/Activate`,
        method: 'POST',
        body: data,
      }),
    }),
    GuidegetBookings: builder.mutation({
      query: (params) => ({
        url: `${GUIDE_URL}/getGuideBookings?id=${params.guideId}`,
        method: 'GET',
      }),
    }),
    getCategory: builder.mutation({
      query: () => ({
        url: `${GUIDE_URL}/getCategory`,
        method: 'GET',
      }),
    }),

    deleteBlog: builder.mutation({
      query: (query) => ({
        url: `${GUIDE_URL}/deleteBlog?blogId=${query.blogId}`,
        method: 'Delete',
      }),
    }),
    guideGetBlogs: builder.mutation({
      query: (query) => ({
        url: `${GUIDE_URL}/guideGetBlogs?guide=${query.guide}`,
        method: 'GET',
      }),
    }),
    createBlogs: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/createBlog`,
        method: 'POST',
        body: data,
      }),
    }),
    GuidegetRooms: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/getguiderooms`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGuideRegisterMutation,
  useGuideLoginMutation,
  useGuideLogoutMutation,
  useGuideAddLanguageMutation,
  useGuideAddPriceMutation,
  useGuideGetDataMutation,
  useGuideAddDescMutation,
  useGuideChangePasswordMutation,
  useGuideSendChatMutation,
  useGuidegetMessagesMutation,
  useGuidegetRoomsMutation,
  useGuidegetBookingsMutation,
  useGuideDeleteLangMutation,
  useGuideActivateMutation,
  useGetCategoryMutation,
  useGuideAddCatagoryMutation,
  useCreateBlogsMutation,
  useGuideGetBlogsMutation,
  useDeleteBlogMutation
} = guideSlice
