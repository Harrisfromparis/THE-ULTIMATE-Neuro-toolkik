// Simple test page to verify routing works
export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page - Full Resources Catalogue</h1>
      <p>If you can see this page, routing is working correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>← Back to Home</a>
    </div>
  );
}
