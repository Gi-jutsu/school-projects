package com.desousadylan.todo.task

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import com.desousadylan.todo.R
import com.desousadylan.todo.data.Task
import com.desousadylan.todo.databinding.ActivityTaskBinding
import kotlinx.android.synthetic.main.activity_task.*
import java.io.Serializable
import java.util.*

class TaskActivity : AppCompatActivity() {
    companion object {
        val TASK_KEY = "TASK"
    }

    private lateinit var binding : ActivityTaskBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_task)

        when (intent?.action) {
            Intent.ACTION_SEND -> {
                if (intent.type == "text/plain") {
                    handleSendText(intent)
                }
            }

            else -> {
                binding.apply {
                    val task = intent.getSerializableExtra(TASK_KEY) as? Task

                    editTitle.setText(task?.title)
                    editDescription.setText(task?.description)

                    buttonValidate.setOnClickListener {
                        val newTask = Task(
                            id = task?.id ?: UUID.randomUUID().toString(),
                            title = editTitle.text.toString(),
                            description = editDescription.text.toString()
                        )
                        intent.putExtra(TASK_KEY, newTask as Serializable)
                        setResult(Activity.RESULT_OK, intent)

                        finish()
                    }
                }
            }
        }
    }

    private fun handleSendText(intent: Intent) {
        intent.getStringExtra(Intent.EXTRA_TEXT)?.let { editDescription.setText(it) }
    }
}
