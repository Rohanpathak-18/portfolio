const token = localStorage.getItem("token");

if (!token) {
  window.location = "/login.html";
}

/* ------------------ PROJECTS ------------------ */

async function loadProjects() {

  try {

    const response =
      await fetch("/api/projects");

    const projects =
      await response.json();

    document.getElementById(
      "projectCount"
    ).innerText = projects.length;

    const container =
      document.getElementById(
        "projects"
      );

    container.innerHTML = "";

    projects.forEach(project => {

      container.innerHTML += `

      <div class="project-item">

        ${
          project.image
            ? `
            <img
              src="${project.image}"
              style="
              width:100%;
              height:180px;
              object-fit:cover;
              border-radius:10px;
              margin-bottom:10px;
              ">
            `
            : ""
        }

        <h4>${project.title}</h4>

        <p>
          ${project.description}
        </p>

        ${
          project.githubLink
            ? `
            <a
              href="${project.githubLink}"
              target="_blank">
              GitHub
            </a>
            `
            : ""
        }

        <br><br>

        ${
          project.liveLink
            ? `
            <a
              href="${project.liveLink}"
              target="_blank">
              Live Demo
            </a>
            `
            : ""
        }

        <br><br>

        <button
          onclick="deleteProject('${project._id}')">
          Delete
        </button>

      </div>

      `;
    });

  } catch (error) {

    console.log(error);

  }

}

/* ------------------ MESSAGES ------------------ */

async function loadMessages() {

  try {

    const response =
      await fetch(
        "/api/messages",
        {
          headers: {
            Authorization: token
          }
        }
      );

    const messages =
      await response.json();

    document.getElementById(
      "messageCount"
    ).innerText =
      messages.length;

    const container =
      document.getElementById(
        "messages"
      );

    container.innerHTML = "";

    messages.forEach(msg => {

      container.innerHTML += `

      <div class="message-item">

        <h4>${msg.name}</h4>

        <p>
          ${msg.email}
        </p>

        <p>
          ${msg.message}
        </p>

      </div>

      `;
    });

  } catch (error) {

    console.log(error);

  }

}

/* ------------------ ADD PROJECT ------------------ */

document
  .getElementById("projectForm")
  .addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const title =
        document.getElementById(
          "title"
        ).value;

      const description =
        document.getElementById(
          "description"
        ).value;

      const githubLink =
        document.getElementById(
          "githubLink"
        ).value;

      const liveLink =
        document.getElementById(
          "liveLink"
        ).value;

      const image =
        document.getElementById(
          "image"
        ).files[0];

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "githubLink",
        githubLink
      );

      formData.append(
        "liveLink",
        liveLink
      );

      if (image) {

        formData.append(
          "image",
          image
        );

      }

      await fetch(
        "/api/projects",
        {
          method: "POST",

          headers: {
            Authorization:
              token
          },

          body: formData
        }
      );

      document
        .getElementById(
          "projectForm"
        )
        .reset();

      loadProjects();

    }
  );

/* ------------------ ADD SKILL ------------------ */

document
  .getElementById(
    "skillForm"
  )
  .addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const name =
        document.getElementById(
          "skillName"
        ).value;

      const percentage =
        document.getElementById(
          "percentage"
        ).value;

      await fetch(
        "/api/skills",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              token
          },

          body: JSON.stringify({
            name,
            percentage
          })
        }
      );

      alert("Skill Added");

      document
        .getElementById(
          "skillForm"
        )
        .reset();

    }
  );

/* ------------------ DELETE PROJECT ------------------ */

async function deleteProject(id) {

  const confirmDelete =
    confirm(
      "Delete this project?"
    );

  if (!confirmDelete)
    return;

  await fetch(
    "/api/projects/" + id,
    {
      method: "DELETE",

      headers: {
        Authorization:
          token
      }
    }
  );

  loadProjects();

}

/* ------------------ LOGOUT ------------------ */

function logout() {

  localStorage.removeItem(
    "token"
  );

  window.location =
    "/login.html";

}

/* ------------------ INITIAL LOAD ------------------ */

loadProjects();
loadMessages();