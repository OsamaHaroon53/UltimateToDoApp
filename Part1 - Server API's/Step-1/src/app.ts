import Server from './server';

const port = process.env.PORT || 3000;

Server.listen(port, () => {
    console.log("server is running on port", port);
});