import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "../../utils/ajax-helper";
import { useNavigate } from "react-router-dom";
import "./address.css";
import { getJWT } from "../../utils/jwt";
import { parseJwt } from "../../utils/jwt";
import countryList from "react-select-country-list";
import AddressForm from "./AddressForm";
import { useLocation } from "react-router-dom";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { nullMessage } from "../../utils/nullErrorMessage";

const CreateAddress = () => {
  let [street, setStreet] = useState(null);
  let [city, setCity] = useState(null);
  let [pin_code, setPin_code] = useState(null);
  let [state, setState] = useState(null);
  let [country, setCountry] = useState(null);
  let [title, setTitle] = useState("Add An address");
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  const [message, setMessage] = useState(null);
  const [newAddressUrl, setNewAddressUrl] = useState("/user/address/new");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const options = useMemo(() => countryList().getData(), []);
  let changeHandler;
  changeHandler = (value) => {
    setCountry(value);
  };
  let submitHandler;
  let id = location.pathname.slice(14);
  if (location.pathname == newAddressUrl) {
    submitHandler = async (e) => {
      e.preventDefault();
      if (name == null) {
        setErrorMessage("Please enter name");
        nullMessage(setErrorMessage);

        return;
      }
      if (email == null) {
        setErrorMessage("Please enter email");
        nullMessage(setErrorMessage);

        return;
      }
      if (phone == null) {
        setErrorMessage("Please enter phone");
        nullMessage(setErrorMessage);

        return;
      }
      if (street == null) {
        setErrorMessage("Please enter street");
        nullMessage(setErrorMessage);

        return;
      }
      if (city == null) {
        setErrorMessage("Please enter city");
        nullMessage(setErrorMessage);

        return;
      }
      if (pin_code == null) {
        setErrorMessage("Please enter picode_");
        nullMessage(setErrorMessage);

        return;
      }
      if (state == null) {
        setErrorMessage("Please enter state");
        nullMessage(setErrorMessage);

        return;
      }

      axios
        .post("/user/new/address/", {
          name: name,
          email: email,
          phone: phone,
          street: street,
          city: city,
          pin_code: pin_code,
          state: state,
          country: country.label,
          user_id: user_id,
        })
        .then((res) => {
          navigate("/user/address");
        })
        .catch((err) => {
          setMessage(
            "Oppsie! Something went wrong. Please try entering valid datas"
          );
          navigate(newAddressUrl);
        });
    };
  }
  if (!(location.pathname == newAddressUrl)) {
    submitHandler = async (e) => {
      e.preventDefault();
      axios
        .put(`/user/address/${id}/edit`, {
          id: id,
          name: name,
          email: email,
          phone: phone,
          street: street,
          city: city,
          pin_code: pin_code,
          state: state,
          country: country.label,
          user_id: user_id,
        })
        .then((res) => {
          navigate("/user/address");
        })
        .catch((err) => {
          navigate(`/user/address/${id}`);
          setMessage(
            "Oppsie! Something went wrong. Please try entering valid datas"
          );
        });
    };
  }

  useEffect(() => {
    if (!(location.pathname == newAddressUrl)) {
      axios
        .get(`/user/address/${id}/getById`)
        .then((response) => {
          setStreet(response.data.street);
          setCity(response.data.city);
          setPin_code(response.data.pin_code);
          setState(response.data.state);
          setCountry(response.data.country);
          setPhone(response.data.phone);
          setName(response.data.name);
          setEmail(response.data.email);
          setTitle("Address Edit:");
        })
        .catch((err) => {
          setMessage("Sorry we couldnot get address with error " + err);
        });
    }
  }, []);

  return (
    <div>
      <SimpleNavBar />
      <br />
      {message && <h2>{message}</h2>}
      {options && (
        <div style={{ marginLeft: "10%" }}>
          <AddressForm
            street={street}
            setStreet={setStreet}
            city={city}
            setCity={setCity}
            pin_code={pin_code}
            setPin_code={setPin_code}
            state={state}
            setState={setState}
            country={country}
            options={options}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            title={title}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            errorMessage={errorMessage}
          />
        </div>
      )}
    </div>
  );
};

export default CreateAddress;
