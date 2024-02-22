import { useState } from "react";
import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import OwnBtn from "./components/OwnBtn";
let items = ["london", "the name shall", "not", "be", "named"];

const handleSelectItem = (item: string) => {
  console.log(item);
};

function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert
          state="primary"
          onClose={() => {
            setAlertVisible(false);
          }}
        >
          Hekki
        </Alert>
      )}
      <OwnBtn
        color="danger"
        onClick={() => {
          setAlertVisible(true);
        }}
      >
        Hello there!
      </OwnBtn>
    </div>
  );
}

export default App;
