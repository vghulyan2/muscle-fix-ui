import React from "react";

import { Box, Typography, useTheme } from "@mui/material";

import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesMutation,
} from "../app/api/apiQuery";

const Public = () => {
  const theme = useTheme();

  // CATEGORIES
  const { data, isError, isLoading, isSuccess } = useGetAllCategoriesQuery();
  const [subCategoryMutation] = useGetAllSubCategoriesMutation();

  // Fetch Sub-Categories for a given category
  const selectedCategoryHandler = async (_category) => {
    if (_category) {
      const { name, slug, _id } = _category;
      const subcategories = await subCategoryMutation(_category?._id);
      console.log("subcategories: ", subcategories);
    }
  };
  console.log("CATEGORIES: ", data);
  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
        Welcome To Muscle Fixer
      </Typography>
    </Box>
  );
};

export default Public;
