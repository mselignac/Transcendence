import io, { Socket } from 'socket.io-client'

let url: string = 'ws://localhost:3001';

let $socket = io(url);


export default $socket