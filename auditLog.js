// auditLog.js - الكود الصحيح

// إضافة سجل جديد
async function addAuditLog(data) {
  const { db, serverTimestamp } = window.firebaseExports;
  const id = Date.now().toString(); // ID فريد
  await db.collection("auditLogs").doc(id).set({
    ...data,
    timestamp: serverTimestamp(),
  });
}

// الاستماع لتحديثات السجل تلقائياً
function listenToAuditLogs(callback) {
  const { db, collection, onSnapshot, query, orderBy } = window.firebaseExports;
  const q = db.collection("auditLogs").orderBy("timestamp", "desc");
  onSnapshot(q, (snapshot) => {
    const logs = snapshot.docs.map((doc) => doc.data());
    callback(logs);
  }, (error) => {
    console.error("Error listening to audit logs:", error);
  });
}

// Export to global scope
window.auditLogExports = {
  addAuditLog,
  listenToAuditLogs
};