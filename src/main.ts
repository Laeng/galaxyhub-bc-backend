import { Cyan } from "@coralblack/cyan/dist/core";
import { AppServer } from "./Server";
import { config } from "dotenv";
import {ContentController} from "./controller/ContentController";

config({
    path: '.env'
});

const app = new Cyan({
    name: "galaxyhub-bc",
    port: parseInt(process.env.PORT || "3000", 10),
    server: AppServer,
    routes: [ContentController],
    tasks: [],
    options: {
        cors: true,
        bodyParser: true,
        accessLog: true,
    },
});

app.start();
