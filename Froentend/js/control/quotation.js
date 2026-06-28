window.addEventListener("load", () => {
  const form = document.querySelector(".needs-validation");
console.log("quotation.js loaded");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // 🚫 STOP REFRESH
    event.stopImmediatePropagation();

    console.log("Form submit captured"); // DEBUG

    // Bootstrap validation
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const payload = {
      quote_ref: document.getElementById("formRef").value,
      project_name: document.getElementById("formProject").value,
      client_name: document.getElementById("formClient").value,
      scope: document.getElementById("formScope").value,
      sale_center: document.getElementById("formSC").value,
      sales_person: document.getElementById("formSP").value,
      value_amount: document.getElementById("formValue").value,
      gp_amount: document.getElementById("formGp").value,
      status: document.querySelector("select[id='formStatus']")?.value,
      revision_count: document.getElementById("formCount")?.value || 0,
      remark: document.getElementById("formRemark").value
    };

    console.log("Payload:", payload);

    try {
      const res = await fetch("https://department-management-website-backe.vercel.app/api/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        alert("Saved ✔ ID: " + data.id);
        form.reset();
        form.classList.remove("was-validated");
      } else {
        alert("Save failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
});