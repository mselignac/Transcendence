// import { reactive } from "vue";
// import { io } from "socket.io-client";

// export const state = reactive({
//   connected: false,
//   fooEvents: [],
//   barEvents: []
// });

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

// export const socket = io(URL);

// socket.on("connect", () => {
//   console.log('connect socket'),
//   state.connected = true;
// });

// socket.on("disconnect", () => {
//   console.log('disconnect socket'),
//   state.connected = false;
// });


// socket.on('msgToClient', (message) => {
//   console.log('lalalala')
//   console.log(message),
//     receivedMessage(message)
// })

// socket.on("foo", (...args) => {
//   state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });








// import io, { Socket } from 'socket.io-client'

// let url = 'ws://localhost:3000/chat';

// let $socket_chat = io(url);

// $socket_chat.on('connect', () => {
//     console.log("test");
// })
//       $socket_chat.on('msgToClient', (message) => {
//         console.log('lalalala')
//         console.log(message)
//       })

// // $socket_chat.on("connect", () => {
// //   console.log('connect socket')
// // //   state.connected = true;
// // });

// export default $socket_chat
