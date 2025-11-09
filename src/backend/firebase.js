import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: window.ENV_CONFIG.FIREBASE_API_KEY,
  authDomain: window.ENV_CONFIG.FIREBASE_AUTH_DOMAIN,
  projectId: window.ENV_CONFIG.FIREBASE_PROJECT_ID,
  storageBucket: window.ENV_CONFIG.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.ENV_CONFIG.FIREBASE_MESSAGING_SENDER_ID,
  appId: window.ENV_CONFIG.FIREBASE_APP_ID,
  measurementId: window.ENV_CONFIG.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const salesCollection = db.collection("sales");
const customersCollection = db.collection("customers");
const servicesCollection = db.collection("services");

// Export Firebase functions and objects
window.firebaseExports = {
  db,
  auth,
  salesCollection,
  customersCollection,
  servicesCollection,
  onSnapshot: (ref, callback, errorCallback) =>
    ref.onSnapshot(callback, errorCallback),
  addDoc: (collection, data) => collection.add(data),
  doc: (collection, id) => collection.doc(id),
  deleteDoc: (docRef) => docRef.delete(),
  updateDoc: (docRef, data) => docRef.update(data),
  getDoc: (docRef) => docRef.get(),
  setDoc: (docRef, data) => docRef.set(data),
  query: (collection, ...constraints) => {
    let q = collection;
    constraints.forEach((constraint) => {
      if (Array.isArray(constraint) && constraint.length === 3) {
        q = q.where(constraint[0], constraint[1], constraint[2]);
      } else if (Array.isArray(constraint) && constraint.length === 2) {
        q = q.orderBy(constraint[0], constraint[1]);
      }
    });
    return q;
  },
  where: (field, operator, value) => [field, operator, value],
  getDocs: (query) => query.get(),
  writeBatch: () => db.batch(),
  orderBy: (field, direction) => [field, direction],
  serverTimestamp: () => firebase.firestore.FieldValue.serverTimestamp(),
  collection: (path) => db.collection(path),
  onAuthStateChanged: (auth, callback) => auth.onAuthStateChanged(callback),
  signInAnonymously: (auth) => auth.signInAnonymously(),
};
