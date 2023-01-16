import { createSlice } from '@reduxjs/toolkit';
import { get_user_profile, update_user_profile } from '../services/profile/profile.service';

const initialState = {
  profile: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_user_profile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(get_user_profile.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.profile = action.payload.profile;
        }
      })
      .addCase(get_user_profile.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
      })
      .addCase(update_user_profile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(update_user_profile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profile = action.payload;
      })
      .addCase(update_user_profile.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
      })
  }
})

const { reducer } = profileSlice;
export default reducer;
