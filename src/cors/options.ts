import { CorsOptions } from "cors";

const allowedUrls = [
  "http://localhost:5173",
  "https://tier-list-rho.vercel.app",
  "https://tier-list-creator-bruno-queiroz.vercel.app",
];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    callback(null, true);

    if (allowedUrls.indexOf(origin || "") !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
};
