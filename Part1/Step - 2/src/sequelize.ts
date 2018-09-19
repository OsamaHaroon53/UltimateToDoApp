import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op as any,
  database: 'todo',
  username: 'root',
  password: 'root',
  modelPaths: [__dirname + '/models']
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;