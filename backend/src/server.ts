const Hapi = require("@hapi/hapi");
import { searchRequests } from "./routes/Request";

const init = async () => {
  const server = new Hapi.Server({
    port: 3001,
    host: "localhost",
    routes: {
      cors: true
    }
  });

  server.route([searchRequests]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
