function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    if (reveals[i].getBoundingClientRect().top < window.innerHeight - 100) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);

// --- MATRIX DIGITAL RAIN EFFECT ---
const canvas = document.getElementById("matrix-rain");
const ctx = canvas.getContext("2d");

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters used in the Matrix rain (Mix of Katakana, Latin, and Numerals)
const matrixChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ".split(
    "",
  );

const fontSize = 14;
const columns = canvas.width / fontSize; // Number of columns based on screen width
const drops = []; // Array to track the Y coordinate of each column

// Initialize all drops at the top (Y = 1)
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  // Black background with 0.05 opacity creates the fading "trail" effect
  ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // The pure neon green color for the text
  ctx.fillStyle = "#00ff41";
  ctx.font = fontSize + "px monospace";

  // Loop over every column
  for (let i = 0; i < drops.length; i++) {
    // Pick a random character
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];

    // Draw the character
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Randomly send the drop back to the top to create staggered lengths
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // Move the drop down for the next frame
    drops[i]++;
  }
}

// Run the animation at ~30 frames per second
setInterval(drawMatrix, 60);

// Ensure the canvas resizes if the user rotates their phone or resizes the browser
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// --- PARALLAX ORB SCROLLING ---
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const orb1 = document.querySelector(".orb-1");
  const orb2 = document.querySelector(".orb-2");

  // As you scroll down, the orbs are pushed downward slowly
  // The * 0.4 and * 0.6 give them different travel speeds for depth
  orb1.style.transform = `translateY(${scrollY * 0.4}px)`;
  orb2.style.transform = `translateY(${scrollY * 0.6}px)`;
});

// Navbar Hamburger Logic
const mobileMenuBtn = document.getElementById("mobile-menu");
const navLinksContainer = document.getElementById("nav-links");

mobileMenuBtn.addEventListener("click", () => {
  // Slide the menu down
  navLinksContainer.classList.toggle("active");

  // Change hamburger icon (bars) to an 'X' (times)
  const icon = mobileMenuBtn.querySelector("i");
  if (navLinksContainer.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Automatically close the menu when a link or button is clicked
const navItems = document.querySelectorAll(".nav-links-a, .contact-btn");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// --- FETCH PORTFOLIO PROJECTS ---
      const portfolioUrl = './portfolio.json?v=' + new Date().getTime();

      fetch(portfolioUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(projects => {
          const container = document.getElementById("portfolio-container");
          container.innerHTML = '';
          
          const topProjects = projects.slice(0, 4);

          topProjects.forEach((proj, index) => {
            const div = document.createElement("div");
            div.className = `card reveal stagger-${index + 1}`;
            
            // Check if the link is empty
            const isWIP = !proj.link || proj.link === "";
            
            div.innerHTML = `
              <span class="tag">${proj.field}</span>
              <h3>${proj.title}</h3>
              <p>${proj.description}</p>
              
              <span style="color:${isWIP ? '#666' : 'var(--neon-blue)'}; font-size:0.8rem; margin-top:15px; display:block;">
                ${isWIP ? 'Uploading Soon ⏳' : 'View Repository →'}
              </span>
            `;
            
            // Only add the click redirection and pointer cursor if a link exists
            if (!isWIP) {
                div.style.cursor = "pointer";
                div.onclick = () => {
                    window.open(proj.link, '_blank');
                };
            } else {
                // Keep the default arrow cursor so it doesn't look like a broken button
                div.style.cursor = "default";
            }
            
            container.appendChild(div);
          });
        })
        .catch(error => {
          console.error("Error loading portfolio.json:", error);
          document.getElementById("portfolio-container").innerHTML = 
            `<p style="color: #888;">Projects currently loading or unavailable.</p>`;
        });

fetch("./posts.json")
  .then((response) => response.json())
  .then((blogs) => {
    const container = document.getElementById("blog-container");

    blogs.forEach((post) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <span class="tag">${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span style="color:var(--neon-blue); font-size:0.8rem; margin-top:15px; display:block;">Read More →</span>
      `;

      // Redirection Logic
      div.onclick = () => {
        window.location.href = post.link;
      };

      container.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading posts.json:", error));
