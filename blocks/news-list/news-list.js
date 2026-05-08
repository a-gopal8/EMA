export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'news-list-layout';

  const list = document.createElement('div');
  list.className = 'news-list-items';

  const featured = document.createElement('div');
  featured.className = 'news-list-featured';

  rows.forEach((row, index) => {
    const cols = [...row.children];

    if (index === rows.length - 1 && cols.length >= 2) {
      const card = document.createElement('div');
      card.className = 'news-list-featured-card';

      const imgWrap = document.createElement('div');
      imgWrap.className = 'news-list-featured-image';

      const overlay = document.createElement('div');
      overlay.className = 'news-list-featured-overlay';

      cols.forEach((col) => {
        if (col.querySelector('picture') || col.querySelector('img')) {
          const pic = col.querySelector('picture');
          if (pic) imgWrap.append(pic);
        } else {
          while (col.firstElementChild) overlay.append(col.firstElementChild);
        }
      });

      card.append(imgWrap);
      card.append(overlay);
      featured.append(card);
      return;
    }

    const item = document.createElement('div');
    item.className = 'news-list-item';

    cols.forEach((col) => {
      if (col.querySelector('picture') || col.querySelector('img')) {
        const imgWrap = document.createElement('div');
        imgWrap.className = 'news-list-item-image';
        const pic = col.querySelector('picture');
        if (pic) imgWrap.append(pic);
        item.append(imgWrap);
      } else {
        const textWrap = document.createElement('div');
        textWrap.className = 'news-list-item-text';
        while (col.firstElementChild) textWrap.append(col.firstElementChild);
        item.append(textWrap);
      }
    });

    list.append(item);
  });

  wrapper.append(list);
  wrapper.append(featured);
  block.replaceChildren(wrapper);
}
