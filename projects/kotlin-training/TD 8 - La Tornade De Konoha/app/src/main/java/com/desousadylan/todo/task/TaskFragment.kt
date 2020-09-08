package com.desousadylan.todo.task


import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.ViewModelStoreOwner
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs

import com.desousadylan.todo.R
import com.desousadylan.todo.data.Task
import com.desousadylan.todo.databinding.ActivityTaskBinding
import com.desousadylan.todo.databinding.FragmentTaskBinding
import com.desousadylan.todo.taskList.TaskListViewModel
import java.util.*

class TaskFragment : Fragment() {
    private lateinit var binding : FragmentTaskBinding
    private val args: TaskFragmentArgs by navArgs()
    private val taskListViewModel by lazy {
        ViewModelProvider(activity as AppCompatActivity).get(TaskListViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_task, container, false)

        taskListViewModel.taskList.observe(this, androidx.lifecycle.Observer {
            if (it != null) handleArgsReceived()
        })

        return binding.root
    }

    private fun handleArgsReceived() {
        val task = taskListViewModel.taskList.value?.find { it.id == args.id }

        binding.apply {
            editTitle.setText(task?.title)
            editDescription.setText(task?.description)

            buttonValidate.setOnClickListener {
                val newTask = Task(
                    id = task?.id ?: UUID.randomUUID().toString(),
                    title = editTitle.text.toString(),
                    description = editDescription.text.toString()
                )

                taskListViewModel.apply { if (task == null) addTask(newTask) else editTask(newTask) }

                findNavController().navigate(R.id.returnToTaskList)
            }
        }
    }
}
