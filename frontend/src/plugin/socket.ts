import io from 'socket.io-client'

const { VITE_APP_BACKEND_PORT: port, VITE_APP_HOST: host } = await import.meta.env;

const URL = `http://${host}:${port}`;

let $socket = io(URL);

export default $socket
