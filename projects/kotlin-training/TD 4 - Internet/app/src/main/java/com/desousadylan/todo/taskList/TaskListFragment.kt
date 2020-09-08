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

const val BUNDLE_TASK_LIST_KEY = "TASK_LIST"

class TaskListFragment : Fragment() {
    private val tasksRepository = TasksRepository()
    private var tasks = mutableListOf<Task>()

    /*private var taskList = mutableListOf(
        Task(id = "id_1", title = "New Task 1", description = "description 1"),
        Task(id = "id_2", title = "New Task 2"),
        Task(id = "id_3", title = "New Task 3")
    )*/
    private lateinit var binding: FragmentTaskListBinding

    private val coroutineScope = MainScope()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_task_list, container, false)

        val any = savedInstanceState?.getParcelableArrayList<Task>(BUNDLE_TASK_LIST_KEY)
        if (any != null) {
            tasks = any.toMutableList()
        }

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val viewManager = LinearLayoutManager(this.context)
        val viewAdapter = TaskListAdapter(tasks)

        binding.apply {
            recyclerView.layoutManager = viewManager
            recyclerView.adapter = viewAdapter

            viewAdapter.onDeleteClickListener = { task ->
                tasksRepository.deleteTask(task.id).observe(this@TaskListFragment, Observer { success ->
                    if (success) {
                        tasks.remove(task)
                        viewAdapter.notifyDataSetChanged()
                    }
                })
            }

            viewAdapter.onEditClickListAdapter = { task ->
                val editTaskIntent = Intent(view.context, TaskActivity::class.java)

                editTaskIntent.putExtra(TaskActivity.TASK_KEY, task as Serializable)

                startActivityForResult(editTaskIntent,
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
                EDIT_TASK_REQUEST_CODE -> {
                    val index = tasks.indexOfFirst { it.id == task.id }

                    tasks[index] = task

                    recyclerView.adapter?.notifyItemChanged(index)
                }

                ADD_TASK_REQUEST_CODE -> {
                    tasks.add(task)

                    recyclerView.adapter?.notifyItemInserted(tasks.size)
                }
            }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)

        outState.putParcelableArrayList(BUNDLE_TASK_LIST_KEY, ArrayList(tasks))
    }

    override fun onResume() {
        super.onResume()

        binding.apply {

            tasksRepository.getTasks().observe(this@TaskListFragment, Observer {
                if (it != null) {
                    tasks.clear()
                    tasks.addAll(it)
                    recyclerView.adapter?.notifyDataSetChanged()
                }
            })

            coroutineScope.launch {
                val userInfo = Api.userService.getInfo().body()!!

                my_text_view.text = "${userInfo.firstName} ${userInfo.lastName}"
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()

        coroutineScope.cancel()
    }
}