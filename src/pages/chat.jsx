import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import Terminal from "../components/Terminal/terminal";
import { useApp } from "../contexts/app-provider";

export default function Chat() {
  const { username, setUsername } = useApp();
  const [texts, setTexts] = useState([]);
  const [available, setAvailable] = useState([]);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.SERVER_URL);

    socket.current.emit('join', { username, room: 'master' })

    socket.current.on('chat', (payload) => {
      const { from, at, message } = payload;
      setTexts((oldTexts) => [...oldTexts, { from, at, message }]);
    });

    socket.current.on('available', (payload) => {
      setAvailable(payload || []);
    });

    return () => socket.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username]);

  const send = (text) => {
    if (!socket.current) return;

    socket.current.emit('chat', { message: text.trim() });
  }

  const onNewText = (text) => {
    switch(text) {
      case '/leave':
        setUsername('');
        return;
      case '/available':
        setTexts((oldTexts) => [...oldTexts, {
          message: '\nActive users:\n' + available.join('\n') + '\n\n'
        }]);
        return;
      default:
        send(text);
    }
  }

  return (
    <Terminal texts={texts} onNewInputText={onNewText} />
  );
}
