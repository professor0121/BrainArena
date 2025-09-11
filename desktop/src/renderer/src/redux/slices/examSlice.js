import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { SERVICES } from "../../api/services";


export const createExam = createAsyncThunk(
  "exam/createExam",
  async (examData, { rejectWithValue }) => {
  
    try {
      const response = await axiosInstance.post(`/exams`, examData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const initialState = {  
  exams: [],
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examSlice.reducer;
