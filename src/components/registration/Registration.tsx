import React from "react";
import "./registration.scss";

function Registration() {
  return (
    <div className="formsBox" data-testid="formsBox">
      <form className="forms" data-testid="forms">
        {/*First Name*/}
        <div className="imya">
          <label htmlFor="firstname">
            First name:
            <input
              data-testid="inputsfirstname"
              type="text"
              className="inputs"
            />
          </label>
        </div>
        {/*Last name*/}
        <div>
          <label htmlFor="lastname">
            Last name:
            <input
              data-testid="inputslastname"
              type="text"
              className="inputs"
            />
          </label>
        </div>
        {/*Date of birth*/}
        <div>
          <label htmlFor="date">
            Date of birth:
            <input data-testid="inputsdate" type="date" className="inputs" />
          </label>
        </div>
        {/*Country*/}
        <div>
          <label htmlFor="country">
            Country:
            <select data-testid="inputscountry" className="inputs">
              <option value=""></option>
              <option value="Belarus">Belarus</option>
              <option value="Ukraine">Ukraine</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Russia">Russia</option>
              <option value="Georgia">Georgia</option>
            </select>
          </label>
        </div>
        {/*Gender*/}
        <div>
          <label htmlFor="gender">
            Gender:
            <input
              data-testid="inputsMale"
              type="radio"
              id="Male"
              value="Male"
            />
            <label htmlFor="Male">Male</label>
            <input
              data-testid="inputsFemale"
              type="radio"
              id="Female"
              value="Female"
            />
            <label htmlFor="Female">Female</label>
          </label>
        </div>
        {/*like our shop*/}
        <div>
          <label htmlFor="shop">
            Do you like our shop?
            <input data-testid="inputsshop" type="checkbox" id="shop" />
          </label>
        </div>
        {/*Upload file*/}
        <div>
          <div>
            Upload file:
            <input data-testid="inputsfile" type="file" id="file" />
          </div>
        </div>
        <button data-testid="buttonForm" className="buttonSub" type="submit">
          Make card
        </button>
      </form>
      <div className="cardsUsers" data-testid="cardsUsers"></div>
    </div>
  );
}

export default Registration;
