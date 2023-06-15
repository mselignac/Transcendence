import io, { Socket } from 'socket.io-client'

let url: string = 'ws://25.7.177.95:3000';

let $socket = io(url);


export default $socket
