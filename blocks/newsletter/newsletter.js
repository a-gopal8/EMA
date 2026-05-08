export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'newsletter-wrapper';

  const content = document.createElement('div');
  content.className = 'newsletter-content';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'newsletter-image';

  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        imageWrap.append(pic);
      } else {
        content.innerHTML += col.innerHTML;
      }
    });
  });

  const form = content.querySelector('p:last-of-type');
  if (form) {
    const formWrap = document.createElement('div');
    formWrap.className = 'newsletter-form';
    const input = document.createElement('input');
    input.type = 'email';
    input.placeholder = form.textContent.trim() || 'Enter your email';
    input.className = 'newsletter-input';
    const btn = document.createElement('button');
    btn.className = 'newsletter-submit';
    btn.innerHTML = '&#8594;';
    btn.setAttribute('aria-label', 'Subscribe');
    formWrap.append(input);
    formWrap.append(btn);
    form.replaceWith(formWrap);
  }

  wrapper.append(content);
  wrapper.append(imageWrap);
  block.replaceChildren(wrapper);
}
