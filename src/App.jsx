import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MFESentry } from 'mfe-sentry'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MyErrorBoundaryExample from './MyErrorBoundaryExample'

MFESentry.createClient({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [new BrowserTracing()],
  transport: makeFetchTransport,
  stackParser: defaultStackParser,
  tracesSampleRate: 1.0,
})

class MyErrorBoundaryExample extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI.
    return { error: error };
  }

  componentDidCatch(error) {
    MFESentry.captureExecption(error)
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <p>Something broke</p>;
    }
    return this.props.children;
  }
}

export default MyErrorBoundaryExample

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyErrorBoundaryExample>
      <App />
    </MyErrorBoundaryExample>
  </React.StrictMode>
);
//To catch async functions’ errors, You need to set a listener to unhandledrejection event:

/// App.ts

useEffect(() => {
    window.addEventListener(
      'unhandledrejection',
      MFESentry.handleUnhandledRejection,
    )

    return () => {
      window.removeEventListener(
        'unhandledrejection',
        MFESentry.handleUnhandledRejection,
      )
    }
},
[])




















/*function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
