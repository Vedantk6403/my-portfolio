  // Custom Intersection Observer for smooth scrolling fade-ins
      document.addEventListener("DOMContentLoaded", () => {
        const elements = document.querySelectorAll(".fade-in");

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
              }
            });
          },
          { threshold: 0.1 },
        );

        elements.forEach((el) => observer.observe(el));

        // Copy Button Logic for Code Blocks
        document.querySelectorAll(".code-container").forEach((container) => {
          const btn = container.querySelector(".copy-btn");
          const code = container.querySelector("code");

          btn.addEventListener("click", () => {
            navigator.clipboard.writeText(code.innerText).then(() => {
              btn.innerText = "Copied!";
              btn.style.color = "#000";
              btn.style.background = "var(--neon-blue)";
              setTimeout(() => {
                btn.innerText = "Copy";
                btn.style.color = "#fff";
                btn.style.background = "#2a2a2a";
              }, 2000);
            });
          });
        });
      });