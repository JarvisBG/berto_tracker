export function initDataTable(tableId, columns, data, actions = {}) {
  const tableBody = document.querySelector(`#${tableId}`);
  tableBody.innerHTML = '';

  data.forEach(row => {
    const tr = document.createElement('tr');
    columns.forEach(col => {
      const td = document.createElement('td');
      td.textContent = row[col.key] || '-';
      tr.appendChild(td);
    });

    if (actions.edit || actions.delete || actions.custom) {
      const td = document.createElement('td');
      if (actions.edit) {
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏';
        editBtn.onclick = () => actions.edit(row);
        td.appendChild(editBtn);
      }
      if (actions.delete) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.onclick = () => actions.delete(row.id);
        td.appendChild(deleteBtn);
      }
      if (actions.custom) {
        actions.custom.forEach(custom => {
          const btn = document.createElement('button');
          btn.textContent = custom.label;
          btn.onclick = () => custom.action(row);
          td.appendChild(btn);
        });
      }
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  });
}