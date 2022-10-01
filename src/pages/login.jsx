import { useNavigate } from "react-router-dom";
import Terminal from "../components/Terminal/terminal";
import { useApp } from "../contexts/app-provider";

export default function Login() {
  const { setUsername } = useApp();
  const navigate = useNavigate();

  const onNext = (username) => {
    setUsername(username);
    navigate('/chat');
  };

  return (
    <Terminal texts={[{message: 'You are?'}]} onNewInputText={onNext} />
  );
}
