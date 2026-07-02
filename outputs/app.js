(() => {
  "use strict";

  const chunkCount = 9;
  const decoder = new TextDecoder();

  Promise.all(
    Array.from({ length: chunkCount }, (_, index) =>
      fetch(`./app.b64.${String(index).padStart(2, "0")}.txt`).then(response => {
        if (!response.ok) throw new Error(`Failed to load app chunk ${index}`);
        return response.text();
      })
    )
  )
    .then(chunks => chunks.join(""))
    .then(base64 => {
      const binary = atob(base64.replace(/\s/g, ""));
      const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
      const script = document.createElement("script");
      script.textContent = decoder.decode(bytes);
      document.head.appendChild(script);
    })
    .catch(error => {
      const banner = document.getElementById("errorBanner");
      if (banner) {
        banner.hidden = false;
        banner.textContent = `エラー: アプリの読み込みに失敗しました。${error.message}`;
      }
    });
})();
