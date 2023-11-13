import { useState } from "react";
import { Input, Button } from "./Inputs";
import Popup from "./Popup";
import { Heading } from "./Typography";
import { object, string } from "yup";
import { useSession } from "../hooks/use-session";

const Login = () => {
  const formSchema = object({
    username: string()
      .min(3, "username should not be less than 3")
      .max(20, "username should not be more than 20")
      .required("username is required"),
    password: string()
      .min(3, "password should not be less than 3")
      .max(20, "password should not be more than 20")
      .required("password is required"),
  });
  const { login } = useSession();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = () => {
    setError("");
    formSchema
      .validate({ username, password })
      .then(() => {
        setLoading(true);
        login({ username, password }).then(({ data, status }) => {
          if (status !== 200) {
            setError(data.message);
          }
          setLoading(false);
        });
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 10_000);
      });
  };
  const handleEnter = ({ key }: { key: string }) => {
    if (key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      {/* todo: auto top/center for mobile using tw */}
      <Popup centered={true} autoCentered={false}>
        <>
          <Heading>Login</Heading>
          <Input
            placeholder="Id"
            onKeyDown={handleEnter}
            onChange={({ target: { value } }) => setUsername(value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onKeyDown={handleEnter}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          {error && <p className="text-red-500 text-xs pb-2">{error}</p>}
          <Button isLoading={loading} onClick={handleLogin}>
            Login
          </Button>
        </>
      </Popup>
    </>
  );
};

export default Login;
