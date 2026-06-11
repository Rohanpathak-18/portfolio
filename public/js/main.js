
const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Node.js Developer",
  "Problem Solver"
];

let roleIndex = 0;

const typingText = document.getElementById("typing-text");

if (typingText) {
  setInterval(() => {
    typingText.textContent = roles[roleIndex];
    roleIndex = (roleIndex + 1) % roles.length;
  }, 2000);
}

async function loadProjects() {
  try {
    const response = await fetch("/api/projects");
    const projects = await response.json();

    const container = document.getElementById("projectContainer");

    if (!container) return;

    container.innerHTML = "";

    projects.forEach(project => {
      container.innerHTML += `
        <div class="project-card">
          ${
            project.image
              ? `<img src="${project.image}" alt="${project.title}">`
              : ""
          }

          <h3>${project.title}</h3>

          <p>${project.description}</p>

          <a href="${project.githubLink}" target="_blank">
            GitHub
          </a>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

async function loadCertificates() {
  try {
    const response = await fetch("/api/certificates");
    const certificates = await response.json();

    const container = document.getElementById("certificateContainer");

    if (!container) return;

    container.innerHTML = "";

    certificates.forEach(cert => {
      container.innerHTML += `
        <div class="certificate-card">
          <img src="${cert.image}" alt="${cert.title}">

          <h3>${cert.title}</h3>

          <p>${cert.issuer}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading certificates:", error);
  }
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (response.ok) {
        alert("Message Sent Successfully!");
        contactForm.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Message Error:", error);
    }
  });
}

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
}

const projectSearch = document.getElementById("projectSearch");

if (projectSearch) {
  projectSearch.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();

    document.querySelectorAll(".project-card").forEach(card => {
      const text = card.innerText.toLowerCase();

      card.style.display = text.includes(value)
        ? "block"
        : "none";
    });
  });
}

loadProjects();
loadCertificates();

