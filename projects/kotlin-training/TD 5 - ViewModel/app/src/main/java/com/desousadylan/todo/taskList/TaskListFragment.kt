package com.desousadylan.todo.taskList

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.desousadylan.todo.R
import com.desousadylan.todo.data.Task
import com.desousadylan.todo.databinding.FragmentTaskListBinding
import com.desousadylan.todo.network.Api
import com.desousadylan.todo.task.TaskActivity
import kotlinx.android.synthetic.main.fragment_task_list.*
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import java.io.Serializable

const val ADD_TASK_REQUEST_CODE = 1
const val EDIT_TASK_REQUEST_CODE = 2

class TaskListFragment : Fragment() {
    private lateinit var binding: FragmentTaskListBinding
    val adapter = TaskListAdapter()

    private val viewModel by lazy {
        ViewModelProvider(this).get(TaskListViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_task_list, container, false)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel.taskList.observe(this, Observer { newList ->
            adapter.list = newList.orEmpty()
            //adapter.notifyDataSetChanged()
        })

        val layoutManager = LinearLayoutManager(this.context)
        binding.apply {
            recyclerView.layoutManager = layoutManager
            recyclerView.adapter = adapter

            adapter.onDeleteClickListener = { task ->
                viewModel.removeTask(task)
            }

            adapter.onEditClickListAdapter = { task ->
                val editTaskIntent = Intent(view.context, TaskActivity::class.java)

                editTaskIntent.putExtra(TaskActivity.TASK_KEY, task as Serializable)

                startActivityForResult(
                    editTaskIntent,
                    EDIT_TASK_REQUEST_CODE
                )
            }

            floatingActionButton.setOnClickListener {
                val addTaskIntent = Intent(view.context, TaskActivity::class.java)

                startActivityForResult(addTaskIntent,
                    ADD_TASK_REQUEST_CODE
                )
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        binding.apply {
            val task = data!!.getSerializableExtra(TaskActivity.TASK_KEY) as Task

            when(requestCode) {
                ADD_TASK_REQUEST_CODE -> {
                    viewModel.addTask(task)
                }

                EDIT_TASK_REQUEST_CODE -> {
                    viewModel.editTask(task)
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()

        viewModel.loadTasks()
    }
}