import { handleError, handleMessage } from "@/utils/toastify";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const userRegister = createAsyncThunk(
  "userRegister",
  async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      const { success, message, statusCode } = data;

      if (success) {
        handleMessage(message);
        // setTimeout(() => {
        //   navigate("/Login");
        // }, 1000);
      } else {
        handleError(message);
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      }

      // handleMessage(message)

      console.log(data.success, data.message)
    } catch (error) {
      // handleError(error.message);
      console.log(error.message)
    }
  }
);

// export const userLogin = createAsyncThunk("userLogin", async (user) => {
//   try {
//     const response = await fetch("http://localhost:4000/api/v1/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });

//     const data = await response.json();
//     const { success, message, statusCode } = data;

//     if (success) {
//       return data;
//     } else {
//       handleError(message);
//     }
//   } catch (error) {
//     handleError(error.message);
//   }
// });


// export const userLogout = createAsyncThunk("userLogout", async () => {
//     const response = await fetch("http://localhost:4000/api/v1/user/logout");
//     const data = await response.json();
//     const { success, message, statusCode } = data;

//     if (success) {
//       return data;
//     } else {
//       handleError(message);
//     }
// });

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {},

  extraReducers: (builder) => {
  //   builder.addCase(userLogin.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //   });
  // },

  // extraReducers: (builder) => {
  //   builder.addCase(userLogout.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //   });
  },
});


export const {} = userSlice.actions;
export default userSlice.reducer;
