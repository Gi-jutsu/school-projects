package com.desousadylan.todo.userInfo

import android.util.Log
import com.desousadylan.todo.data.LoginForm
import com.desousadylan.todo.data.LoginResponse
import com.desousadylan.todo.data.SignUpForm
import com.desousadylan.todo.network.Api
import com.desousadylan.todo.network.UserInfo
import okhttp3.MultipartBody

class UserInfoRepository {
    private val userWebService = Api.INSTANCE.userWebService

    suspend fun login(user: LoginForm): LoginResponse? {
        val response = userWebService.login(user)

        return if (response.isSuccessful) response.body() else null
    }

    suspend fun signUp(user: SignUpForm): LoginResponse? {
        val response = userWebService.signUp(user)

        return if (response.isSuccessful) response.body() else null
    }

    suspend fun update(user: UserInfo): Boolean {
        val response = userWebService.update(user)
        return response.isSuccessful
    }

    suspend fun getInfos(): UserInfo? {
        val response = userWebService.getInfos()

        return if (response.isSuccessful) response.body() else null
    }

    suspend fun updateAvatar(avatar: MultipartBody.Part): Boolean {
        val response = userWebService.updateAvatar(avatar)
        return response.isSuccessful
    }
}