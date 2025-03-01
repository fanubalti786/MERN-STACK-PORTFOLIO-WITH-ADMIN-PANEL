import { handleError, handleMessage } from "@/utils/toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserPortfolio = createAsyncThunk(
  "fetchUserPortfolio",
  async ()=> 
  {
    try {

    const response = await fetch("http://localhost:4000/api/v1/user/me/portfolio");
    const data = await response.json();
    const {success, statusCode, message} = data;
    if(success)
    {
      handleMessage(message);
      return data;
  
    }
    else{
      handleError(message);
    }

    } catch (error) {
      handleError(error.message);
    }
    
  }
);


export const fetchTimeLines = createAsyncThunk(
  "fetchTiemLines",
  async ()=> 
  {
    try {

    const response = await fetch("http://localhost:4000/api/v1/timeLine/getAll");
    const data = await response.json();
    const {success, statusCode, message} = data;
    if(success)
    {
      handleMessage(message);
      return data;
  
    }
    else{
      handleError(message);
    }

    } catch (error) {
      handleError(error.message);
    }
    
  }
);



export const fetchSkills = createAsyncThunk(
  "fetchSkills",
  async ()=> 
  {
    try {

    const response = await fetch("http://localhost:4000/api/v1/skill/getAll");
    const data = await response.json();
    const {success, statusCode, message} = data;
    if(success)
    {
      handleMessage(message);
      return data;
  
    }
    else{
      handleError(message);
    }

    } catch (error) {
      handleError(error.message);
    }
    
  }
);




export const fetchApplications = createAsyncThunk(
  "fetchApplications",
  async ()=> 
  {
    try {

    const response = await fetch("http://localhost:4000/api/v1/application/getAll");
    const data = await response.json();
    const {success, statusCode, message} = data;
    if(success)
    {
      handleMessage(message);
      return data;
  
    }
    else{
      handleError(message);
    }

    } catch (error) {
      handleError(error.message);
    }
    
  }
);


export const fetchProjects = createAsyncThunk(
  "fetchProjects",
  async ()=> 
  {
    try {

    const response = await fetch("http://localhost:4000/api/v1/project/getAll");
    const data = await response.json();
    const {success, statusCode, message} = data;
    if(success)
    {
      handleMessage(message);
      return data;
  
    }
    else{
      handleError(message);
    }

    } catch (error) {
      handleError(error.message);
    }
    
  }
);


export const userPortfolioSlice = createSlice({
    name: "user",
    initialState: {
      userPortfolio: null,
      timeLines: null,
      skills: null,
      applications: null,
      projects: null,
    },
    reducers: {
    },

    extraReducers: builder => {
      builder.addCase(fetchUserPortfolio.fulfilled, (state, action) => 
      {

        console.log("extraReducer call don");
        state.userPortfolio = action.payload;

      },)

      builder.addCase(fetchTimeLines.fulfilled, (state, action) => 
        {
  
          console.log("extraReducer call don");
          state.timeLines = action.payload;
  
        },)


        builder.addCase(fetchSkills.fulfilled, (state, action) => 
          {
    
            console.log("extraReducer call don");
            state.skills = action.payload;
    
          },)


        
          builder.addCase(fetchApplications.fulfilled, (state, action) => 
            {
      
              console.log("extraReducer call don");
              state.applications = action.payload;
      
            },)

          
            builder.addCase(fetchProjects.fulfilled, (state, action) => 
              {
        
                console.log("extraReducer call don");
                state.projects = action.payload;
        
              },)

      
    
    }

    
  });

  export const {} = userPortfolioSlice.actions;
  export default userPortfolioSlice.reducer;