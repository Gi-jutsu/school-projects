package com.desousadylan.todo

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import java.io.Serializable

@Parcelize
data class Task(var id: String, var title: String, var description: String = "I'm a task"): Serializable, Parcelable
