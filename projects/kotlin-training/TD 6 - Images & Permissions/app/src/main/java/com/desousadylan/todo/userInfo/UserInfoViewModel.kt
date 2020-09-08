package com.desousadylan.todo.userInfo

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.desousadylan.todo.network.UserInfo
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import okhttp3.MultipartBody

class UserInfoViewModel: ViewModel() {
    private val viewModelScope = MainScope()

    private val repository = UserInfoRepository()
    private val _userInfo = MutableLiveData<UserInfo>()
    val userInfo: LiveData<UserInfo> = _userInfo

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