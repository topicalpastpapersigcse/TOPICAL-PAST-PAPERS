const params = new URLSearchParams(location.search);
const filename = params.get('file');
const loading = document.querySelector('#loading');

function showError(message) {
  loading.innerHTML = `<div class="error"><h1>Could not open the editor</h1><p>${message}</p><p><a href="/">Return to your files</a></p></div>`;
}

if (!filename) {
  showError('No file was selected.');
} else {
  document.title = `${filename} · Studio365 Pro`;
  try {
    const response = await fetch(`/api/editor-config/${encodeURIComponent(filename)}`);
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || 'Could not create editor configuration.');

    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = body.documentServerApiUrl;
      script.onload = resolve;
      script.onerror = () => reject(new Error('The ONLYOFFICE document server could not be reached.'));
      document.head.append(script);
    });

    body.config.events = {
      onAppReady() { loading.remove(); },
      onError(event) { console.error('ONLYOFFICE error', event); },
      onRequestClose() { location.href = '/'; },
      onRequestRename(event) { console.log('Rename requested', event); }
    };
    new DocsAPI.DocEditor('editor', body.config);
  } catch (error) {
    showError(error.message);
  }
}
