import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Remova .jsx da importação
import './index.css';
import { UserProvider } from "./context/ContextLogin";
import { MessageProvider } from "./context/ContextMessage";
import { DeleteMessageProvider } from "./context/ContextDeleteMessage";

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <MessageProvider>
      <DeleteMessageProvider>
          <App />
      </DeleteMessageProvider>
    </MessageProvider>
  </UserProvider>
);
