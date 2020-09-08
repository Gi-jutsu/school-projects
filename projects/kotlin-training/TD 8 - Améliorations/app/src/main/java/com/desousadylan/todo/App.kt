package com.desousadylan.todo

import android.app.Application
import com.desousadylan.todo.network.Api

class App: Application() {
    override fun onCreate() {
        super.onCreate()
        Api.INSTANCE = Api(this)
    }
}