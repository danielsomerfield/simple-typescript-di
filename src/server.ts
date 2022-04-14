import { Server } from "http";
import { Socket } from "net";

export const addShutdownCleanup = (
  server: Server,
  shutdown: () => Promise<void>,
) => {
  const connected = new Set<Socket>();

  server.on("connection", (socket: Socket) => {
    connected.add(socket);
    socket.addListener("close", () => {
      connected.delete(socket);
    });
  });

  const startSocketDisconnect = () => {
    setTimeout(() => {
      connected.forEach(socket => {
        socket.end();
      });
    }, 5000);
  };

  process.on("SIGTERM", async () => {
    startSocketDisconnect();
    await shutdown();
    server.close(err => {
      if (err) {
        console.log("Error on server shutdown", err);
      }
      process.exit(0);
    });
  });
};
