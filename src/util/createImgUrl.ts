const apiUrl = "https://tier-list-api.cyclic.app/";

export const createImgUrl = (imgPath: string) => {
  return apiUrl + imgPath.replace("images/", "");
};
