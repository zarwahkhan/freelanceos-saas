// import "dotenv/config";
// import { defineConfig } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   migrations: {
//     path: "prisma/migrations",
//   },
//   datasource: {
//     // DATABASE_URL is read from your .env file
//     url: process.env.DATABASE_URL,
//   },
// });
import "dotenv/config";

export default {
  datasource: {
    url: process.env.DATABASE_URL,
  },
};