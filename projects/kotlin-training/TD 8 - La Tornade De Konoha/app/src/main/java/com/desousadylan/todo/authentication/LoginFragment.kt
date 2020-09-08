package com.desousadylan.todo.authentication

import android.os.Bundle
import android.preference.PreferenceManager
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.content.edit
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.Glide

import com.desousadylan.todo.R
import com.desousadylan.todo.SHARED_PREF_TOKEN_KEY
import com.desousadylan.todo.data.LoginForm
import com.desousadylan.todo.databinding.FragmentLoginBinding
import com.desousadylan.todo.userInfo.UserInfoViewModel
import kotlinx.android.synthetic.main.activity_user_info.*

class LoginFragment : Fragment() {
    private lateinit var binding: FragmentLoginBinding
    private val viewModel by lazy {
        ViewModelProvider(this).get(UserInfoViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_login, container, false)

        return  binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel.token.observe(this, Observer {
            if (it != null) {
                PreferenceManager.getDefaultSharedPreferences(context).edit {
                    putString(SHARED_PREF_TOKEN_KEY, it)
                }
                findNavController().navigate(R.id.action_loginFragment_to_mainActivity)
                activity?.finish()
            } else {
                Toast.makeText(context, "Something went wrong ...", Toast.LENGTH_LONG).show()
            }
        })

        binding.apply {
            loginButton.setOnClickListener {
                submitForm()
            }
        }
    }

    private fun submitForm() {
        when(validateForm()) {
            true -> {
                binding.apply {
                    val loginForm = LoginForm(emailEdit.text.toString(), passEdit.text.toString())
                    viewModel.login(loginForm)
                }
            }
            false -> {
                Toast.makeText(context, "Please fill all the fields !", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun validateForm(): Boolean {
        binding.apply {
            return emailEdit.text.isNotEmpty() && passEdit.text.isNotEmpty()
        }
    }
}
