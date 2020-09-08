package com.desousadylan.todo.network

import android.content.Context
import android.preference.PreferenceManager
import androidx.core.content.edit
import com.desousadylan.todo.SHARED_PREF_TOKEN_KEY
import com.desousadylan.todo.taskList.TasksWebService
import com.desousadylan.todo.userInfo.UserWebService
import com.squareup.moshi.Moshi
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

class Api(private val context: Context) {
    companion object {
        private const val BASE_URL = "https://android-tasks-api.herokuapp.com/api/"
        //private const val TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMjAsImV4cCI6MTYxMzA1MDM3Nn0.kJtjdL83JR4eVqqO6MAn8YIsN9ff9eLkKtU9AwQdV-g"
        lateinit var INSTANCE: Api
    }

    private val moshi = Moshi.Builder().build()
    private val okHttpClient by lazy {
        OkHttpClient.Builder()
            .addInterceptor { chain ->
                val newRequest = chain.request().newBuilder()
                    .addHeader("Authorization", "Bearer ${getToken()}")
                    .build()
                chain.proceed(newRequest)
            }
            .build()
    }

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()

    fun getToken(): String? {
        return PreferenceManager.getDefaultSharedPreferences(context).getString(SHARED_PREF_TOKEN_KEY, "")
    }

    fun removeToken(){
        PreferenceManager.getDefaultSharedPreferences(context).edit {
            remove(SHARED_PREF_TOKEN_KEY)
        }
    }

    val userWebService: UserWebService by lazy { retrofit.create(UserWebService::class.java) }
    val tasksWebService: TasksWebService by lazy { retrofit.create(
        TasksWebService::class.java)
    }
}

/*object Api {
    private const val BASE_URL = "https://android-tasks-api.herokuapp.com/api/"
    private const val TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMjAsImV4cCI6MTYxMzA1MDM3Nn0.kJtjdL83JR4eVqqO6MAn8YIsN9ff9eLkKtU9AwQdV-g"

    private val moshi = Moshi.Builder().build()
    private val okHttpClient by lazy {
        OkHttpClient.Builder()
            .addInterceptor { chain ->
                val newRequest = chain.request().newBuilder()
                    .addHeader("Authorization", "Bearer $TOKEN")
                    .build()
                chain.proceed(newRequest)
            }
            .build()
    }

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()

    val userWebService: UserWebService by lazy { retrofit.create(UserWebService::class.java) }
    val tasksWebService: TasksWebService by lazy { retrofit.create(
        TasksWebService::class.java) }
}*/