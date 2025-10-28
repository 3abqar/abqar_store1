// firebase.js - الكود الكامل والصحيح

const firebaseConfig = {
  apiKey: "AIzaSyCZ0j398VfiI0rrXf5VyQ6qUr4iKFBPW4s",
  authDomain: "abqar-store.firebaseapp.com",
  projectId: "abqar-store",
  storageBucket: "abqar-store.firebasestorage.app",
  messagingSenderId: "119184115173",
  appId: "1:119184115173:web:46d08d93578b02970e1b0c",
  measurementId: "G-LFF1FP9YNH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const salesCollection = db.collection('sales');
const customersCollection = db.collection('customers');
const servicesCollection = db.collection('services');

// Export Firebase functions and objects
window.firebaseExports = {
  db, auth,
  salesCollection, customersCollection, servicesCollection,
  onSnapshot: (ref, callback, errorCallback) => ref.onSnapshot(callback, errorCallback),
  addDoc: (collection, data) => collection.add(data),
  doc: (collection, id) => collection.doc(id),
  deleteDoc: (docRef) => docRef.delete(),
  updateDoc: (docRef, data) => docRef.update(data),
  getDoc: (docRef) => docRef.get(),
  setDoc: (docRef, data) => docRef.set(data),
  query: (collection, ...constraints) => {
    let q = collection;
    constraints.forEach(constraint => {
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
  signInAnonymously: (auth) => auth.signInAnonymously()
};

