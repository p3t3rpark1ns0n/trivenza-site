// Trivenza Logística - scripts do site
console.log("%cTrivenza Logística", "font-size:20px;font-weight:bold;color:#0d2b45");

document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("portal-link");
  if (link && window.PORTAL_URL) {
    link.href = window.PORTAL_URL.replace(/\/$/, "") + "/login";
  }
});
