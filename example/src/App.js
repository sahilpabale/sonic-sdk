import { User, Connect } from '@0xsonic/sdk';

function App() {
  return (
    <div className="App">
      <h1>0xSonic SDK Example</h1>
      <User /> // Displays the user's address
      <Connect /> // Connects the user's wallet
    </div>
  );
}

export default App;
