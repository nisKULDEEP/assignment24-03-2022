import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    age: 0,
    address:"",
    department:"",
    salary: 0,
    gender: "",
    maritalState: false,

  });

  const [allArray, setAllArray] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  

  const {firstName, lastName, age, address, gender, department,salary, maritalState} = formData;

  let handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setFormData((old) => ({
      ...old,
      [name]: type == "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetch(`http://localhost:3005/Employee`)
    .then((res) => res.json())
    .then((res) => setAllArray(res)) 
    .then(() => {
      setFetchData(false);
    })
}, [fetchData])



  let handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    let payloadjson = JSON.stringify(formData);
    fetch(`http://localhost:3005/Employee`, {
      method: "POST",
      body: payloadjson,
      headers : {
        "content-type" : "application/json"
      }
    })
    .then(() => {
      setFetchData(true)
    })

    
  }

  let showData = allArray.map((e) => {
    const {firstName, lastName, age, address, gender, department,salary, maritalState} = e;
    return (
      <div className="dataContainer" key={e.id}>
        <div className="row">
          <div>Name :</div>
          <div>{firstName +" "+ lastName}</div>
        </div>

        <div className="row">
          <div>Age :</div>
          <div>{age}</div>
        </div>

        <div className="row">
          <div>Address :</div>
          <div>{address}</div>
        </div>

        <div className="row">
          <div>Gender :</div>
          <div>{gender == "" ? "Not selected" : gender}</div>
        </div>

        <div className="row">
          <div>Department :</div>
          <div>{department == "" ? "Not selected" : department}</div>
        </div>

        <div className="row">
          <div>Salary :</div>
          <div>{salary}</div>
        </div>

        <div className="row">
          <div>Maritial Status :</div>
          <div>{maritalState ? "Married" : "Unmarried"}</div>
        </div>



      </div>
    )
  })





  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>Employee Registration</h2>
        <div className="title">Name : </div>
        <input
          type="text"
          onChange={handleChange}
          value={firstName}
          name="firstName"
          placeholder="First Name"
          className="textType"
        />
        <input
          type="text"
          onChange={handleChange}
          value={lastName}
          name="lastName"
          placeholder="Last Name"
          className="textType"
        />

        <br />
        <div className="title">Age : </div>

        <input
          type="number"
          onChange={handleChange}
          value={age}
          name="age"
          placeholder="age"
          className="textType"
        />
        <br />
        <div className="title">Address :</div>
        <input
          type="text"
          onChange={handleChange}
          value={address}
          name="address"
          placeholder="Full Address"
          className="textType"
        />

        <br />

        <label>
          <div className="title"> Department : </div> 
          <select
            name="department"
            id="department"
            onChange={handleChange}
            value={department}
            className="textType"
          >
            <option>Select</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </select>
        </label>

        <br />
        <div className="title">Salary :</div>
        <input
          type="number"
          onChange={handleChange}
          value={salary}
          name="salary"
          placeholder="Salary"
          className="textType"
        />
        <br />


        <label>
          <span className="title"> IS MARRIED : </span> 
          <input
          id="check"
            type="checkbox"
            onChange={handleChange}
            checked={maritalState}
            name="maritalState"
          />
        </label>
        <br />
        <div className="title">Gender :</div>
        <input

          name="gender"
          type="radio"
          value="male"
          id="male"
          onChange={handleChange}
        />
        <label htmlFor="male"> Male</label>
        <input
          name="gender"
          type="radio"
          value="female"
          id="female"
          onChange={handleChange}
        />
        <label htmlFor="female"> Female</label>
        <br />

        <button >Submit</button>
      </form>

      <div>{showData}</div>
    </div>
  );
}

export default App;
