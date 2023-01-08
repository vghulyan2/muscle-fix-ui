import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiQueryAdapter = createEntityAdapter({});
const initialState = apiQueryAdapter.getInitialState();

export const globalApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "splitApi",
  tagTypes: ["Categories", "SubCategories"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `public/categories`,
      providesTags: ["Categories"],
    }),
    getAllSubCategories: builder.mutation({
      query: (id) => {
        return {
          url: `public/subCategories/${id}`,
          method: "GET",
        };
      },
      transformResponse: (responseData) => {
        const { subcategories } = responseData;
        return subcategories;
      },
      providesTags: ["SubCategory"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetAllSubCategoriesMutation } =
  globalApi;

// returns the query result object
export const selectCategoriesResult =
  globalApi.endpoints.getAllCategories.select();
export const selectSubCategoriesResult =
  globalApi.endpoints.getAllSubCategories.select();

// creates memoized selector
const selectApiQueriesData = createSelector(
  selectCategoriesResult,
  selectSubCategoriesResult,
  (apiQueryResult) => apiQueryResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAllCategory: selectAllCategories,
  selectSubCategoryById: selectSubCategoriesById,
  // Pass in a selector that returns the users slice of state
} = apiQueryAdapter.getSelectors(
  (state) => selectApiQueriesData(state) ?? initialState
);
