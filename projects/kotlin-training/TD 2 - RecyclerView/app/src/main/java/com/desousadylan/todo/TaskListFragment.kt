package com.desousadylan.todo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.desousadylan.todo.databinding.FragmentTaskListBinding
import java.util.*

class TaskListFragment : Fragment() {
    private val taskList = mutableListOf(
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

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val viewManager = LinearLayoutManager(this.context)
        val viewAdapter = TaskListAdapter(taskList)
1
        binding.apply {
            recyclerView.layoutManager = viewManager
            recyclerView.adapter = viewAdapter

            floatingActionButton.setOnClickListener {
                val taskPosition = taskList.size
                val task = Task(id = UUID.randomUUID().toString(), title = "New Task ${taskPosition + 1}")

                taskList.add(taskPosition, task)

                viewAdapter.notifyItemInserted(taskPosition)
            }
        }
    }
}