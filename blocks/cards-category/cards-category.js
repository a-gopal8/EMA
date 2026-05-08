export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cols = [...row.children];
    cols.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const imgWrap = document.createElement('div');
        imgWrap.className = 'cards-category-image';
        imgWrap.append(pic);
        li.append(imgWrap);
      } else {
        const label = document.createElement('div');
        label.className = 'cards-category-label';
        label.innerHTML = col.innerHTML;
        li.append(label);
      }
    });
    ul.append(li);
  });
  block.replaceChildren(ul);
}
