// Authentication Guard for Dashboard
// This script checks if user is logged in before allowing access to dashboard

(function() {
  // Wait for Firebase to be loaded
  function checkAuth() {
    if (typeof firebase === 'undefined' || !firebase.auth) {
      setTimeout(checkAuth, 100);
      return;
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // User is not logged in, redirect to login page
        window.location.href = '/src/pages/login.html';
      }
      // User is logged in, allow access to dashboard
    });
  }

  checkAuth();
})();
