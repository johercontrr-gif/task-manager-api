import app from "./app";

// Temporary port: it will come from the Config singleton in step 3.
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
