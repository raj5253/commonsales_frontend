import { useFormik } from "formik";
import styles from "./SingupForm.module.css";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues  //<-- pardho isko
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignupForm = () => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell at us.

  // focus: name , id of input fields should have same variable name as of in initialValues.
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate, // <---- yaha pe valda call hua hai
    onSubmit: (values) => {
      // values in prop is the object which we need.
      alert(JSON.stringify(values, null, 2)); //covert values to json, you may destructue it  then covert to json. Then send it to backend. simple.🤌
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange} //ye same hai sab fileds me, this is typescript
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {/* {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null} */}
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {/* {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null} */}
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {/* {formik.errors.email ? <div>{formik.errors.email}</div> : null} */}
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;

// Formik is a small group of React components and hooks for building forms in React and React Native.
// It helps with the three most annoying parts:

// Getting values in and out of form state
// Validation and error messages
// Handling form submission
// By colocating all of the above in one place, Formik keeps things organized--making testing, refactoring, and reasoning about your forms a breeze.

// In our component, we’re just checking if an error exists and then immediately showing it to the user.
// This is awkward since we’re going to show error messages for fields that the user hasn’t even visited yet.
//solution for this is : touched
// Like errors and values, Formik keeps track of which fields have been visited.
// It stores this information in an object called touched that also mirrors the shape of values/initialValues.
// The keys of touched are the field names, and the values of touched are booleans true/false.
// to apply touch add this to inputs :  onBlur={formik.handleBlur}
