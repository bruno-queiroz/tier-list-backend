const apiUrl = "https://tier-list-api.onrender.com/";

export const createImgUrl = (imgPath: string) => {
  return apiUrl + imgPath.replace("images/", "");
};
