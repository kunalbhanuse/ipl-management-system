import "dotenv/config";
import app from "./src/app.js";
import connectDb from "./src/common/config/db.config.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo Db failed to connect ", error);
  });
