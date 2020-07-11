import DataContext from "./DataContext";
import { AsyncStorage } from "react-native";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "error":
      return { ...state, errorMessage: action.payload, isOk:true };
    case "login":
      return { errorMessage: "", isAuth: true };
      case "logout":
          return {errorMessage: "", isAuth: false}
    default:
      return state;
  }
};


const LogIn = ( dispatch ) => ({ email, password }) => {
            fetch('http://68.183.113.49:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
                .then(res => {
                    if(res.ok){
                        return res.json()
                    }else{
                        dispatch({type: 'error', payload: 'Login error'})
                    }
                })
                .then(async (res) => {
                    await AsyncStorage.setItem('auth_token', res.token.toString());
                    await AsyncStorage.setItem('id', res.id.toString());
                    dispatch({type: 'login', payload: res.toString()})
                })
                .catch(e => {
                    dispatch({type: 'error', payload: 'Login error'})
                })
    }

const SignUp = (dispatch) => ({
  name,
  age,
  gender,
  username,
  email,
  password,
}) => {
  fetch("http://68.183.113.49:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age, gender, username, email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        dispatch({ type: "error", payload: "Sign up error" });
      }
    })
    .then(async (res) => {
      await AsyncStorage.setItem("auth_token", res.toString());
      dispatch({ type: "sign up", payload: res.toString() });
    })
    .catch((e) => {
      dispatch({ type: "error", payload: "Sign up error" });
    });
};

const LogOut = (dispatch) => () => {
  dispatch({type: "logout"})
};


export const { Provider, Context } = DataContext(
  AuthReducer,
  { LogIn, LogOut },
  { SignUp },
  { isAuth: false, errorMessage: "" }
);

