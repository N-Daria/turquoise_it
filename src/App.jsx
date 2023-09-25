import { observer } from "mobx-react-lite";
import { globalControllerStore } from "./store/counter";

export const App = observer(() => {
  const isActive = globalControllerStore.waitForAnswer ? true : false;

  const imitateRequest = (timeout) => {
    globalControllerStore.startRequest();

    setTimeout(() => {
      globalControllerStore.stopRequest();
    }, timeout);
  };

  return (
    <div className="App">
      <button disabled={isActive} onClick={() => imitateRequest(3000)}>
        block interactive elements for 3 sec
      </button>

      <button disabled={isActive} onClick={() => imitateRequest(4000)}>
        block interactive elements for 4 sec & show preloader
      </button>

      {/* 2 selects */}
    </div>
  );
});
