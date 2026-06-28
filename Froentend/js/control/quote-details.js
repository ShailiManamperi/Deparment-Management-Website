document.addEventListener("DOMContentLoaded", async () => {

    const id = localStorage.getItem("selected_quote_id");
    if (!id) return;

    await loadQuote(id);
    await loadRevisions(id);

    // Add revision
    document.querySelectorAll(".needs-validation")[1]
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const payload = {
                quote_id: id,
                quote_ref: document.getElementById("qutRef").value,
                value_amount: document.getElementById("Value").value
            };

            const res = await fetch(
                "https://department-management-website-backe.vercel.app/api/quotation",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            );

            const result = await res.json();

            if (result.success) {
                await loadRevisions(id);
                alert("Revision added");
            }
        });
});


// =========================
// LOAD MAIN QUOTE
// =========================
async function loadQuote(id) {

    const res = await fetch(
        `https://department-management-website-backe.vercel.app/api/quotationdetails?id=${id}`
    );

    const data = await res.json();

    if (!data.success) return;

    const q = data.quote;
    document.getElementById("formRef").value = q.quote_ref || "Quote Ref";
    document.getElementById("formProject").value = q.project_name || "";
    document.getElementById("formClient").value = q.client_name || "";
    document.getElementById("formSC").value = q.sale_center || "";
    document.getElementById("formSP").value = q.sales_person || "";
    document.getElementById("formValue").value = q.value_amount || "";
    document.getElementById("formGp").value = q.gp_amount || "";
    document.getElementById("formDate").value = q.quotation_date?.split("T")[0] || "";
    document.getElementById("formScope").value = q.scope || "";
    document.getElementById("formStatus").value = q.status || "";
    document.getElementById("formRemark").value = q.remark || "";
}


// =========================
// LOAD REVISIONS TABLE
// =========================
async function loadRevisions(id) {

    const res = await fetch(
        `https://department-management-website-backe.vercel.app/api/quotationdetails?id=${id}`
    );

    const data = await res.json();

    const tbody = document.querySelector("#quotesTable tbody");
    tbody.innerHTML = "";

    data.revisions.forEach((r, i) => {

        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${r.quote_ref}</td>
                <td>${r.revision_date.split("T")[0]}</td>
                <td>${r.value_amount}</td>
            </tr>
        `;
    });
}