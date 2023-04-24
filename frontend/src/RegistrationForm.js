import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } ,getValues, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    setSubmitting(true);
    axios.post("http://localhost:8080/register", data)
      .then((response) => {
        // console.log(response.data);
        setSubmitting(false);
        setSuccessMessage("Signup successfully!");
        setErrorMessage("")
        reset(); // clear the form inputs after successful submission,
      })
      .catch((error) => {
        // console.log(error);
        setErrorMessage("An error occurred while signup.");
        setSuccessMessage("")
        setSubmitting(false);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h2 className="mb-3">Sign up</h2>

          {errorMessage && <div className="alert alert-danger m-3">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success m-3">{successMessage}</div>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >

          

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                id="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>

           
            <button type="submit" className="btn btn-primary mt-5" disabled={submitting}>
              {submitting ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
