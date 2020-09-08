package com.desousadylan.todo.taskList

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.desousadylan.todo.data.Task
import com.desousadylan.todo.network.Api
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch

class TasksRepository {
    private val tasksWebService = Api.tasksWebService
    //private val coroutineScope = MainScope()

    suspend fun loadTasks(): List<Task>? {
        val response = tasksWebService.getTasks()
        return if (response.isSuccessful) response.body() else null
    }

    suspend fun removeTask(task: Task): Boolean{
        val response = tasksWebService.removeTask(task.id)
        return response.isSuccessful
    }

    suspend fun createTask(task: Task): Boolean {
        val response = tasksWebService.createTask(task)
        return response.isSuccessful
    }

    suspend fun updateTask(task: Task): Boolean {
        val response = tasksWebService.updateTask(task, task.id)
        return response.isSuccessful
    }

    /*fun getTasks(): LiveData<List<Task>?> {
        val tasks = MutableLiveData<List<Task>?>()
        coroutineScope.launch { tasks.postValue(loadTasks()) }
        return tasks
    }

    fun deleteTask(id: String): MutableLiveData<Boolean> {
         val response = MutableLiveData<Boolean>()
         coroutineScope.launch {
             response.postValue(tasksWebService.deleteTask(id).isSuccessful)
         }
         return response
    }*/
}