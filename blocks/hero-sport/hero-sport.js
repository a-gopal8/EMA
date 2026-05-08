export default function decorate(block) {
  const rows = [...block.children];
  const mainContent = rows[0];
  const sidebarItems = rows.slice(1);

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-sport-wrapper';

  const mainSection = document.createElement('div');
  mainSection.className = 'hero-sport-main';

  const mainCols = [...mainContent.children];
  if (mainCols.length >= 2) {
    const textCol = mainCols[0];
    const imgCol = mainCols[1];

    const heading = textCol.querySelector('h1');
    if (heading) {
      heading.className = 'hero-sport-heading';
      mainSection.append(heading);
    }

    const pic = imgCol.querySelector('picture');
    if (pic) {
      pic.className = 'hero-sport-image';
      mainSection.append(pic);
    }

    const description = textCol.querySelector('p:not(.button-wrapper)');
    if (description) {
      description.className = 'hero-sport-description';
      mainSection.append(description);
    }

    const cta = textCol.querySelector('.button-wrapper');
    if (cta) {
      cta.className = 'hero-sport-cta';
      mainSection.append(cta);
    }
  }

  wrapper.append(mainSection);

  if (sidebarItems.length > 0) {
    const sidebar = document.createElement('div');
    sidebar.className = 'hero-sport-sidebar';

    const badge = document.createElement('span');
    badge.className = 'hero-sport-badge';
    badge.textContent = 'Today';
    sidebar.append(badge);

    sidebarItems.forEach((row) => {
      const card = document.createElement('div');
      card.className = 'hero-sport-sidebar-card';

      const cols = [...row.children];
      cols.forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const imgWrap = document.createElement('div');
          imgWrap.className = 'hero-sport-sidebar-image';
          imgWrap.append(pic);
          card.append(imgWrap);
        } else {
          const textWrap = document.createElement('div');
          textWrap.className = 'hero-sport-sidebar-text';
          textWrap.innerHTML = col.innerHTML;
          card.append(textWrap);
        }
      });
      sidebar.append(card);
    });

    wrapper.append(sidebar);
  }

  block.append(wrapper);
}
