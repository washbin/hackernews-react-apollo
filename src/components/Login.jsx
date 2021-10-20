import React, { useState } from "react";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: Sring!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push("/");
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push("/");
    },
  });

  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            type="text"
            placeholder="Your name"
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
          />
        )}

        <input
          type="text"
          placeholder="Your email address"
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Choose a safe password"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? "Login" : "Create Account"}
        </button>
        <button
          className="pointer button"
          onClick={() =>
            setFormState({ ...formState, login: !formState.login })
          }
        >
          {formState.login
            ? "need to create an account ?"
            : "already have an account ?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
