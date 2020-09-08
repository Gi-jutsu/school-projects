package com.desousadylan.todo

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.desousadylan.todo.databinding.FragmentTaskListBinding
import com.desousadylan.todo.task.TaskActivity
import java.io.Serializable

const val ADD_TASK_REQUEST_CODE = 1
const val EDIT_TASK_REQUEST_CODE = 2

const val BUNDLE_TASK_LIST_KEY = "TASK_LIST"

class TaskListFragment : Fragment() {
    private var taskList = mutableListOf(
        Task(id = "id_1", title = "New Task 1", description = "description 1"),
        Task(id = "id_2", title = "New Task 2"),
        Task(id = "id_3", title = "New Task 3")
    )
    private lateinit var binding: FragmentTaskListBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_task_list, container, false)

        val any = savedInstanceState?.getParcelableArrayList<Task>(BUNDLE_TASK_LIST_KEY)
        if (any != null) {
            taskList = any.toMutableList()
        }

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val viewManager = LinearLayoutManager(this.context)
        val viewAdapter = TaskListAdapter(taskList)

        binding.apply {
            recyclerView.layoutManager = viewManager
            recyclerView.adapter = viewAdapter

            viewAdapter.onDeleteClickListener = { task ->
                taskList.remove(task)
                viewAdapter.notifyDataSetChanged()
            }

            viewAdapter.onEditClickListAdapter = { task ->
                val editTaskIntent = Intent(view.context, TaskActivity::class.java)

                editTaskIntent.putExtra(TaskActivity.TASK_KEY, task as Serializable)

                startActivityForResult(editTaskIntent, EDIT_TASK_REQUEST_CODE)
            }

            floatingActionButton.setOnClickListener {
                val addTaskIntent = Intent(view.context, TaskActivity::class.java)

                startActivityForResult(addTaskIntent, ADD_TASK_REQUEST_CODE)
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        binding.apply {
            val task = data!!.getSerializableExtra(TaskActivity.TASK_KEY) as Task

            when(requestCode) {
                EDIT_TASK_REQUEST_CODE -> {
                    val index = taskList.indexOfFirst { it.id == task.id }

                    Log.i("Task", taskList.toString())
                    Log.i("Task", "${task.id} ${task.title} ${task.description}")

                    taskList[index] = task

                    recyclerView.adapter?.notifyItemChanged(index)
                }

                ADD_TASK_REQUEST_CODE -> {
                    taskList.add(task)

                    recyclerView.adapter?.notifyItemInserted(taskList.size)
                }
            }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)

        outState.putParcelableArrayList(BUNDLE_TASK_LIST_KEY, ArrayList(taskList))
    }
}