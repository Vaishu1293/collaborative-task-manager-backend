// This file is used by Prisma CLI (not by TypeScript build)
// It MUST be CommonJS

require("dotenv/config");
const { defineConfig, env } = require("prisma/config");

module.exports = defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  engine: "classic",

  datasource: {
    url: env("DATABASE_URL"),
  },
});
