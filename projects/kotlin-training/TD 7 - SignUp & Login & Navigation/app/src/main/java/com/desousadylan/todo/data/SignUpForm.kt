package com.desousadylan.todo.data

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class SignUpForm(
    @field:Json(name = "firstname")
    var firstName: String,
    @field:Json(name = "lastname")
    var lastName: String,
    @field:Json(name = "email")
    var email: String,
    @field:Json(name = "password")
    var password: String,
    @field:Json(name = "password_confirmation")
    var passwordConfirmation: String
)