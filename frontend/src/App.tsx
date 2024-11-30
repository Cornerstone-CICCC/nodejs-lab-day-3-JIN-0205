// import { useState, useEffect } from "react";
// import { socket } from "./socket";
// import ConnectionState from "./components/ConnectionState";
// import ConnectionManager from "./components/ConnectionManager";
// import Event from "./components/Event";
// import Form from "./components/Form";

// const App = () => {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [fooEvents, setFooEvents]: any[] = useState([]);

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     function onFooEvent(value: any) {
//       setFooEvents((previous: any) => [...previous, value]);
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);
//     socket.on("foo", onFooEvent);

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//       socket.off("foo", onFooEvent);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <ConnectionState isConnected={isConnected} />
//       <ConnectionManager />
//       <Form />
//       <Event events={fooEvents} />
//       <ul></ul>
//     </div>
//   );
// };

// export default App;

import Chats from "./components/Chats";

const App = () => {
  return (
    <div>
      <Chats />
    </div>
  );
};

export default App;
