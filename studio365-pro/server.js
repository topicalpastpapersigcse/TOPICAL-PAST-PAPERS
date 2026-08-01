import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-before-production';
const APP_PUBLIC_URL = (process.env.APP_PUBLIC_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const APP_INTERNAL_URL = (process.env.APP_INTERNAL_URL || APP_PUBLIC_URL).replace(/\/$/, '');
const DOCUMENT_SERVER_PUBLIC_URL = (process.env.DOCUMENT_SERVER_PUBLIC_URL || 'http://localhost:8080').replace(/\/$/, '');
const MAX_FILE_BYTES = Math.max(1, Number(process.env.MAX_FILE_MB || 100)) * 1024 * 1024;
const ACCESS_USERNAME = process.env.ACCESS_USERNAME || 'owner';
const ACCESS_PASSWORD = process.env.ACCESS_PASSWORD || '';
const FILES_DIR = path.join(__dirname, 'files');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const PUBLIC_DIR = path.join(__dirname, 'public');

const ALLOWED_EXTENSIONS = new Set(['docx','doc','odt','rtf','txt','xlsx','xls','ods','csv','pptx','ppt','odp','ppsx']);
const MIME_TYPES = {
  html:'text/html; charset=utf-8', css:'text/css; charset=utf-8', js:'text/javascript; charset=utf-8',
  json:'application/json; charset=utf-8', txt:'text/plain; charset=utf-8', csv:'text/csv; charset=utf-8',
  docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document', doc:'application/msword',
  odt:'application/vnd.oasis.opendocument.text', rtf:'application/rtf',
  xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', xls:'application/vnd.ms-excel',
  ods:'application/vnd.oasis.opendocument.spreadsheet',
  pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation', ppt:'application/vnd.ms-powerpoint',
  odp:'application/vnd.oasis.opendocument.presentation', ppsx:'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
};

await fsp.mkdir(FILES_DIR, { recursive: true });
await fsp.mkdir(TEMPLATES_DIR, { recursive: true });
for (const templateName of ['blank.docx','blank.xlsx','blank.pptx']) {
  const binaryPath = path.join(TEMPLATES_DIR, templateName);
  const encodedPath = `${binaryPath}.b64`;
  if (!fs.existsSync(binaryPath) && fs.existsSync(encodedPath)) {
    const encoded = await fsp.readFile(encodedPath, 'utf8');
    await fsp.writeFile(binaryPath, Buffer.from(encoded.trim(), 'base64'));
  }
}

function hmacToken(action, filename) {
  return crypto.createHmac('sha256', JWT_SECRET).update(`${action}:${filename}`).digest('base64url');
}
function validHmacToken(action, filename, token) {
  if (!token) return false;
  const expected = Buffer.from(hmacToken(action, filename));
  const actual = Buffer.from(String(token));
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}
function authorized(req) {
  if (!ACCESS_PASSWORD) return true;
  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const separator = decoded.indexOf(':');
    const username = separator >= 0 ? decoded.slice(0, separator) : decoded;
    const password = separator >= 0 ? decoded.slice(separator + 1) : '';
    const expectedUser = Buffer.from(ACCESS_USERNAME);
    const actualUser = Buffer.from(username);
    const expectedPassword = Buffer.from(ACCESS_PASSWORD);
    const actualPassword = Buffer.from(password);
    return expectedUser.length === actualUser.length && expectedPassword.length === actualPassword.length
      && crypto.timingSafeEqual(expectedUser, actualUser)
      && crypto.timingSafeEqual(expectedPassword, actualPassword);
  } catch {
    return false;
  }
}
function requestLogin(res) {
  res.writeHead(401, {
    'WWW-Authenticate': 'Basic realm="Studio365 Pro", charset="UTF-8"',
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end('Authentication required.');
}

function extensionOf(filename) { return path.extname(filename).slice(1).toLowerCase(); }
function sanitizeFilename(input) {
  const decoded = decodeURIComponent(String(input || ''));
  const extension = extensionOf(decoded);
  const base = path.basename(decoded, path.extname(decoded)).normalize('NFKC')
    .replace(/[^a-zA-Z0-9 _.-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 120) || 'Untitled';
  return extension ? `${base}.${extension}` : base;
}
function uniqueFilename(preferred) {
  const safe = sanitizeFilename(preferred); const ext = path.extname(safe); const base = path.basename(safe, ext);
  let candidate = safe; let index = 2;
  while (fs.existsSync(path.join(FILES_DIR, candidate))) candidate = `${base} (${index++})${ext}`;
  return candidate;
}
function documentTypeFor(ext) {
  if (['docx','doc','odt','rtf','txt'].includes(ext)) return 'word';
  if (['xlsx','xls','ods','csv'].includes(ext)) return 'cell';
  if (['pptx','ppt','odp','ppsx'].includes(ext)) return 'slide';
  throw Object.assign(new Error('Unsupported file type.'), { status: 415 });
}
function appLabelFor(ext) { return ({word:'Word',cell:'Excel',slide:'PowerPoint'})[documentTypeFor(ext)]; }
function ensureStoredFile(raw) {
  const safe = sanitizeFilename(raw); const fullPath = path.join(FILES_DIR, safe);
  if (!fullPath.startsWith(FILES_DIR) || !fs.existsSync(fullPath)) throw Object.assign(new Error('File not found.'), { status: 404 });
  const extension = extensionOf(safe); if (!ALLOWED_EXTENSIONS.has(extension)) throw Object.assign(new Error('Unsupported file type.'), { status: 415 });
  return { safe, fullPath, extension };
}
async function fileMetadata(filename) {
  const stat = await fsp.stat(path.join(FILES_DIR, filename)); const extension = extensionOf(filename);
  return { name:filename, extension, type:documentTypeFor(extension), app:appLabelFor(extension), size:stat.size, modifiedAt:stat.mtime.toISOString() };
}
async function listFiles() {
  const entries = await fsp.readdir(FILES_DIR, { withFileTypes:true }); const result=[];
  for (const entry of entries) if (entry.isFile() && !entry.name.startsWith('.') && ALLOWED_EXTENSIONS.has(extensionOf(entry.name))) result.push(await fileMetadata(entry.name));
  return result.sort((a,b)=>new Date(b.modifiedAt)-new Date(a.modifiedAt));
}
async function documentKey(filename) {
  const stat = await fsp.stat(path.join(FILES_DIR, filename));
  return crypto.createHash('sha256').update(`${filename}:${stat.size}:${stat.mtimeMs}`).digest('hex').slice(0,48);
}
function base64url(value) { return Buffer.from(value).toString('base64url'); }
function signJwt(payload) {
  const header = base64url(JSON.stringify({ alg:'HS256', typ:'JWT' }));
  const body = base64url(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}
function sendJson(res, status, data) {
  const body = Buffer.from(JSON.stringify(data)); res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Content-Length':body.length,'Cache-Control':'no-store'}); res.end(body);
}
function sendError(res, error) { console.error(error); sendJson(res, error.status || 500, { error:error.message || 'Unexpected server error.' }); }
async function readBody(req, limit=MAX_FILE_BYTES) {
  const chunks=[]; let length=0;
  for await (const chunk of req) { length += chunk.length; if (length > limit) throw Object.assign(new Error('File is too large.'), {status:413}); chunks.push(chunk); }
  return Buffer.concat(chunks);
}
async function readJson(req, limit=5*1024*1024) {
  const body=await readBody(req,limit); if (!body.length) return {}; try { return JSON.parse(body.toString('utf8')); } catch { throw Object.assign(new Error('Invalid JSON body.'),{status:400}); }
}
async function servePath(res, fullPath, downloadName=null) {
  const stat=await fsp.stat(fullPath); const ext=extensionOf(fullPath); const headers={'Content-Type':MIME_TYPES[ext]||'application/octet-stream','Content-Length':stat.size};
  if (downloadName) headers['Content-Disposition']=`attachment; filename*=UTF-8''${encodeURIComponent(downloadName)}`;
  res.writeHead(200,headers); fs.createReadStream(fullPath).pipe(res);
}
function editorConfig(filename, extension, key) {
  const encoded=encodeURIComponent(filename);
  const config={
    document:{fileType:extension,key,title:filename,url:`${APP_INTERNAL_URL}/files/${encoded}?token=${encodeURIComponent(hmacToken('read', filename))}`,permissions:{chat:true,comment:true,copy:true,download:true,edit:true,fillForms:true,modifyContentControl:true,modifyFilter:true,print:true,protect:true,review:true}},
    documentType:documentTypeFor(extension),
    editorConfig:{callbackUrl:`${APP_INTERNAL_URL}/api/callback/${encoded}?token=${encodeURIComponent(hmacToken('save', filename))}`,lang:'en',mode:'edit',user:{id:'studio365-owner',name:'Studio365 User'},customization:{autosave:true,compactHeader:false,compactToolbar:false,feedback:false,forcesave:true,help:true,hideRightMenu:false,plugins:true,toolbarHideFileName:false,toolbarNoTabs:false,unit:'cm',zoom:100}},
    height:'100%',width:'100%',type:'desktop'
  };
  config.token=signJwt(config); return config;
}

const server=http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url, APP_PUBLIC_URL); const pathname=url.pathname;
    const serviceRequest = pathname.startsWith('/files/') || pathname.startsWith('/api/callback/');
    if (!serviceRequest && pathname !== '/api/health' && !authorized(req)) return requestLogin(res);
    if (req.method==='GET' && pathname==='/') return servePath(res,path.join(PUBLIC_DIR,'index.html'));
    if (req.method==='GET' && pathname==='/editor') return servePath(res,path.join(PUBLIC_DIR,'editor.html'));
    if (req.method==='GET' && pathname.startsWith('/assets/')) {
      const relative=pathname.slice('/assets/'.length); const full=path.resolve(PUBLIC_DIR,relative);
      if (!full.startsWith(PUBLIC_DIR)||!fs.existsSync(full)) throw Object.assign(new Error('Asset not found.'),{status:404});
      return servePath(res,full);
    }
    if (req.method==='GET' && pathname==='/api/health') return sendJson(res,200,{ok:true,appPublicUrl:APP_PUBLIC_URL,documentServerPublicUrl:DOCUMENT_SERVER_PUBLIC_URL,jwtConfigured:JWT_SECRET!=='change-this-secret-before-production'});
    if (req.method==='GET' && pathname==='/api/files') return sendJson(res,200,{files:await listFiles()});
    if (req.method==='POST' && pathname==='/api/files/upload') {
      const original=url.searchParams.get('name')||'upload'; const extension=extensionOf(original);
      if (!ALLOWED_EXTENSIONS.has(extension)) throw Object.assign(new Error('Unsupported office file type.'),{status:415});
      const filename=uniqueFilename(original); await fsp.writeFile(path.join(FILES_DIR,filename),await readBody(req));
      return sendJson(res,201,{file:await fileMetadata(filename)});
    }
    if (req.method==='POST' && pathname==='/api/files/create') {
      const body=await readJson(req); const type=String(body.type||'').toLowerCase(); const title=String(body.title||'Untitled').trim();
      const templates={word:'blank.docx',cell:'blank.xlsx',slide:'blank.pptx'}; const extensions={word:'docx',cell:'xlsx',slide:'pptx'};
      if (!templates[type]) throw Object.assign(new Error('Invalid document type.'),{status:400});
      const filename=uniqueFilename(`${title||'Untitled'}.${extensions[type]}`);
      await fsp.copyFile(path.join(TEMPLATES_DIR,templates[type]),path.join(FILES_DIR,filename)); return sendJson(res,201,{file:await fileMetadata(filename)});
    }
    if (req.method==='GET' && pathname.startsWith('/api/editor-config/')) {
      const raw=pathname.slice('/api/editor-config/'.length); const {safe,extension}=ensureStoredFile(raw);
      return sendJson(res,200,{documentServerApiUrl:`${DOCUMENT_SERVER_PUBLIC_URL}/web-apps/apps/api/documents/api.js`,config:editorConfig(safe,extension,await documentKey(safe))});
    }
    if (req.method==='POST' && pathname.startsWith('/api/callback/')) {
      const raw=pathname.slice('/api/callback/'.length); const {safe,fullPath}=ensureStoredFile(raw);
      if (!validHmacToken('save', safe, url.searchParams.get('token'))) throw Object.assign(new Error('Invalid callback token.'),{status:403}); const body=await readJson(req); const status=Number(body.status);
      if ([2,6].includes(status)&&body.url) {
        const response=await fetch(body.url); if(!response.ok) throw new Error(`Document server save failed (${response.status}).`);
        const temporary=`${fullPath}.saving`; await fsp.writeFile(temporary,Buffer.from(await response.arrayBuffer())); await fsp.rename(temporary,fullPath);
      }
      if ([3,7].includes(status)) console.error('ONLYOFFICE save error',body);
      return sendJson(res,200,{error:0});
    }
    if (req.method==='GET' && pathname.startsWith('/files/')) {
      const raw=pathname.slice('/files/'.length); const {safe,fullPath}=ensureStoredFile(raw);
      if (!validHmacToken('read', safe, url.searchParams.get('token'))) throw Object.assign(new Error('Invalid file token.'),{status:403});
      return servePath(res,fullPath);
    }
    const downloadMatch=pathname.match(/^\/api\/files\/(.+)\/download$/);
    if (req.method==='GET' && downloadMatch) { const {safe,fullPath}=ensureStoredFile(downloadMatch[1]); return servePath(res,fullPath,safe); }
    if (req.method==='DELETE' && pathname.startsWith('/api/files/')) { const raw=pathname.slice('/api/files/'.length); const {fullPath}=ensureStoredFile(raw); await fsp.unlink(fullPath); return sendJson(res,200,{ok:true}); }
    throw Object.assign(new Error('Not found.'),{status:404});
  } catch(error) { sendError(res,error); }
});

server.listen(PORT,'0.0.0.0',()=>{console.log(`Studio365 Pro running at ${APP_PUBLIC_URL}`);console.log(`ONLYOFFICE Docs expected at ${DOCUMENT_SERVER_PUBLIC_URL}`);});
