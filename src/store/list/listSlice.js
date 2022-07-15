import axios from "axios";
import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit'
// createAsyncThunk : Thunk 비동기 작업
export const getList = createAsyncThunk(
    "GET_LIST",
    async () => {
        try{
            const res =await axios.get("https://my-json-server.typicode.com/joyeajin/react15-main-/list");
            return res.data;
        }catch(err){
            console.log(err)
        }
    }
)

export const addList = createAsyncThunk(
    "ADD_LIST",
    async (newList) => {
        try{
            const res =await axios.post(`https://my-json-server.typicode.com/joyeajin/react15-main-/list`, newList);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

)

export const  deleteList = createAsyncThunk(
    "DELETE_LIST",
    async (id) => {
        try{
            const res =await axios.delete(`https://my-json-server.typicode.com/joyeajin/react15-main-/list/${id}`);
            return id;
        }catch(err){
            console.log(err)
        }
    }

)

export const  updateList = createAsyncThunk(
    "UPDATE_LIST",
    async ({ id, content }) => {
        try {
            const res  = await axios.put(`https://my-json-server.typicode.com/joyeajin/react15-main-/list/${id}`,{
                content:content,
            });
            return {id,content};
        }catch(err){
            console.log(err)
        }
    }

)

const listSlice =  createSlice({
    name: 'list',
    initialState:{
      data:[],
      message:'default'
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getList.fulfilled, (state,action)=>{
            state.message = '리스트업 완료';
            state.data = action.payload;
          })
          builder.addCase(addList.fulfilled, (state,action)=>{
            state.message = '추가 완료';
            state.data.push(action.payload);
          })
          builder.addCase(deleteList.fulfilled, (state,action)=>{
            state.message = '삭제 완료';
            state.data=state.data.filter((ele)=>ele.id !== action.payload)
          })
          builder.addCase(updateList.fulfilled, (state,action)=>{
            state.message = '수정 완료';
            const idx =state.data.findIndex((ele)=>ele.id === action.payload.id)
            state.data.splice(idx,1,action.payload)
            
          })
    }
})


export default listSlice.reducer