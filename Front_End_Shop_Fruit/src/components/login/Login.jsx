import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthServices from "../../services/AuthService";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/reducers/user";

function Login() {
  const initData = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeValue = async (e) => {
    const { name, value } = await e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const [result, error] = await AuthServices.login(loginData);
    if (result) {
      console.log(result);
      dispatch(setUser(result.data.user));
      dispatch(setToken(result.data.token));

      let role = result.data.user.role;
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "User") {
        navigate("/");
        window.location.reload()
      } else {
        navigate("/");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  return (
    // <section className="sign-in-page">
    //   <div className="container p-0">
    //     <div className="row no-gutters height-self-center">
    //       <div className="col-sm-12 align-self-center page-content rounded">
    //         <div className="row m-0">
    //           <div className="col-sm-12 sign-in-page-data">
    //             <div className="sign-in-from bg-primary rounded">
    //               <h3 className="mb-0 text-center text-white">Sign in</h3>
    //               <p className="text-center text-white">
    //                 Enter your email address and password to access to web
    //               </p>
    //               <form
    //                 className="mt-4 form-text"
    //                 method="post"
    //                 onSubmit={(e) => handleSubmitForm(e)}
    //               >
    //                 <div className="form-group">
    //                   <label htmlFor="username">User Name</label>
    //                   <input
    //                     type="text"
    //                     className="form-control mb-0"
    //                     id="username"
    //                     placeholder="Enter your username..."
    //                     name="userName"
    //                     onChange={(e) => handleChangeValue(e)}
    //                   />
    //                 </div>
    //                 <div className="form-group">
    //                   <label htmlFor="userPassword">Password</label>
    //                   <input
    //                     type="password"
    //                     className="form-control mb-0"
    //                     id="userPassword"
    //                     placeholder="Enter your userPassword..."
    //                     name="userPassword"
    //                     onChange={(e) => handleChangeValue(e)}
    //                   />
    //                 </div>
    //                 <div className="sign-info text-center">
    //                   <button
    //                     type="submit"
    //                     className="btn btn-white d-block w-100 mb-2"
    //                   >
    //                     Sign in
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="container">
      <h2 className="text-center my-5">Login</h2>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            name="email"
            class="form-control"
            placeholder="Enter email"
            id="email"
            onChange={(e) => handleChangeValue(e)}
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Enter password"
            id="pwd"
            onChange={(e) => handleChangeValue(e)}
          />
        </div>
        <div class="form-group form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
