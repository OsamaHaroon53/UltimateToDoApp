import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import todo1 from './routes/todo';




class Server {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }


  public config(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect('mongodb://user:osama53@ds157762.mlab.com:57762/todo_data', { useNewUrlParser: true })
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'CONNECTION ERROR :'));
    db.once('open', () => {
      console.log('CONNECTION OPENED!!');
      return db;
    });
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(logger('dev'));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin','*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });

  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();
    this.app.use('/', router.get('/', (req, res) => {
      res.status(200).send("Welcome to Express");
    }));
    this.app.use('/todo/api/v1.0', todo1);
  }
}


export default new Server().app;