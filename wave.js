const wave1 = document.getElementById("wave1");
const wave2 = document.getElementById("wave2");
const wave3 = document.getElementById("wave3");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = scrollY / maxScroll;

  // 🌊 PARALLAX (different speeds)
  const offset1 = Math.sin(scrollY * 0.01) * 10;
  const offset2 = Math.sin(scrollY * 0.015) * 15;
  const offset3 = Math.sin(scrollY * 0.02) * 20;

  wave1.setAttribute("d", `M0,100 C400,${200 + offset1} 1040,${0 + offset1} 1440,100 L1440,200 L0,200 Z`);
  wave2.setAttribute("d", `M0,120 C360,${180 + offset2} 1080,${20 + offset2} 1440,120 L1440,200 L0,200 Z`);
  wave3.setAttribute("d", `M0,140 C300,${220 + offset3} 1140,${40 + offset3} 1440,140 L1440,200 L0,200 Z`);

  // 🎨 COLOR DEPTH (deeper as you scroll)
  const darken = (base, amount) => Math.max(0, base - amount);

  wave1.style.fill = `rgb(${darken(120, progress * 60)}, ${darken(170, progress * 80)}, 255)`;
  wave2.style.fill = `rgb(${darken(80, progress * 60)}, ${darken(140, progress * 80)}, 255)`;
  wave3.style.fill = `rgb(${darken(40, progress * 60)}, ${darken(110, progress * 80)}, 255)`;
});