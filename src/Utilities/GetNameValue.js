export default async function getNameValue (e,setName,getAllItems,tagId,categoryId) {
  setName(e.target.value);
  getAllItems(5, 1, e.target.value, tagId, categoryId);
};
