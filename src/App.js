import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "./slice";

function App() {
  const robotMaps = useSelector((state) => state.maps);

  const dispatch = useDispatch();
  return (
    <>
      <div>안녕</div>
      <button
        onClick={() => {
          dispatch(mapActions.get());
        }}
      >
        겟
      </button>
      <button
        onClick={() => {
          dispatch(mapActions.getMapImg());
        }}
      >
        이미지 겟
      </button>
      <button
        onClick={() => {
          dispatch(mapActions.getMapImg());
        }}
      >
        이미지 겟
      </button>
    </>
  );
}

export default App;
