import io, { Socket } from 'socket.io-client'

let url: string = 'ws://localhost:3000';

let $socket = io(url);


export default $socket
