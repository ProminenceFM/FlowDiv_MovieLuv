import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig } from "./apiConfig";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
	baseUrl: apiConfig.baseUrl,
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const retryResult = await baseQuery(args, api, extraOptions);
    
    if (retryResult.error && retryResult.error.status === 401) {
      toast.error("Connection cannot be established at the moment. Kindly contact your Admin");
      return retryResult;
    }
    return retryResult;
  }

  return result;
};

export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getMoviesByType: build.query({
      query: (type: string) => ({
        url: `movie/${type}`,
        method: "GET",
        params: {
          api_key: apiConfig.apiKey
        },
      }),
      keepUnusedDataFor: 300,
    }),
    getMovieByTypeAndPage: build.query({
      query: ({type, pageNumber})=>({
        url:`movie/${type}`,
        method: "GET",
        params: {
          page: pageNumber,
          api_key: apiConfig.apiKey
        },
      }),
      
    }),
    getMovieDetailsById: build.query({
      query: (movieId: string) => ({
        url: `movie/${movieId}`,
        method: "GET",
        params: {
          api_key: apiConfig.apiKey,
          append_to_response: "credits"
        },
      }),
      keepUnusedDataFor: 300,
    }),
    searchMovie: build.query({
      query: ({searchParam, page})=>({
        url:`search/movie`,
        method: "GET",
        params: {
          query: searchParam,
          api_key: apiConfig.apiKey,
          page: page,
        },
      }),
    })
  }),
});

export const { 
  useGetMoviesByTypeQuery,
  useGetMovieDetailsByIdQuery,
  useSearchMovieQuery,
  useGetMovieByTypeAndPageQuery,
 } = movieApiSlice;
