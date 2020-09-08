package com.desousadylan.todo.authentication

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController

import com.desousadylan.todo.R
import com.desousadylan.todo.databinding.FragmentAuthenticationBinding
import com.desousadylan.todo.network.Api
import com.desousadylan.todo.userInfo.UserInfoViewModel

class AuthenticationFragment : Fragment() {
    private lateinit var binding: FragmentAuthenticationBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        if (!Api.INSTANCE.getToken().isNullOrBlank()) {
            findNavController().navigate(R.id.action_authenticationFragment_to_mainActivity)
        }

        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_authentication, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {
            signUpButton.setOnClickListener {
                findNavController().navigate(R.id.action_authenticationFragment_to_signupFragment)
            }

            loginButton.setOnClickListener {
                findNavController().navigate(R.id.action_authenticationFragment_to_loginFragment)
            }
        }
    }
}
