package com.desousadylan.todo.userInfo

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.desousadylan.todo.data.LoginForm
import com.desousadylan.todo.data.SignUpForm
import com.desousadylan.todo.network.Api
import com.desousadylan.todo.network.UserInfo
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import okhttp3.MultipartBody

class UserInfoViewModel: ViewModel() {
    private val viewModelScope = MainScope()

    private val repository = UserInfoRepository()
    private val _userInfo = MutableLiveData<UserInfo>()
    private val _token = MutableLiveData<String?>()
    val userInfo: LiveData<UserInfo> = _userInfo
    val token: LiveData<String?> = _token

    fun login(user: LoginForm) {
        viewModelScope.launch {
            val response = repository.login(user)

            if (response != null) {
                _token.value = response.token
            } else {
                _token.value = null
            }
        }
    }

    fun signUp(user: SignUpForm) {
        viewModelScope.launch {
            val response = repository.signUp(user)

            if(response != null) {
                _token.value = response.token
            } else {
                _token.value = null
            }
        }
    }

    fun logout() {
        Api.INSTANCE.removeToken()
        _token.value = null
    }

    fun update(user: UserInfo) {
        viewModelScope.launch {
            if (repository.update(user)) {
                _userInfo.value = user
            }
        }
    }

    fun getInfos() {
        viewModelScope.launch {
            _userInfo.value = repository.getInfos()
        }
    }

    fun updateAvatar(avatar: MultipartBody.Part) {
        viewModelScope.launch {
            repository.updateAvatar(avatar)
        }
    }
}