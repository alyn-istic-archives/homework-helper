const wave = document.querySelector(".promo-card");


window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = scrollY / maxScroll;

  // 🎨 COLOR DEPTH (deeper as you scroll)
  // const darken = (base, amount) => Math.max(0, base - amount);
  // wave. = `rgb(${darken(120, progress * 60)}, ${darken(170, progress * 80)}, 255)`;

});