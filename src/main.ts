import { Cyan } from "@coralblack/cyan/dist/core";
import { AppServer } from "./Server";

const app = new Cyan({
    name: "galaxyhub-bc",
    port: 9090,
    server: AppServer,
    routes: [],
    tasks: [],
    options: {
        cors: true,
        bodyParser: true,
        accessLog: true,
    },
});

app.start();
