import { observer } from "mobx-react-lite";
import { globalControllerStore } from "../store/counter";
import { Button, Select } from "antd";
import React from "react";
import { Preloader } from "./Preloader";

export const App = observer(() => {
  const isActive = globalControllerStore.waitForAnswer ? true : false;
  const [isLoader, setIsLoader] = React.useState(false);

  const imitateRequest = (timeout) => {
    globalControllerStore.startRequest();

    setTimeout(() => {
      globalControllerStore.stopRequest();
      setIsLoader(false);
    }, timeout);
  };

  return (
    <div className="app">
      <Button disabled={isActive} onClick={() => imitateRequest(3000)}>
        block interactive elements for 3 sec
      </Button>

      <Button
        disabled={isActive}
        onClick={() => {
          setIsLoader(true);
          imitateRequest(4000);
        }}
      >
        block interactive elements for 4 sec & show preloader
      </Button>

      <Select></Select>
      {/* 2 selects */}

      {isLoader ? <Preloader /> : null}
    </div>
  );
});
