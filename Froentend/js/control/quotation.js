document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // 🚫 STOP PAGE RELOAD
    event.stopPropagation();

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
      status: document.querySelectorAll("select")[2].value, // safe fallback fix
      revision_count: document.getElementById("formCount")?.value || 0,
      remark: document.getElementById("formRemark").value
    };

    try {
      const btn = form.querySelector("button[type='submit']");
      btn.disabled = true;
      btn.innerHTML = "Saving...";
      alert("✅ Quotation saved! ID: ");
      console.log(payload);

    //   const res = await fetch("https://YOUR-VERCEL-APP.vercel.app/api/quotation", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    //   });

    //   const data = await res.json();

    //   if (data.success) {
    //     // success UI
    //     form.reset();
    //     form.classList.remove("was-validated");

    //     alert("✅ Quotation saved! ID: " + data.id);
    //   } else {
    //     alert("❌ Failed to save");
    //     console.log(data);
    //   }

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      const btn = form.querySelector("button[type='submit']");
      btn.disabled = false;
      btn.innerHTML = `<i class="bi bi-send"></i> Submit Form`;
    }
  });
});