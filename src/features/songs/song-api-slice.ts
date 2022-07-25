

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "https://itunes.apple.com/";

interface Itunes {
    results:{}
    artistName: string;
    trackName: string;
    collectionName:string;
    trackId:number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers) {
     
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchItunes: builder.query({
        query({numSong,name,song,albums}) {
          console.log(numSong)  
          const params = `search?term=${name}&artistName=${name}&trackName=${song}&albums=${albums}&limit=${numSong}`
          console.log(params)
          return params;
        },
       
        transformResponse: (response:any) => response.results,
      }),
    };
  },
});

export const { useFetchItunesQuery } = apiSlice;