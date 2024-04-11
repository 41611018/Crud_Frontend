import React, {  useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const Register = () => {

  const navigate = useNavigate();

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",
  });

  const handleClick = () => {
    navigate("/");
  };
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    console.log(e.target.name," ",e.target.value)
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async(e) => {
    e.preventDefault();try {
      
      const{name,email,work,address,mobile,desc,age} = inpval;
      console.log(inpval)
      const res = await fetch("/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(inpval)
      });
      const data = await res.json();
      if(res.status === 422 || !data ){
        alert("error");
        
      }else{
        alert("data added");
        navigate.push("/");
        console.log("data added");
      }
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div className="container">
      <NavLink></NavLink>

      <button className="btn btn-outline-info" onClick={handleClick}>
        Home
      </button>

      <form className="mt-5">
        <div className="row">
          <div class="form-group col-lg-6  col-md-6 col-12">
            {/* <label for="exampleInputEmail1">Name</label> */}
            <input
              type="email"
              name="name"
              value={inpval.name}
              onChange={setdata}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12 ">
            {/* <label for="exampleInputPassword1">email</label> */}
            <input
              type="email"
              name="email"
              value={inpval.email}
              onChange={setdata}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12 ">
            {/* <label for="exampleInputPassword1">age</label> */}
            <input
              type="text"
              name="age"
              value={inpval.age}
              onChange={setdata}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your age"
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12 ">
            {/* <label for="exampleInputPassword1">Mobile number</label> */}
            <input
              type="number"
              name="mobile"
              value={inpval.mobile}
              onChange={setdata}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your mobile number"
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            {/* <label for="exampleInputPassword1">Work</label> */}
            <input
              type="text"
              name="work"
              value={inpval.work}
              onChange={setdata}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your work"
            />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            {/* <label for="exampleInputPassword1">Address</label> */}
            <input
              type="text"
              name="address"
              value={inpval.address}
              onChange={setdata}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter  your Address"
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1">Description</label>
            <textarea
              name="desc"
              value={inpval.desc}
              onChange={setdata}
              className="form-control mt-1"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>

          <button type="submit"onClick={addinpdata} class="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
