const apiUrl = "http://localhost:3000/";

export const createImgUrl = (imgPath: string) => {
  return apiUrl + imgPath.replace("images/", "");
};
