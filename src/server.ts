import { app } from "./app";

app.listen(process.env.APP_PORT || 4000);

console.log(`Server is on in port ${process.env.APP_PORT}`);