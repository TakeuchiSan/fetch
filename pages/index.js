import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPage = async () => {
    setLoading(true);
    const res = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
    const text = await res.text();
    setHtml(text);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Nestar Proxy Viewer</h1>
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Enter URL to fetch"
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={fetchPage} disabled={loading} style={{ marginLeft: '1rem' }}>
        {loading ? 'Loading...' : 'Fetch'}
      </button>
      <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
        <iframe srcDoc={html} style={{ width: '100%', height: '600px' }} />
      </div>
    </div>
  );
}