import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosCommon from "../hooks/useAxiosCommon";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosCommon = useAxiosCommon()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signInWithGitHub = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    // await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
    //   withCredentials: true,
    // });
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };


  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);


      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser?.email };

        (async () => {
          try {
            const { data } = await axiosCommon.post("/jwt", userInfo);
            if (data?.token) {
              localStorage.setItem("access-token", data?.token);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        })();
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      console.log("currentUser: ", currentUser);


    });
    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    signInWithGitHub,
    resetPassword,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.node,
};

export default AuthProvider;
