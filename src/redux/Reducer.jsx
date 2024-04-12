import { createSlice } from "@reduxjs/toolkit";
import { login, vetificationemail, register } from "./API/UserAPI";



const initialState = {
    user: null,
    modalcart: false,
    modalOrderSuccess: false



};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        Updatemodalcart: (state, action) => {
            state.modalcart = action.payload;
        },
        UpdatemodalOrderSuccess: (state, action) => {
            state.modalOrderSuccess = action.payload;
        },
        savecart: (state, action) => {
            state.user.carts = action.payload;
            console.log("savecart")
        },
        addOrder: (state, action) => {
            state.user.notification = [...state.user.notification, action.payload]

        },
        logout: (state, action) => {
            state.user = null;
        },
        updateaddress: (state, action) => {
            state.user.address = action.payload;
        },
        updatephone: (state, action) => {
            state.user.phone = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                console.log("login pending");
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                console.log("login rejected");
            })
            //------------------------------- check email
            .addCase(vetificationemail.pending, (state, action) => {
                console.log("vetification pending");
            })
            .addCase(vetificationemail.fulfilled, (state, action) => {
                console.log("Vetification success")
            })
            .addCase(vetificationemail.rejected, (state, action) => {
                console.log("vetificationemail rejected");
            })
            //--------------------------------- đăng ký
            .addCase(register.pending, (state, action) => {
                console.log("register pending");
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                console.log("register rejected");
            })
        //------------------------------------
    }
});
export const { Updatemodalcart, savecart, UpdatemodalOrderSuccess, addOrder, logout,updateaddress,updatephone } = appSlice.actions;
export default appSlice.reducer;

