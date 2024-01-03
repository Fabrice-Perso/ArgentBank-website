import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../redux/slices/authSlice";
import PageTitle from "../components/layout/PageTitle";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    userName: "",
  });
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Activer le loader
    if (formData.password !== formData.confirmPassword) {
      setNotification("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await dispatch(
        signupUser({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          userName: formData.userName,
        })
      ).unwrap();
      setNotification("Inscription réussie. Redirection...");
      setTimeout(() => navigate("/SignIn"), 3000);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setNotification("Échec de l'inscription. Veuillez réessayer.");
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  return (
    <>
      <PageTitle title="ArgentBank - Sign-in Page" />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <div className="notification-container">
            {notification && (
              <div className="notification">
                {notification}
                {isLoading && <div className="spinner"></div>}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="userName">Username</label>
              <input type="text" id="userName" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Mail</label>
              <input type="email" id="email" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" onChange={handleChange} aria-required="true" required />
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignUp;
