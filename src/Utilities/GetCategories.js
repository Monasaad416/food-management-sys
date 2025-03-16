import { CATEGORIES_URLS } from "../services/api/apiConfig";
import { privateAxiosInstance } from "../services/api/apiInstance";

export default async function getCategories({
  setLoading,
  setCategories,
  setNumOfPagesArray,
  pageSize,
  pageNumber,
  name,
  fetchAll = false,
}) {
  try {
    setLoading(true);

    // Dynamically decide whether to include pagination
    const params = fetchAll
      ? { pageSize: 10000 ,pageNumber:1,name} // No pagination parameters if fetching all categories ,10000 any hight number to ensure get all cats
      : { pageSize, pageNumber ,name};

    const response = await privateAxiosInstance.get(
      CATEGORIES_URLS.CATEGORIES,
      { params }
    );

    setCategories(response?.data?.data);
    if (!fetchAll) {
      setNumOfPagesArray(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, index) => index + 1)
      );
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
