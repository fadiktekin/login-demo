import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});

app.get("/", (request, response) => {
  console.log("Home page");

  const docPath = path.join(__dirname, "./index.html");
  response.sendFile(docPath);
});

app.get("/echo/:message", (request, response) => {
  const message = request.params.message;
  response.send(message === "secret" ? "the secret is... 42!" : message);
});

app.get("/login", (request, response) => {
  const docPath = path.join(__dirname, "./login.html");
  response.sendFile(docPath);
});

app.post("/login", (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.json({ success: false });
  } else if (email === "user@email.com" && password === "very-secret") {
    response.json({ success: true });
  } else {
    response.json({ success: false });
  }
});

app.get("/my-account", (request, response) => {
  const docPath = path.join(__dirname, "./my-account.html");
  response.sendFile(docPath);
});

app.get("/error", (request, response) => {
  const docPath = path.join(__dirname, "./error.html");
  response.sendFile(docPath);
});
