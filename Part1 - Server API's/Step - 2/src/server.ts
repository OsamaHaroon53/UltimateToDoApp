import App from './app';

const server = App.listen(App.get("port"), () => {
    console.log("server is running on port", App.get("port"));
});

export default server;