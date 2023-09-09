import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

//details direcltly copied while setting up firebase
const firebaseConfig = {
  apiKey: "AIzaSyAaiv9uPzbNhgp_HOJvKRzT8Fq8R0u5dCY",
  authDomain: "crown-clothing-db-2d45b.firebaseapp.com",
  projectId: "crown-clothing-db-2d45b",
  storageBucket: "crown-clothing-db-2d45b.appspot.com",
  messagingSenderId: "417769312614",
  appId: "1:417769312614:web:da02870fd17f6a0f29f8a7",
};

const firebaseApp = initializeApp(firebaseConfig);

//FOR GOOGLE PROVIDER
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//FOR AUTHENTICATION
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//FOR STORING USER DATA
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid); // db, collections,unique id identifier ; doc = gives document ref for that db inside collections with that id
  // console.log("user doc ref : ", userDocRef);

  const userSnapshot = await getDoc(userDocRef); //gets the data for that doc
  // console.log("snapshot --> ", userSnapshot); //returns boolean if that data exists or not in the db

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
  // display name is not coming from our (auth) user object ..but form -> to make userDocRef
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

/* THE FLOW IS :

the google with authenticate and send us back the response with user {}> access_token,uid,display name, email etc. : details of user
we use the userId to :
- get the document ref from firestore (userDocRef) : if user exists
- create / set the document with data from userAuth in my collection : if user data doesnt exist

*even if user doesn't exist Google will give us a object referring to its Documnet , though it will have no data

*userSnapshot though has the id == user.uid we got from Google
** suerSnapshot.exists() : gives boolean whether the data actually exists in firestore or not 

*/

/* 
    you can have different providers ; whether sign in with google,github etc . 
    Hence, we create a new object , here we have only used GoogleAuthProvider() . [instantiated as classes]
    whereas auth is an instance 
    you can generate a new provider and pass that in to get another sign in method 
    ** new keyword used to make new objects followed by constructor 

    but there is only one auth = getAuth() cuz for one session we only need to do it once , means one process (one time ?!) of authentication
 
 */

/* Native providers come with firebase by default . we don't need to create one */
