import { observer } from "mobx-react-lite";
import { globalControllerStore } from "../store/counter";
import { Button, Select } from "antd";
import React from "react";
import { Preloader } from "./Preloader";

export const App = observer(() => {
  const isActive = globalControllerStore.waitForAnswer ? true : false;
  const [isLoader, setIsLoader] = React.useState(false);
  const selectDefaultValues = [
    {
      value: "1",
      label: "one",
    },
    {
      value: "2",
      label: "two",
    },
    {
      value: "3",
      label: "three",
    },
    {
      value: "4",
      label: "four",
    },
    {
      value: "5",
      label: "five",
    },
  ];
  const [mainSelectValues, setMainSelectValues] =
    React.useState(selectDefaultValues);

  const [minorSelectValues, setMinorSelectValues] =
    React.useState(selectDefaultValues);

  const filterSelectValues = (value) => {
    return selectDefaultValues.filter((el) => el.value !== value);
  };

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

      <Select
        disabled={isActive}
        defaultValue="one"
        onChange={(value) => {
          imitateRequest(1500);
          setMinorSelectValues(filterSelectValues(value));
        }}
        options={mainSelectValues}
      />

      <Select
        disabled={isActive}
        defaultValue="one"
        onChange={(value) => {
          imitateRequest(1500);
          setMainSelectValues(filterSelectValues(value));
        }}
        options={minorSelectValues}
      />

      {isLoader ? <Preloader /> : null}
    </div>
  );
});
