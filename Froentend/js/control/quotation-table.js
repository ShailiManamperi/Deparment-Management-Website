async function loadQuotationsTable() {
  console.log("load quotations");

  try {
    const res = await fetch("https://department-management-website-backe.vercel.app/api/quotation");
    const result = await res.json();

    console.log(result);

    if (!result.success) {
      console.log("Failed to load quotations");
      return;
    }

    const tbody = document.querySelector("#ordersTable tbody");
    tbody.innerHTML = "";

    result.data.forEach((item, index) => {

      let badgeClass = "text-bg-secondary";

      if (item.status === "Ongoing") badgeClass = "text-bg-warning";
      else if (item.status === "Onhold") badgeClass = "text-bg-info";
      else if (item.status === "Rejected") badgeClass = "text-bg-danger";
      else if (item.status === "Completed") badgeClass = "text-bg-success";

      const row = `
        <tr>
          <td class="fw-semibold">${index + 1}</td>

          <td>
            <span>${item.quote_ref || "-"}</span>
          </td>

          <td>${item.client_name || "-"}</td>

          <td>
            <span class="badge ${badgeClass}">
              ${item.status || "Unknown"}
            </span>
          </td>

          <td>${item.scope || "-"}</td>

          <td>${item.value_amount || 0}</td>

          <td>${item.gp_amount || 0}</td>

          <td class="text-end">
            <button class="btn btn-light btn-sm" onclick="viewQuotation(${item.id})">
              View
            </button>
          </td>
        </tr>
      `;

      tbody.innerHTML += row;
    });

  } catch (err) {
    console.error("Table load error:", err);
  }
}

// ✅ THIS IS WHAT YOU WERE MISSING
window.addEventListener("load", loadQuotationsTable);