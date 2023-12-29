import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk("auth/signupUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/user/signup", userData);
    return response.data.body; // Retourne les données de l'utilisateur
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/user/login", {
      email,
      password,
    });
    return response.data.body.token;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    console.error("Erreur lors de la requête : ", error.response);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.put("http://localhost:3001/api/v1/user/profile", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const initialState = {
  token: null,
  status: "idle",
  error: null,
  user: null, // Pour stocker les informations de l'utilisateur
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession: (state, action) => {
      state.token = action.payload;
      // Mettre à jour tout autre état nécessaire
    },
    // Reducer pour la déconnexion
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        // Gérez la réussite de l'inscription ici, par exemple en mettant à jour l'état
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        // Gérez l'échec de l'inscription ici
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Stockez les informations de l'utilisateur ici
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Mettez à jour l'état avec les nouvelles informations de l'utilisateur
      });
    // Gérez les cas 'pending' et 'rejected' si nécessaire
  },
});

export const { restoreSession } = authSlice.actions;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
