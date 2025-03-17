import { TAGS_URLS } from "../services/api/apiConfig";
import { privateAxiosInstance } from "../services/api/apiInstance";


export default async function getAllTags (setTags) {
    try {

      const response = await privateAxiosInstance.get(
        TAGS_URLS.TAGS
      );
      setTags(response?.data);
    } catch (err) {
      console.log(err);
    } 
  };