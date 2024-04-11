import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

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
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    try {
      const res = await fetch(`/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 422 || !data) {
        console.log("error");
      } else {
        setINP(data);
        console.log("get data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

const updateuser = async(e)=>{
  e.preventDefault();
  const {name,email,age,mobile,work,address,desc} = inpval;
  const res2 = await fetch(`/updateuser/${id}`,{
    method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(inpval)
  });
  const data2 = await res2.json();
  console.log(data2);
  
  if(res2.status===422 || !data2){
    alert("fill the data")
  }else{
    alert("data added");
    navigate("/");
  }
} 

  
  return (
    <div>
      <div className="container">
        <NavLink to="/" >home2</NavLink>

        <form className="mt-5">
          <div className="row">
            <div class="form-group col-lg-6  col-md-6 col-12">
              <label for="exampleInputEmail1">Name</label>
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
              <label for="exampleInputPassword1">email</label>
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
              <label for="exampleInputPassword1">age</label>
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
              <label for="exampleInputPassword1">Mobile number</label>
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
              <label for="exampleInputPassword1">Work</label>
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
              <label for="exampleInputPassword1">Address</label>
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

            <button type="submit" onClick={updateuser} class="btn btn-primary mt-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
