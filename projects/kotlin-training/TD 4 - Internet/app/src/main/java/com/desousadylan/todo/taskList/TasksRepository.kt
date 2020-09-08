package com.desousadylan.todo.taskList

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.desousadylan.todo.data.Task
import com.desousadylan.todo.network.Api
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch

class TasksRepository {
    private val tasksWebService = Api.tasksWebService
    private val coroutineScope = MainScope()

    fun getTasks(): LiveData<List<Task>?> {
        val tasks = MutableLiveData<List<Task>?>()
        coroutineScope.launch { tasks.postValue(loadTasks()) }
        return tasks
    }

    private suspend fun loadTasks(): List<Task>? {
        val tasksResponse = tasksWebService.getTasks()
        return if (tasksResponse.isSuccessful) tasksResponse.body() else null
    }

    fun deleteTask(id: String): MutableLiveData<Boolean> {
         val response = MutableLiveData<Boolean>()
         coroutineScope.launch {
             response.postValue(tasksWebService.deleteTask(id).isSuccessful)
         }
         return response
    }
}