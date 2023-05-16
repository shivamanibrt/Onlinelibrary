import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firbease-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "./userSlic";

export const getUserAction = (uid) => async (dispatch) => {
  try {
    // get user by id from firebase

    const docSnap = await getDoc(doc(db, "users", uid));

    //dispatch user to the reduxt

    if (docSnap.exists()) {
      const user = { ...docSnap.data(), uid };
      console.log(user);
      dispatch(setUser(user));
    }
  } catch (error) {
    toast.error(error.messge);
  }
};
//create new user
export const loginUser = (data) => async (dispatch) => {
  try {
    const pendingUser = signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    toast.promise(pendingUser, {
      pending: "Please wait...",
    });

    const { user } = await pendingUser;

    if (user.uid) {
      dispatch(getUserAction(user.uid));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateProfileAction =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      await setDoc(doc(db, "users", id), rest, { merge: true });
      dispatch(getUserAction(id));
      toast.success("Your account has been Update successfull");
    } catch (error) {
      return toast.error(error.message);
    }
  };
