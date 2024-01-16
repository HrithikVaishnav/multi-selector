import './App.css';
import MultiSelect from './components/MultiSelect';
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <div>
      <MultiSelect />
      <Analytics />
    </div>
  );
}

export default App;
