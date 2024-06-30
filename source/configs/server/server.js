import { config } from "dotenv";
import autoBind from "auto-bind";
config();

export const Server = (() => {
    class Server {
        #port;

        constructor() {
            autoBind(this);
            this.#port = process.env.SERVER_PORT || 3000;
        }


        run(app) {
            app.listen(this.#port, () => {
                console.log(`server is running on http://localhost:${this.#port}`);
            });
        }
    }

    return new Server();
})();

