"use client";

import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
});

export const axiosSSO = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SSO_BASE_URL}/backend/api`,
});
