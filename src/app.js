import express from 'express';
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import { engine } from 'express-handlebars';
import {join,__dirname} from "./utils/index.js"
import viewRoutes from "./routes/view.routes.js"
import { Server } from "socket.io";
import { dbConnection } from './config/db.js';

const app = express();
app.set("PORT", 4000);

dbConnection()

const server = app.listen(app.get("PORT"), () => {
  console.log(`Escuchando servidor en puerto http://localhost:${app.get("PORT")}`);
});

const io = new Server(server);
app.engine("handlebars", engine());
app.engine('handlebars', engine({
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set("view engine", "handlebars");
app.set("views", join(__dirname,'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../public")));


app.use("/", viewRoutes);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

io.on('connection', (socket) => {
  console.log('nueva conexion')
})