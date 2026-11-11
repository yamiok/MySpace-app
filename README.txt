MYSPACE OFFLINE PACKAGE

Files:
- index.html: the MySpace app
- manifest.json: Home Screen app metadata
- service-worker.js: offline caching and fallback
- icons/myspace-1024.png: Home Screen icon

INSTALL / UPDATE:
1. Upload the contents of this folder to the root of your GitHub Pages repository, keeping the icons folder.
2. Open the GitHub Pages address in Safari on the iPhone while online.
3. Wait for the page to finish loading, then reload it once while online so the service worker can install and cache the app.
4. In Safari, use Share > Add to Home Screen.
5. Open MySpace once from the Home Screen while online. Then test by enabling Airplane Mode and reopening it.

IMPORTANT:
- The first visit and first offline-cache installation require internet access.
- After successful installation, the app shell can load offline. Features that require external websites, cloud services, or notifications while the app is closed may still need internet / native iOS support.
- Keep all files and the icons folder at the same relative paths shown here.
