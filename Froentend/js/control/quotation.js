document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const payload = {
    quote_ref: document.getElementById("formRef").value,
    project_name: document.getElementById("formProject").value,
    client_name: document.getElementById("formClient").value,
    scope: document.getElementById("formScope").value,
    sale_center: document.getElementById("formSC").value,
    sales_person: document.getElementById("formSP").value,
    value_amount: document.getElementById("formValue").value,
    gp_amount: document.getElementById("formGp").value,
    status: document.getElementById("formStatus").value,
    revision_count: document.getElementById("formRevision").value || 0,
    remark: document.getElementById("formRemark").value
  };

  try {
    console.log(payload);
    // const response = await fetch("https://YOUR-VERCEL-APP.vercel.app/api/quotation", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(payload)
    // });

    // const result = await response.json();

    // if (result.success) {
    //   alert("✅ Saved successfully! ID: " + result.id);
    //   this.reset();
    // } else {
    //   alert("❌ Save failed");
    //   console.log(result);
    // }

  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
});
