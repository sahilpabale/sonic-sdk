import { User, Connect, Sonic } from '@0xsonic/sdk';

function App() {
  return (
    <div className="App">
      <h1>0xSonic SDK Example</h1>
      <User />
      <Connect />

      <Sonic context="sahil" />
    </div>
  );
}

export default App;
