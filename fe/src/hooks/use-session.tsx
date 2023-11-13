/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import http from "../utils/http";
import { HttpStatusCode } from "axios";
import jsCookie from "js-cookie";

interface User {
  username?: string; // todo: can be implemented, not a priority
  token: string;
  login: {
    username: string;
    password: string;
  };
}
type UserContext = {
  setToken: (token: User["token"]) => string;
  getToken: () => string;
  login: ({ username, password }: User["login"]) => Promise<any>;
  logout: () => void;
};

export const SessionContext = createContext<UserContext>({
  setToken: (token: string) => "",
  getToken: () => "",
  login: async ({ username, password }) => null,
  logout: () => null,
});

export const SessionProvider = (props: React.HTMLProps<any>) => {
  const [token, updateToken] = useState<User["token"]>(
    jsCookie.get("token") ?? ""
  );

  const getToken = (): User["token"] => {
    return (
      token ?? jsCookie.get("token") ?? localStorage?.getItem("token") ?? ""
    );
  };
  const setToken = (token: User["token"]) => {
    localStorage.setItem("token", token ?? "");
    jsCookie.set("token", token ?? "", { expires: 7 });
    updateToken(token);

    return token;
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await http.post("/user/login", {
      username,
      password,
    });
    const { data, status } = response;
    if (data.token && status === HttpStatusCode.Ok) {
      setToken(data?.token);
      location.replace("/dashboard");
    }
    return { data, status };
  };

  const logout = () => {
    setToken("");
    location.replace("/");
  };

  useEffect(() => {
    updateToken(getToken());
  }, []);

  return (
    <SessionContext.Provider value={{ setToken, getToken, login, logout }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = (): UserContext => {
  return useContext(SessionContext);
};
