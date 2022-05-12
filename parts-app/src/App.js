import './App.css';
import Main from './components/main/Main';
import MessengerCustomerChat from 'react-messenger-customer-chat';
function App() {
  return (
    <div className="App">
      <Main/>
      <MessengerCustomerChat
    pageId="<109519938273529>"
    appId="<234234>"
  />
    </div>
  );
}

export default App;
