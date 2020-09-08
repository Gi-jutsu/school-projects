package com.desousadylan.todo.taskList

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.desousadylan.todo.R
import com.desousadylan.todo.data.Task
import kotlinx.android.synthetic.main.item_task.view.*
import kotlin.properties.Delegates

class TaskListAdapter:
    RecyclerView.Adapter<TaskListAdapter.TaskViewHolder>() {

    var list: List<Task> by Delegates.observable(emptyList()) { _, _, _ ->
        notifyDataSetChanged()
    }

    var onDeleteClickListener: (Task) -> Unit = { }
    var onEditClickListAdapter: (Task) -> Unit = { }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        holder.bind(list[position])
    }

    override fun getItemCount() = list.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_task, parent, false)

        return TaskViewHolder(itemView)
    }

    inner class TaskViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(task: Task) {
            itemView.delete_button.setOnClickListener {
                onDeleteClickListener.invoke(task)
            }

            itemView.edit_button.setOnClickListener {
                onEditClickListAdapter.invoke(task)
            }

            itemView.setOnLongClickListener {
                val sendIntent: Intent = Intent().apply {
                    action = Intent.ACTION_SEND
                    putExtra(Intent.EXTRA_TEXT, "Task Title: ${task.title}, Task Description: ${task.description}")
                    type = "text/plain"
                }

                val shareIntent = Intent.createChooser(sendIntent, "Share using :")

                it.context.startActivity(shareIntent)
                true
            }

            itemView.task_title.text = task.title
            itemView.task_description.text = task.description
        }
    }
}