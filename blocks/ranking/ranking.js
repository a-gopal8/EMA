export default function decorate(block) {
  const rows = [...block.children];
  const table = document.createElement('table');
  table.className = 'ranking-table';

  rows.forEach((row, index) => {
    const tr = document.createElement('tr');
    if (index === 0) {
      tr.className = 'ranking-header';
      [...row.children].forEach((col) => {
        const th = document.createElement('th');
        th.textContent = col.textContent.trim();
        tr.append(th);
      });
      table.append(tr);
    } else {
      if (index % 2 === 0) tr.className = 'ranking-row-alt';
      [...row.children].forEach((col, colIdx) => {
        const td = document.createElement('td');
        const pic = col.querySelector('picture');
        if (pic) {
          td.className = 'ranking-logo';
          td.append(pic);
        } else {
          td.textContent = col.textContent.trim();
          if (colIdx === 0) td.className = 'ranking-position';
          if (colIdx === 2) td.className = 'ranking-name';
        }
        tr.append(td);
      });
      table.append(tr);
    }
  });

  block.replaceChildren(table);
}
