import PageTitle from "../components/layout/PageTitle";
import { updateUserProfile } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const User = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState("");
  // Sélectionnez les informations de l'utilisateur du store Redux
  const user = useSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user && !editMode) {
      // Mettre à jour formData avec les données de l'utilisateur
      setFormData({
        userName: user.userName || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user, editMode]);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });
  if (!user && !editMode) {
    return <div>Loading user data...</div>;
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserProfile({ userName: formData.userName })).unwrap();
      setNotification("Modifications enregistrées avec succès.");
      setTimeout(() => setNotification(""), 3000); // Masquer après 3 secondes
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setNotification("Échec de l'enregistrement des modifications.");
      setTimeout(() => setNotification(""), 3000);
    }
  };
  return (
    <>
      <PageTitle title="ArgentBank - HomePage" />
      <main className="main bg-dark">
        {notification && <div className="notification">{notification}</div>}
        {!editMode ? (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName} !
            </h1>
            <button className="edit-button" onClick={handleEdit}>
              Edit Name
            </button>
          </div>
        ) : (
          <section className="edit-content">
            <h1>Edit User Info</h1>
            <div className="input-wrapper">
              <label htmlFor="username">User Name :</label>
              <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="username">First Name :</label>
              <input type="text" name="firstName" value={formData.firstName} disabled />
            </div>
            <div className="input-wrapper">
              <label htmlFor="username">Last name :</label>
              <input type="text" name="lastName" value={formData.lastName} disabled />
            </div>

            <div className="edit-button-wrapper">
              <button className="save-edit-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-edit-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </section>
        )}
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default User;
