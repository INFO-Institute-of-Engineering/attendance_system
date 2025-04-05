document.addEventListener("DOMContentLoaded", () => {
    const requestTable = document.getElementById("requestTable");
  
    requestTable.addEventListener("click", function (e) {
      if (e.target.classList.contains("approve")) {
        alert("Request Approved!");
        e.target.closest("tr").remove();
      }
  
      if (e.target.classList.contains("reject")) {
        alert("Request Rejected!");
        e.target.closest("tr").remove();
      }
    });
  });
  