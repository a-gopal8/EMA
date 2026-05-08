export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cols = [...row.children];

    cols.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const imgWrap = document.createElement('div');
        imgWrap.className = 'cards-article-image';
        imgWrap.append(pic);
        li.append(imgWrap);
      } else {
        const body = document.createElement('div');
        body.className = 'cards-article-body';
        body.innerHTML = col.innerHTML;
        li.append(body);
      }
    });
    ul.append(li);
  });
  block.replaceChildren(ul);
}
