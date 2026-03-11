package com.notes

import android.app.Activity
import android.content.Intent
import android.speech.RecognizerIntent
import com.facebook.react.bridge.*
import java.util.*

class SpeechModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var speechPromise: Promise? = null
    private val SPEECH_REQUEST_CODE = 1001

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "SpeechModule"

    @ReactMethod
    fun startSpeech(promise: Promise) {
        val activity: Activity? = reactContext.currentActivity  // ✅ fixed

        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        speechPromise = promise

        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
            putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak now...")
        }

        activity.startActivityForResult(intent, SPEECH_REQUEST_CODE)
    }

    // ✅ Correct non-nullable signature for newer React Native
    override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode == SPEECH_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                val results = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
                val text = results?.get(0) ?: ""
                speechPromise?.resolve(text)
            } else {
                speechPromise?.reject("SPEECH_ERROR", "Speech cancelled or failed")
            }
            speechPromise = null
        }
    }

    // ✅ Correct non-nullable signature
    override fun onNewIntent(intent: Intent) {}
}