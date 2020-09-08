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
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.desousadylan.todo.R
import com.desousadylan.todo.databinding.FragmentTaskListBinding
import com.desousadylan.todo.network.Api
import com.desousadylan.todo.userInfo.UserInfoActivity
import com.desousadylan.todo.userInfo.UserInfoViewModel
import kotlinx.android.synthetic.main.fragment_task_list.*

class TaskListFragment : Fragment() {
    private lateinit var binding: FragmentTaskListBinding
    val adapter = TaskListAdapter()

    private val viewModel by lazy {
        ViewModelProvider(this).get(TaskListViewModel::class.java)
    }

    private val viewModelUserInfo by lazy {
        ViewModelProvider(this).get(UserInfoViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_task_list, container, false)

        viewModelUserInfo.getInfos()

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        Glide.with(this).load("https://goo.gl/gEgYUd").circleCrop().into(avatar_view)

        viewModel.taskList.observe(this, Observer { newList ->
            adapter.list = newList.orEmpty()
        })

        viewModelUserInfo.userInfo.observe(this, Observer {
            firstname_view.setText(it.firstName)
            lastname_view.setText(it.lastName)

            Glide.with(this).load(it.avatar).circleCrop().into(avatar_view)
        })

        val layoutManager = LinearLayoutManager(this.context)
        binding.apply {
            recyclerView.layoutManager = layoutManager
            recyclerView.adapter = adapter

            adapter.onDeleteClickListener = { task ->
                viewModel.removeTask(task)
            }

            adapter.onEditClickListAdapter = { task ->
                val action = TaskListFragmentDirections.editTask(task)
                findNavController().navigate(action)
            }

            logoutButton.setOnClickListener {
                viewModelUserInfo.logout()
                Log.i("tokenLog", "logout")
                Log.i("tokenLog", Api.INSTANCE.getToken().toString())

                //findNavController().navigate(R.id.action_taskListFragment_to_authenticationFragment)
                activity?.finish()
            }

            floatingActionButton.setOnClickListener {
                val action = TaskListFragmentDirections.editTask(null)
                findNavController().navigate(action)
            }

            avatarView.setOnClickListener {
                val editUserIntent = Intent(view.context, UserInfoActivity::class.java)

                startActivity(editUserIntent)
            }

            updateButton.setOnClickListener {
                val currentUser = viewModelUserInfo.userInfo.value

                if (currentUser != null) {
                    currentUser?.firstName = firstnameView.text.toString()
                    currentUser?.lastName = lastnameView.text.toString()

                    viewModelUserInfo.update(currentUser)
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()

        viewModel.loadTasks()
    }
}