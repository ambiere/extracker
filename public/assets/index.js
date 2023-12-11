document.addEventListener("DOMContentLoaded", (e) => {
  const resourceAnchor = document.querySelector("#resource-link");
  const endpoints = document.querySelector("#endpoints");
  if (resourceAnchor) {
    window
      .fetch("version")
      .then((res) => res.json())
      .then((version) => {
        resourceAnchor.setAttribute("href", `shorten/neSu8VaLfU`);
        resourceAnchor.innerHTML = `<p>/${getEndpointSegment(version)}/neSu8VaLfU</p>`;
        endpoints.innerHTML = `   
            <p><span>POST /${getEndpointSegment(version)}</span></p>
            <p><span>GET /${getEndpointSegment(version)}/:urlId</span></p>
            <p><span>...</span></p>`;
      });

    function getEndpointSegment(obj) {
      if (obj.version !== undefined) {
        return `v${obj.version}/api/shorten`;
      }
    }
  }
});
