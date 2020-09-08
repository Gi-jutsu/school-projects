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

import com.desousadylan.todo.R
import com.desousadylan.todo.SHARED_PREF_TOKEN_KEY
import com.desousadylan.todo.data.SignUpForm
import com.desousadylan.todo.databinding.FragmentSignupBinding
import com.desousadylan.todo.userInfo.UserInfoViewModel
import kotlinx.android.synthetic.main.fragment_signup.*

class SignupFragment : Fragment() {
    private lateinit var binding: FragmentSignupBinding
    private val viewModel by lazy {
        ViewModelProvider(this).get(UserInfoViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_signup, container, false)

        return  binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel.token.observe(this, Observer {
            if (it != null) {
                PreferenceManager.getDefaultSharedPreferences(context).edit {
                    putString(SHARED_PREF_TOKEN_KEY, it)
                }

                findNavController().navigate(R.id.action_signupFragment_to_mainActivity)
            } else {
                Toast.makeText(context, "Something went wrong ...", Toast.LENGTH_LONG).show()
            }
        })

        binding.apply {
            signUpButton.setOnClickListener {
                submitForm()
            }
        }
    }

    private fun submitForm() {
        if (validateForm()) {
            binding.apply {
                val signUpForm = SignUpForm(
                    firstName = firstnameEdit.text.toString(),
                    lastName = lastnameEdit.text.toString(),
                    email = emailEdit.text.toString(),
                    password = passEdit.text.toString(),
                    passwordConfirmation =  passConfirmEdit.text.toString()
                )
                viewModel.signUp(signUpForm)
            }
        }
    }

    private fun validateForm(): Boolean {
        Log.i("password", (!checkPasswordsLength()).toString())

        if (!checkFieldsAreNotEmpty()) {
            Toast.makeText(context, "Please fill all the fields !", Toast.LENGTH_LONG).show()
            return false
        }

        if (!checkPasswordsLength()) {
            Toast.makeText(context, "Password is less than 6 characters!", Toast.LENGTH_LONG).show()
            return false
        }

        if (!checkPasswordsEquals()) {
            Toast.makeText(context, "Passwords are not equals !", Toast.LENGTH_LONG).show()
            return false
        }

        return true
    }

    private fun checkPasswordsLength(): Boolean {
        binding.apply {
            return passEdit.length() > 6

        }
    }

    private fun checkPasswordsEquals(): Boolean {
        binding.apply {
            return passConfirmEdit.text.toString().equals(passEdit.text.toString())
        }
    }

    private fun checkFieldsAreNotEmpty(): Boolean {
        binding.apply {
            return emailEdit.text.isNotEmpty() &&
                    firstnameEdit.text.isNotEmpty() &&
                    lastnameEdit.text.isNotEmpty() &&
                    passEdit.text.isNotEmpty() &&
                    passConfirmEdit.text.isNotEmpty()
        }
    }
}
