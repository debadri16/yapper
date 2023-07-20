import Home from "./Components/Home/Home";
import config from "./environment/config.json";
import io from 'socket.io-client';

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";

const SocketContext = React.createContext();

function App() {

  // connecting the socket with auth
  const socket = io(config.serverUrl, {
    transports: ['websocket', 'polling'],
    auth: {
      token: "j6k^j,.4m5"
    }
  });

  useEffect(() => {
    // check if any connection error occurred
    socket.on("connect_error", (err) => {
      console.log(err instanceof Error); // true
      console.log(err.message); // Unauthorized
    });

  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export { App, SocketContext };
