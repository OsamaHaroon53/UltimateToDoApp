import app from './app';
import sequelize from './sequelize';

const server = app.listen(app.get("port"), () => {
    sequelize.sync({ force: false });
    console.log("server is running on port", app.get("port"));
});

module.exports = server;