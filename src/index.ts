import express from "express";
import { Server } from "http";
import { exampleDIModule } from "./modules/example";
import { addShutdownCleanup } from "./server";

let server: Server;

export const start = async () => {
  const app = express();
  const port = 3000;

  app.use(express.json());

  server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  await exampleDIModule.init(app);

  addShutdownCleanup(server, async () => {
    await exampleDIModule.shutdown();
  });

  return server;
};

export const stop = async () => {
  return new Promise<void>((resolve, reject) => {
    if (server) {
      return server.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });
};
