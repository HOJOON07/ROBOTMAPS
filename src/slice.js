import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const URL = "http://192.168.2.2:5000/api/v1";

const getData = { cmd: "getMaps" };
const setData = { cmd: "setMaps" };

const initialState = {};
// createAsyncThunk는 액션 타입 문자열과 프로미스를 반환하는 콜백 함수를 인자로 받아서 주어진 액션 타입을 접두어로 사용하는 프로미스 생명 주기 기반의 액션 타입을 생성합니다.
const get = createAsyncThunk("maps/get", async (_, thunkAPI) => {
  try {
    const getMaps = async () => {
      const response = await axios.post(URL, getData);
      console.log(response.data);
      return await response.data;
    };
    return await getMaps();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const set = createAsyncThunk("maps/set", async (body, thunkAPI) => {
  try {
    const setMaps = async (body) => {
      const response = await axios.post(URL, { ...setData, ...body });
      console.log(response.data);
      return await response.data;
    };
    return await setMaps(body);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const getMapImg = createAsyncThunk("maps/getMapImg", async (_, thunkAPI) => {
  try {
    const getMapImg = async () => {
      const response = await axios.post(URL, getData);
      console.log(response.data);
      return await response.data;
    };
    return await getMapImg();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const mapSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state) => {
      state.promise = "pending";
    });
    builder.addCase(get.fulfilled, (_, action) => {
      return { promise: "fulfilled", ...action.payload };
    });
    builder.addCase(get.rejected, (state, action) => {
      state.promise = "rejected";
      console.log(action.payload);
    });
    builder.addCase(getMapImg.pending, (state) => {
      state.promise = "pending";
    });
    builder.addCase(getMapImg.fulfilled, (state, action) => {
      state.promise = "fulfilled";
      state.img = action.payload.img;
    });
    builder.addCase(getMapImg.rejected, (state, action) => {
      state.promise = "rejected";
      console.log(action.payload);
    });
  },
});

export const mapActions = {
  get,
  set,
  getMapImg,
  ...mapSlice.actions,
};
export const mapsReducer = mapSlice.reducer;
