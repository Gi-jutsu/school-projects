package com.desousadylan.todo.task


import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
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
        ViewModelProvider(this).get(TaskListViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_task, container, false)

        handleArgsReceived()

        return binding.root
    }

    private fun handleArgsReceived() {
        val task = args.task

        binding.apply {
            editTitle.setText(task?.title)
            editDescription.setText(task?.description)

            buttonValidate.setOnClickListener {
                val newTask = Task(
                    id = task?.id ?: UUID.randomUUID().toString(),
                    title = editTitle.text.toString(),
                    description = editDescription.text.toString()
                )

                if (task == null) {
                    taskListViewModel.addTask(newTask)
                } else {
                    taskListViewModel.editTask(newTask)
                }

                findNavController().navigate(R.id.returnToTaskList)
            }
        }
    }
}
