package com.desousadylan.todo.data

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class LoginForm(
    @field:Json(name = "email")
    var email: String,
    @field:Json(name = "password")
    var password: String
)