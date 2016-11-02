package de.sandstein.phonegap.plugin.transition;

import org.json.JSONArray;
import org.json.JSONException;

import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.Animation.AnimationListener;
import android.view.animation.TranslateAnimation;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

public class TransitionPlugin extends Plugin {

	public static final String SHOW_LOADING_VIEW = "showLoadingView";	
	public static final String HIDE_LOADING_VIEW = "hideLoadingView";
	public static final String INIT_TRANISITION_VIEW = "initTransitionView";
	public static final int SLIDE_ANIMATION = 0;
	public static final int FADE_ANIMATION = 1;
	
	private boolean isInit = false;
	private View transitionView = null;
	private Animation fadeIn = null;
	private Animation fadeOut = null;
	private Animation slideIn = null;
	private Animation slideOut = null;
	private LoadingSpinner progressSpinner = null;
 
	private int animation = FADE_ANIMATION;
	
	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		
		if (!isInit) {
			initTransitionView();
		}
			
		if (action.equals(SHOW_LOADING_VIEW)) {	
			// set type of animation
			setAnimation(args);
			
			switch(animation) {
				case SLIDE_ANIMATION:
					webView.startAnimation(slideIn);		
					break;
				case FADE_ANIMATION:
				default:
					transitionView.startAnimation(fadeIn);
			}		
			
		}
		else if (action.equals(HIDE_LOADING_VIEW)) {
			switch(animation) {
				case SLIDE_ANIMATION:
					webView.startAnimation(slideOut);		
					break;
				case FADE_ANIMATION:
				default:
					transitionView.startAnimation(fadeOut);
			}
		}
		else if (action.equals(INIT_TRANISITION_VIEW)) {
			initTransitionView();
		}
		
		return new PluginResult(PluginResult.Status.NO_RESULT);
	}

	@Override
	public boolean isSynch(String action) {
		return true;
	}

	public void setAnimation(JSONArray args) {
		String animationString; 
		try {
			animationString = args.getString(0);			
		}
		catch(JSONException e) {
			animationString = "default";
		}

		if (animationString.equals("slide")) {
			// "slide"
			animation = SLIDE_ANIMATION;
		}
		else {
			// "fade" und default 
			animation = FADE_ANIMATION;
		}
	}
	
	public void initTransitionView() {
		
		// transitionView und Animations vorbereiten 
		transitionView = new View(ctx);
		transitionView.setBackgroundColor(Color.BLACK);		
		transitionView.setVisibility(View.INVISIBLE);
		
		ViewGroup parent = (ViewGroup)webView.getParent(); 
		parent.addView(transitionView);
		
		final TransitionPlugin transition = this;
			
		slideIn = new TranslateAnimation(
			Animation.RELATIVE_TO_PARENT,  0.0f, Animation.RELATIVE_TO_PARENT,  -1.0f,
			Animation.RELATIVE_TO_PARENT,  0.0f, Animation.RELATIVE_TO_PARENT,   0.0f
		);
		slideIn.setFillAfter(true);
		slideIn.setDuration(250);
		slideIn.setAnimationListener(new AnimationListener() {										
			public void onAnimationStart(Animation animation) {}
			
			public void onAnimationRepeat(Animation animation) {}

			public void onAnimationEnd(Animation animation) {
				transition.webView.loadUrl("javascript:var e = document.createEvent('Events');e.initEvent('transitionAnimationReady');document.dispatchEvent(e);");
				transition.progressSpinner = LoadingSpinner.show(ctx, null, null, true);
			}					
		});
		
		slideOut = new TranslateAnimation(Animation.RELATIVE_TO_PARENT,  +1.0f, Animation.RELATIVE_TO_PARENT,  0.0f,
				 Animation.RELATIVE_TO_PARENT,  0.0f, Animation.RELATIVE_TO_PARENT,   0.0f);
		slideOut.setFillAfter(true);
		slideOut.setDuration(250);
		slideOut.setAnimationListener(new AnimationListener() {										
			public void onAnimationStart(Animation animation) {
				transition.progressSpinner.dismiss();
			}
			
			public void onAnimationRepeat(Animation animation) {}

			public void onAnimationEnd(Animation animation) {}					
		});
		
		
		fadeIn = new AlphaAnimation(0.0f, 1.0f);
		fadeIn.setDuration(250);
		fadeIn.setAnimationListener(new AnimationListener() {										
			public void onAnimationStart(Animation animation) {}
			
			public void onAnimationRepeat(Animation animation) {}

			public void onAnimationEnd(Animation animation) {					
				transition.transitionView.setVisibility(View.VISIBLE);
				transition.webView.loadUrl("javascript:var e = document.createEvent('Events');e.initEvent('transitionAnimationReady');document.dispatchEvent(e);");
				transition.progressSpinner = LoadingSpinner.show(ctx, null, null, true);
			}					
		});		
		
		
		
		fadeOut = new AlphaAnimation(1.0f, 0.0f);
		fadeOut.setDuration(555);
		fadeOut.setAnimationListener(new AnimationListener() {										
			public void onAnimationStart(Animation animation) {
				transition.progressSpinner.dismiss();				
			}
			
			public void onAnimationRepeat(Animation animation) {}

			public void onAnimationEnd(Animation animation) {					
				transition.transitionView.setVisibility(View.INVISIBLE);					
			}					
		});	
		
				
		isInit = true;
	}
	
}
	

