export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'feature-carousel-wrapper';

  rows.forEach((row, index) => {
    const slide = document.createElement('div');
    slide.className = `feature-carousel-slide${index === 0 ? ' active' : ''}`;

    const cols = [...row.children];

    let picCol = null;
    let textCol = null;

    cols.forEach((col) => {
      if (col.querySelector('picture') || col.querySelector('img')) {
        picCol = col;
      } else if (col.textContent.trim()) {
        textCol = col;
      }
    });

    if (picCol) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'feature-carousel-image';
      const pic = picCol.querySelector('picture') || picCol;
      imgWrap.append(pic.querySelector ? pic.querySelector('picture') || pic : pic);
      slide.append(imgWrap);
    }

    const overlay = document.createElement('div');
    overlay.className = 'feature-carousel-content';
    if (textCol) {
      while (textCol.firstChild) overlay.append(textCol.firstChild);
    }
    slide.append(overlay);

    wrapper.append(slide);
  });

  const nav = document.createElement('div');
  nav.className = 'feature-carousel-nav';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'feature-carousel-btn prev';
  prevBtn.innerHTML = '&larr;';
  prevBtn.setAttribute('aria-label', 'Previous');

  const nextBtn = document.createElement('button');
  nextBtn.className = 'feature-carousel-btn next';
  nextBtn.innerHTML = '&rarr;';
  nextBtn.setAttribute('aria-label', 'Next');

  const dots = document.createElement('div');
  dots.className = 'feature-carousel-dots';
  rows.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = `feature-carousel-dot${index === 0 ? ' active' : ''}`;
    dot.textContent = index + 1;
    dots.append(dot);
  });

  nav.append(prevBtn);
  nav.append(dots);
  nav.append(nextBtn);
  wrapper.append(nav);

  block.replaceChildren(wrapper);

  let current = 0;
  const slides = wrapper.querySelectorAll('.feature-carousel-slide');
  const allDots = wrapper.querySelectorAll('.feature-carousel-dot');

  function showSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    allDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }

  prevBtn.addEventListener('click', () => {
    showSlide((current - 1 + slides.length) % slides.length);
  });

  nextBtn.addEventListener('click', () => {
    showSlide((current + 1) % slides.length);
  });

  allDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx));
  });
}
