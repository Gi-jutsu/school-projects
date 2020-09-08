package com.desousadylan.todo.data

import android.os.Parcelable
import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.android.parcel.Parcelize
import java.io.Serializable

@Parcelize
@JsonClass(generateAdapter = true)
data class Task(
    @field:Json(name = "id")
    var id: String,
    @field:Json(name = "title")
    var title: String,
    @field:Json(name = "description")
    var description: String = "I'm a task"
): Serializable, Parcelable