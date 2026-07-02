(() => {
  "use strict";

  const chunkCount = 6;

  async function loadEncodedBundle() {
    const chunks = await Promise.all(
      Array.from({ length: chunkCount }, (_, index) =>
        fetch(`./app.gz.b64.${String(index).padStart(2, "0")}.txt`).then(response => {
          if (!response.ok) throw new Error(`Failed to load app chunk ${index + 1}`);
          return response.text();
        })
      )
    );
    return chunks.join("");
  }

  async function inflateGzip(base64) {
    const binary = atob(base64.replace(/\s/g, ""));
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));

    if (!("DecompressionStream" in window)) {
      throw new Error("This browser cannot decompress the local app bundle.");
    }

    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).text();
  }

  function runApp(source) {
    const script = document.createElement("script");
    script.textContent = source;
    document.head.appendChild(script);
  }

  loadEncodedBundle()
    .then(inflateGzip)
    .then(runApp)
    .catch(error => {
      const banner = document.getElementById("errorBanner");
      if (banner) {
        banner.hidden = false;
        banner.textContent = `エラー: アプリの読み込みに失敗しました。${error.message}`;
      }
      console.error(error);
    });
})();
