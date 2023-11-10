import { userApiSlice } from "../apiSlice";
const GUIDE_URL = "/api/guide";

export const guideSlice = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    guideLogin: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/authGuide`,
        method: "POST",
        body: data,
      }),
    }),
    guideRegister: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/registerGuide`,
        method: "POST",
        body: data,
      }),
    }),
  
    guideLogout: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guideLogout`,
        method: "GET",
        body: data,
      }),
    }),
  
    guideAddLanguage: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guideAddLanguage`,
        method: "POST",
        body: data,
      }),
    }),
  
    guideAddPrice: builder.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/guideAddPrice`,
        method: "POST",
        body: data,
      }),
    }),
  
   
  }),
});

export const {
  useGuideRegisterMutation,useGuideLoginMutation,useGuideLogoutMutation,useGuideAddLanguageMutation,useGuideAddPriceMutation
} = guideSlice