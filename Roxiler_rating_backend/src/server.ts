import app from "./app";
import { config } from "./config";
const PORT = process.env.PORT || 5000;

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
