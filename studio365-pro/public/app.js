const fileGrid = document.querySelector('#fileGrid');
const emptyState = document.querySelector('#emptyState');
const fileCount = document.querySelector('#fileCount');
const uploadInput = document.querySelector('#fileUpload');
const dialog = document.querySelector('#createDialog');
const createForm = document.querySelector('#createForm');
const newFileName = document.querySelector('#newFileName');
const dialogTitle = document.querySelector('#dialogTitle');
const serverStatus = document.querySelector('#serverStatus');
let files = [];
let filter = 'all';
let creatingType = 'word';

const typeInfo = {
  word: { label: 'Document', icon: 'W', className: 'word', defaultName: 'Document' },
  cell: { label: 'Spreadsheet', icon: 'X', className: 'excel', defaultName: 'Workbook' },
  slide: { label: 'Presentation', icon: 'P', className: 'powerpoint', defaultName: 'Presentation' }
};

function toast(message, error = false) {
  const element = document.querySelector('#toast');
  element.textContent = message;
  element.classList.toggle('error', error);
  element.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove('show'), 2600);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function openFile(name) {
  window.location.href = `/editor?file=${encodeURIComponent(name)}`;
}

async function request(url, options) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
  return body;
}

function renderFiles() {
  const shown = filter === 'all' ? files : files.filter(file => file.type === filter);
  fileCount.textContent = `${files.length} file${files.length === 1 ? '' : 's'}`;
  fileGrid.innerHTML = '';
  emptyState.classList.toggle('hidden', shown.length > 0);

  for (const file of shown) {
    const info = typeInfo[file.type];
    const card = document.createElement('article');
    card.className = 'file-card';
    card.innerHTML = `
      <button class="file-open" aria-label="Open ${escapeHtml(file.name)}">
        <span class="file-icon ${info.className}">${info.icon}</span>
        <span class="file-copy">
          <strong title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</strong>
          <small>${info.label} · ${formatBytes(file.size)}</small>
          <small>Modified ${formatDate(file.modifiedAt)}</small>
        </span>
      </button>
      <div class="file-actions">
        <a href="/api/files/${encodeURIComponent(file.name)}/download">Download</a>
        <button class="delete-button">Delete</button>
      </div>`;
    card.querySelector('.file-open').addEventListener('click', () => openFile(file.name));
    card.querySelector('.delete-button').addEventListener('click', async () => {
      if (!confirm(`Delete “${file.name}”?`)) return;
      try {
        await request(`/api/files/${encodeURIComponent(file.name)}`, { method: 'DELETE' });
        toast('File deleted');
        await loadFiles();
      } catch (error) { toast(error.message, true); }
    });
    fileGrid.append(card);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

async function loadFiles() {
  try {
    const data = await request('/api/files');
    files = data.files;
    renderFiles();
  } catch (error) {
    toast(error.message, true);
    fileCount.textContent = 'Could not load files';
  }
}

async function checkHealth() {
  try {
    const data = await request('/api/health');
    await fetch(data.documentServerPublicUrl, { mode: 'no-cors' }).catch(() => null);
    serverStatus.className = `server-status ${data.jwtConfigured ? 'ready' : 'warning'}`;
    serverStatus.textContent = data.jwtConfigured ? 'Editor server configured' : 'Set a secure JWT secret before production';
  } catch {
    serverStatus.className = 'server-status error';
    serverStatus.textContent = 'Editor server unavailable';
  }
}

document.querySelectorAll('.create-card').forEach(button => {
  button.addEventListener('click', () => {
    creatingType = button.dataset.type;
    const info = typeInfo[creatingType];
    dialogTitle.textContent = `New ${info.label.toLowerCase()}`;
    newFileName.value = info.defaultName;
    dialog.showModal();
    requestAnimationFrame(() => newFileName.select());
  });
});

createForm.addEventListener('submit', async event => {
  if (event.submitter?.value === 'cancel') return;
  event.preventDefault();
  const button = document.querySelector('#createSubmit');
  button.disabled = true;
  try {
    const data = await request('/api/files/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: creatingType, title: newFileName.value })
    });
    dialog.close();
    openFile(data.file.name);
  } catch (error) {
    toast(error.message, true);
  } finally {
    button.disabled = false;
  }
});

uploadInput.addEventListener('change', async () => {
  if (!uploadInput.files.length) return;
  try {
    toast(`Uploading ${uploadInput.files.length} file${uploadInput.files.length === 1 ? '' : 's'}…`);
    let uploaded = 0;
    for (const file of uploadInput.files) {
      await request(`/api/files/upload?name=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: await file.arrayBuffer()
      });
      uploaded += 1;
    }
    toast(`${uploaded} file${uploaded === 1 ? '' : 's'} uploaded`);
    await loadFiles();
  } catch (error) {
    toast(error.message, true);
  } finally {
    uploadInput.value = '';
  }
});

document.querySelector('#refreshButton').addEventListener('click', loadFiles);
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
    renderFiles();
  });
});

await Promise.all([loadFiles(), checkHealth()]);
