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
    if (setLoading) setLoading(true);

    const params = fetchAll
      ? { pageSize: 10000, pageNumber: 1, name } // No pagination parameters if fetching all categories
      : { pageSize, pageNumber, name };

    const response = await privateAxiosInstance.get(
      CATEGORIES_URLS.CATEGORIES,
      { params ,
        headers: { Authorization: localStorage.getItem("token") },
      }
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
    if (setLoading) setLoading(false); // Ensure `setLoading` is checked before calling
  }
}
