import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// export const base_url = 'https://health-wa-git-main-emeka-s-projects-2df9bd2a.vercel.app'
// export const base_url = 'http://localhost:5000'
export const base_url = "https://1277457fe222.ngrok-free.app"
export const baseUrl = `${base_url}/api`
// export const baseUrl = 'https://health-wa-git-main-emeka-s-projects-2df9bd2a.vercel.app/api'

export const mediAppApi = createApi({
  reducerPath: 'mediAppApi',
  baseQuery: fetchBaseQuery({ baseUrl,
      prepareHeaders(headers) {
          if (!headers.get("Content-Type")) {
            headers.set("Content-Type", "application/json")
        }
        // headers.set("x-vercel-protection-bypass", "N4v38tw1rJLlXWA82X4JEFwfitPtOHcW")

        
        return headers
    }
  }),
  
  tagTypes: ['userlogin'],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: data => ({
                url: "user/login",
                method: "POST",
                body: data
            }),
            // transformResponse : (response,meta,arg) => response.data,
            // transformErrorResponse : response => response.status,
            invalidatesTags: ['userlogin']
        }),

        registerUser: builder.mutation({
            query: data => ({
                url: "/user/signup",
                method: "POST",
                body: data
            }),
            // transformResponse : (response,meta,arg) => response.data,
            // transformErrorResponse : response => response.status,
            invalidatesTags: ['userlogin']
        }),

        handlePassword: builder.mutation({
            query: data => ({
                url: "/user/password",
                // headers: { "Authorization": `Token ${data.token}`},
                method: "POST",
                body: data
            }),
        }),
        
        // forgotPassword: builder.mutation({
        //     query: data => ({
        //         url: "/user/forgotpassword",
        //         method: "POST",
        //         body: data
        //     }),
        // }),

        logout: builder.mutation({
            query: token => ({
                url: `/user/logout`,
                // headers: { "Authorization": `Token ${token}` },
                method: "POST",
                body: {usertoken:token}
            }),
        }),

    
        OTP: builder.mutation({
            query: data => ({
                url: `/user/otp`,
                // headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data,
            }),
        }),

        patient: builder.mutation({
            query: data => ({
                url: `/patient/patient`,
                // headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data,
            }),
        }),

        
        practitioner: builder.mutation({
            query: data => ({
                url: `/practitioner/practitioner`,
                // headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data,
            }),
        }),

        appointments: builder.mutation({
            query: data => ({
                url: `/event`,
                headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data.data,
            }),
        }),

        // patientGet: builder.query({
        // query: data =>({
        // url: `/patient?action=${data.action}`,
        // headers: {"Authorization": `Token ${data.token}`}
        //     }),
        // }), 

        
        // editUser: builder.mutation({
        //     query: data => ({
        //         url: `/edituser`,
        //         headers: {
        //             "Content-Type": "multipart/form-data; boundary=---->",
        //             "Authorization": `Token ${data.token}`,},
        //         method: "POST",
        //         body: data.data,
        //         formData:true 
        //     }),
        // }),
  }),
})

export const {
    useLoginMutation, useRegisterUserMutation,
    useLogoutMutation, useOTPMutation,
    useAppointmentsMutation,
    usePatientMutation, 
    usePractitionerMutation,
    useHandlePasswordMutation,
} = mediAppApi
