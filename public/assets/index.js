document.addEventListener("DOMContentLoaded", (e) => {
  const endpoints = document.querySelector("#endpoints");
  const idInputs = document.querySelectorAll("#id-input");
  const formElems = document.querySelectorAll("form");
  const to = document.querySelector("#to-input");
  const from = document.querySelector("#from-input");
  const limit = document.querySelector("#limit-input");

  Array.from(formElems).map((form) =>
    form.addEventListener("submit", (e) => {
      setTimeout(() => {
        form.reset();
      }, 250);
    })
  );

  if (endpoints) {
    window
      .fetch("version")
      .then((res) => res.json())
      .then((version) => {
        endpoints.innerHTML = `   
            <p><span>POST /${getEndpointSegment(version)}/auth/register</span></p>
            <p><span>POST /${getEndpointSegment(version)}/auth/authenticate</span></p>
            <p><span>POST /${getEndpointSegment(version)}/users/:userId/exercises</span></p>
            <p><span>GET /${getEndpointSegment(version)}users/:userId/exercises/:exerciseId</span></p>
            <p><span>GET /${getEndpointSegment(version)}/users/:userId/logs</span></p>
            <p><span>...</span></p>`;
      });

    function getEndpointSegment(obj) {
      if (obj.version !== undefined) {
        return `v${obj.version}/api`;
      }
    }
  }
  if (idInputs && to && from && limit) {
    [...Array.from(idInputs), from, to, limit].map((input) =>
      input.addEventListener("blur", (e) => {
        const target = e.target;
        const inputId = target.attributes["id"].value;
        const logForm = formElems[3];
        const exerciseForm = formElems[2];
        if (inputId === "id-input" && target.value != "") {
          exerciseForm.setAttribute("action", `users/${target.value}/exercises`);
          logForm.setAttribute("action", `users/${target.value}/logs`);
        }
        if (inputId === "from-input" && target.value != "") {
          logForm.action += `?from=${target.value}`;
        }
        if (inputId === "to-input" && target.value != "") {
          logForm.action += `&to=${target.value}`;
        }
        if (inputId === "limit-input" && target.value != "") {
          logForm.action += `&limit=${target.value}`;
        }
      })
    );
  }
});
