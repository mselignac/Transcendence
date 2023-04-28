import io, { Socket } from 'socket.io-client'

let url: string = 'ws://10.11.8.8:3000';

let $socket = io(url);


export default $socket
