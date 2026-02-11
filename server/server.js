const express = require("express");
const cors = require("cors");
const routes = require("./src/Routes/userRoutes.js");

//Add express to app variable to use it in code (i.e - app.use, app.get, app.post, etc.), and define port for backend server.
const app = express();
const port = 3000;

//Middlewares
app.use(cors());
app.use(
    cors({
        origin: "http://localhost:5173", //This only allows the given URL to call APIs on back-end server.
        credentials: true,
    })
);
app.use(express.json());

//User API Route
app.use("/api", routes);

//Starting the back-end server
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});