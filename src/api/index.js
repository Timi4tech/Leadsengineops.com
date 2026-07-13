import React from "react";
import axios from "axios";




const API_BASE = import.meta.env.VITE_BACKEND_URL;


export const api = axios.create({
  baseURL: API_BASE,
  headers: { 
    'Content-Type': 'application/json',
   },
  withCredentials: true, // important for session cookies
});


// config interceptor
   api.interceptors.request.use(async(config)=>{
//setting idempotency
    if (['post','put','patch', 'del'].includes(config.method?.toLowerCase())){
      config.headers['Idempotency-key'] = window.crypto.randomUUID()
    }
    return config;
   },
     (error)=>Promise.reject(error)
  )

// Auth
export const loginUser = (data) => api.post("/api/login", data);
export const logoutUser = () => api.post("/api/logout");
export const getCurrentUser = () => api.get("/api/users");
export const signupUser =  (payload)=>api.post("/api/signup",payload)
export const initializePayment = (payload)=>api.post("/api/payement/initialize",payload)

//Create Humanized Text
export const optimize = (data) => api.post("/api/token/optimize", data);
//fetch Ip
export const getIp = ()=>api.get("api/request/adrress")