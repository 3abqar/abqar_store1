// Firebase configuration using compat library
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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

const salesCollection = db.collection("sales");
const customersCollection = db.collection("customers");
const servicesCollection = db.collection("services");

// Export Firebase functions
window.firebaseExports = {
  db,
  auth,
  salesCollection,
  customersCollection,
  servicesCollection,
  onSnapshot: (ref, callback, errorCallback) =>
    ref.onSnapshot(callback, errorCallback),
  addDoc: (collectionRef, data) => collectionRef.add(data),
  
  // دالة doc الذكية التي تقبل كل الحالات
  doc: (arg1, arg2, arg3) => {
    if (arg3 !== undefined) return db.collection(arg2).doc(arg3);
    return arg1.doc(arg2);
  },

  deleteDoc: (docRef) => docRef.delete(),
  updateDoc: (docRef, data) => docRef.update(data),
  
  // --- التصحيح هنا: تغليف النتيجة لتعمل دالة exists() كما يتوقع الكود ---
  getDoc: (docRef) => {
    return docRef.get().then(snap => {
        // ننشئ كائن جديد يحتوي على البيانات والوظائف المطلوبة
        return {
            exists: () => snap.exists, // تحويل الخاصية إلى دالة
            data: () => snap.data(),
            id: snap.id,
            ref: snap.ref
        };
    });
  },
  // -----------------------------------------------------------

  setDoc: (docRef, data, options) => docRef.set(data, options),
  
  query: (collectionRef, ...constraints) => {
    let q = collectionRef;
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
  orderBy: (field, direction) => [field, direction],
  getDocs: (queryRef) => queryRef.get().then(snapshot => {
      // إصلاح مماثل لـ getDocs في حال احتجت له مستقبلاً
      const docs = snapshot.docs.map(snap => ({
          exists: () => snap.exists,
          data: () => snap.data(),
          id: snap.id,
          ref: snap.ref
      }));
      return { docs, forEach: snapshot.forEach.bind(snapshot), empty: snapshot.empty, size: snapshot.size };
  }),
  
  writeBatch: () => db.batch(),
  serverTimestamp: () => firebase.firestore.FieldValue.serverTimestamp(),
  collection: (path) => db.collection(path),
  onAuthStateChanged: (authInstance, callback) => authInstance.onAuthStateChanged(callback),
  signInAnonymously: (authInstance) => authInstance.signInAnonymously(),
};