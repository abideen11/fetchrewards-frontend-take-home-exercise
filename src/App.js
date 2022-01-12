import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import fetchrewardslogo from "./fetchrewardslogoformat.png";

const App = () => {
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupationsData] = useState(["Please select an occupation"]);
  const [statesData] = useState(["Please select a state"]);
  const [selectOccupation, setSelectOccupation] = useState(
    "Please select an occupation"
  );
  const [selectState, setSelectState] = useState("Please select a state");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("https://frontend-take-home.fetchrewards.com/form")
      .then((resp) => {
        setData(resp.data);
        addData(resp.data);
      });
  }, [data]);

  const addData = (input) => {
    if (occupationsData.length === 1 && statesData.length === 1) {
      input.occupations.map((occupation) => occupationsData.push(occupation));
      input.states.map((state) => statesData.push(state.name));
    }
  };

  const postFormInputs = () => {
    axios
      .post("https://frontend-take-home.fetchrewards.com/form", {
        name: fullName,
        email: email,
        password: password,
        occupation: selectOccupation,
        state: selectState,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const formToSubmit = () => {
    setIsFormSubmitted(!isFormSubmitted);
  };

  const submitForm = (e) => {
    e.preventDefault();

    let fullNameArray = fullName.split("");

    let emailArray = email.split("");
    let emailAt = emailArray.findIndex((element) => element === "@");
    let emailDot = emailArray.findIndex((element) => element === ".");

    if (
      fullName === "" ||
      fullNameArray[0] === " " ||
      fullNameArray[fullNameArray.length - 1] === " " ||
      fullName.length < 2 ||
      fullName.includes(" ") === false ||
      email === "" ||
      emailDot - emailAt < 2 ||
      password.length < 1 ||
      password.includes(" ") === true ||
      selectOccupation === "Please select an occupation" ||
      selectState === "Please select a state"
    ) {
      if (
        fullName === "" ||
        fullNameArray[0] === " " ||
        fullNameArray[fullNameArray.length - 1] === " " ||
        fullName.length < 2 ||
        fullName.includes(" ") === false
      ) {
        alert("Please enter your full name. E.g. 'X X'.");
      }
      if (email === "" || emailDot - emailAt < 2) {
        if (email === "") {
          alert("Please enter your email address. E.g. 'X@X.X'.");
        } else {
          alert("Please enter a valid email address. E.g. 'X@X.X'.");
        }
      }
      if (password.length < 1 || password.includes(" ") === true) {
        if (password.length < 1) {
          alert("Please enter your password. At least 1 char and NO spaces.");
        } else if (password.length > 0 && password.includes(" ") === true) {
          alert(
            "Please enter a valid password. At least 1 char and NO spaces."
          );
        }
      }
      if (selectOccupation === "Please select an occupation") {
        alert("Please select an occupation.");
      }
      if (selectState === "Please select a state") {
        alert("Please select a state.");
      }
    } else {
      setFullName("");
      setEmail("");
      setPassword("");
      setSelectOccupation("Please select an occupation");
      setSelectState("Please select a state");
      postFormInputs();
      formToSubmit();
    }
  };

  return (
    <>
      {isFormSubmitted ? (
        <div className="app-div">
          <div className="app-dv">
            <div className="app-2dv">
              <img src={fetchrewardslogo} alt="fetchrewards icon" />
            </div>
            <div className="app-2dv2">
              <h1>Thank You</h1>
              <p>Your form has been submitted.</p>
              <div className="app-3dv">
                <button onClick={formToSubmit}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="app-div">
          <div className="app-dv">
            <div className="app-2dv">
              <img src={fetchrewardslogo} alt="fetchrewards icon" />
            </div>
            <div className="app-2dv2">
              <h1>Sign Up</h1>
              <div>
                <form className="app-frm" onSubmit={submitForm}>
                  <label>
                    Full Name:
                    <br />
                    <input
                      type="text"
                      name="full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </label>
                  <br />
                  <br />
                  <label>
                    Email:
                    <br />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <br />
                  <br />
                  <label>
                    Password:
                    <br />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <br />
                  <br />
                  <label>
                    Occupation:
                    <br />
                    <select
                      value={selectOccupation}
                      onChange={(e) => setSelectOccupation(e.target.value)}
                    >
                      {occupationsData.map((occupation) => (
                        <option value={occupation}>{occupation}</option>
                      ))}
                    </select>
                  </label>
                  <br />
                  <br />
                  <label>
                    State:
                    <br />
                    <select
                      value={selectState}
                      onChange={(e) => setSelectState(e.target.value)}
                    >
                      {statesData.map((state) => (
                        <option value={state}>{state}</option>
                      ))}
                    </select>
                  </label>
                  <br />
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
