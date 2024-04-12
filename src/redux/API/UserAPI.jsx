import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../helpers/AxiosInstance";


//API LOGIN
export const login = createAsyncThunk(
    "users/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("users/login", data);
            if (response.status == true) {
                // console.log(response);
                return response.data;
            } else {
                console.log("Bạn chưa có tài khoản")
            }
        } catch (error) {
            console.log("lõi login"+error)
            return rejectWithValue(error)
            
        }
    }
)
//API XÁC THUC EMAIL
export const vetificationemail = createAsyncThunk(
    "users/register/vetification",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("users/register/vetification", data);
            if (response.status == true) {
                return true;
            } else {
                return rejectWithValue(error);
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

// API ĐĂNG KÝ
export const register = createAsyncThunk(
    "users/register",
    async (code, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("users/register?code=" + code);
            if (response.status == true) {
                // console.log(response);
                return response.data;
            } else {
                return rejectWithValue(error);
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)




