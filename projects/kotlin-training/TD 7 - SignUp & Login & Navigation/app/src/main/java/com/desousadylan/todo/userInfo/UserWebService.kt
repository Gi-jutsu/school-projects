package com.desousadylan.todo.userInfo

import com.desousadylan.todo.data.LoginForm
import com.desousadylan.todo.data.LoginResponse
import com.desousadylan.todo.data.SignUpForm
import com.desousadylan.todo.network.UserInfo
import okhttp3.MultipartBody
import retrofit2.Response
import retrofit2.http.*

interface UserWebService {
    @POST("users/login")
    suspend fun login(@Body user: LoginForm): Response<LoginResponse>

    @POST("users/sign_up")
    suspend fun signUp(@Body user: SignUpForm): Response<LoginResponse>

    @GET("users/info")
    suspend fun getInfos(): Response<UserInfo>

    @PATCH("users")
    suspend fun update(@Body user: UserInfo): Response<UserInfo>

    @Multipart
    @PATCH("users/update_avatar")
    suspend fun updateAvatar(@Part avatar: MultipartBody.Part): Response<UserInfo>
}