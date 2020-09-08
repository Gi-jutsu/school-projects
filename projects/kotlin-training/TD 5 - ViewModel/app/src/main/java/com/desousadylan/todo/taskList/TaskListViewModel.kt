package com.desousadylan.todo.taskList

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.desousadylan.todo.data.Task
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch

class TaskListViewModel: ViewModel() {
    private val viewModelScope = MainScope()

    private val repository = TasksRepository()
    private val _taskList = MutableLiveData<List<Task>>()
    val taskList: LiveData<List<Task>> = _taskList

    fun loadTasks() {
        viewModelScope.launch {
            _taskList.postValue(repository.loadTasks())
        }
    }

    fun addTask(task: Task) {
        viewModelScope.launch {
            if (repository.createTask(task)) {
                val currentTaskList = _taskList.value?.toMutableList()

                currentTaskList?.add(task)

                _taskList.value = currentTaskList
            }
        }
    }

    fun editTask(task: Task) {
        viewModelScope.launch {
            if (repository.updateTask(task)) {
                val currentTaskList = _taskList.value?.toMutableList()
                val index = currentTaskList?.indexOfFirst { it.id == task.id }

                if (index != null) {
                    currentTaskList?.set(index, task)
                }

                _taskList.value = currentTaskList
            }
        }
    }

    fun removeTask(task: Task) {
        viewModelScope.launch {
            if (repository.removeTask(task)) {
                val currentTaskList = _taskList.value?.toMutableList()

                currentTaskList?.remove(task)

                _taskList.value = currentTaskList
            }
        }
    }
}