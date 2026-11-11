import { useCallback, useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  service: string;
};

type ApiState =
  | { kind: 'checking' }
  | { kind: 'connected'; service: string }
  | { kind: 'error'; message: string };

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '');

export default function App() {
  const [apiState, setApiState] = useState<ApiState>({ kind: 'checking' });

  const checkApi = useCallback(async () => {
    setApiState({ kind: 'checking' });
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`API responded with HTTP ${response.status}`);
      }
      const data = (await response.json()) as HealthResponse;
      if (data.status !== 'ok') {
        throw new Error('API returned an unexpected health status');
      }
      setApiState({ kind: 'connected', service: data.service });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown connection error';
      setApiState({ kind: 'error', message });
    }
  }, []);

  useEffect(() => {
    void checkApi();
  }, [checkApi]);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">LG</div>
        <div>
          <p className="eyebrow">SPRINT 0 · PROJECT FOUNDATION</p>
          <h1>Learning Gap Detection Engine</h1>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">BUILDING THE FOUNDATION</p>
        <h2>Learn what to practise next.</h2>
        <p className="hero-copy">
          We are building a system that connects your problem-solving history to DSA concepts,
          finds likely learning gaps, and recommends a meaningful next step.
        </p>
      </section>

      <section className="connection-card" aria-labelledby="connection-title">
        <div className="card-heading">
          <div>
            <p className="eyebrow">DEVELOPMENT CHECK</p>
            <h3 id="connection-title">Backend connection</h3>
          </div>
          <span className={`status-dot ${apiState.kind}`} aria-hidden="true" />
        </div>

        {apiState.kind === 'checking' && (
          <p className="status-copy" role="status">Checking the API health endpoint…</p>
        )}
        {apiState.kind === 'connected' && (
          <div className="result-block success" role="status">
            <strong>Connected</strong>
            <span>{apiState.service} responded successfully.</span>
          </div>
        )}
        {apiState.kind === 'error' && (
          <div className="result-block failure" role="status">
            <strong>Could not connect</strong>
            <span>{apiState.message}</span>
            <span className="hint">Start the Go API on port 8080, then try again.</span>
          </div>
        )}

        <div className="card-footer">
          <code>GET {API_BASE_URL}/health</code>
          <button type="button" onClick={() => void checkApi()} disabled={apiState.kind === 'checking'}>
            {apiState.kind === 'checking' ? 'Checking…' : 'Check again'}
          </button>
        </div>
      </section>

      <section className="next-section" aria-labelledby="next-title">
        <p className="eyebrow">WHAT COMES NEXT</p>
        <h3 id="next-title">Our first vertical slice</h3>
        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <h4>Concepts</h4>
            <p>Represent DSA topics and prerequisite relationships.</p>
          </article>
          <article className="step-card">
            <span className="step-number">02</span>
            <h4>Questions</h4>
            <p>Connect each practice question to the concepts it tests.</p>
          </article>
          <article className="step-card">
            <span className="step-number">03</span>
            <h4>Evidence</h4>
            <p>Use attempts to build a learner-specific performance profile.</p>
          </article>
        </div>
      </section>

      <footer className="page-footer">
        <span>Learning Gap Detection Engine</span>
        <span>Small increments. Tested decisions.</span>
      </footer>
    </main>
  );
}
