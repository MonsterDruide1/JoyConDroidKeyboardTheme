var currentlyRunning = false;
var pauseTAS = false;

var currentFrame = 0;

var controllerIsCurrentlySynced = false;


var isReadyToRun = false;

var funcNames = ["A", "B", "X", "Y", "L", "R", "ZL", "ZR", "Plus", "Minus", "Left", "Up", "Right", "Down"];

var hasCompiledAlready = false;

function clearAllInputs() {
	funcNames.forEach(function(funcName) {
		// Turns off each and every input
		window.joyconJS["on" + funcName](false);
	});
	window.joyconJS.onLeftJoystick(0, 0);
	window.joyconJS.onRightJoystick(0, 0);
}

function disableMotionControls() {
	// Disable motion controls
	window.joyconJS.setMotionControlsEnabled(false);
}
disableMotionControls();

window.inputHandler = function() {
	if (!pauseTAS) {
		// Send FPS to profiler
		callProfiler();
		// Get next frame
		var inputsThisFrame = currentScriptParser.nextFrame();

		// Inputs format
		/*
			0: Frame
			1: LX,
			2: LY,
			3: RX,
			4: RY,
			5 - Infinity: The rest of the inputs
		*/


		setControllerVisualizer(inputsThisFrame);
		// Actually, not needed right now

		// Makes it easier to clear all of them beforehand
		clearAllInputs();

		currentFrame++;
		if (inputsThisFrame) {
			for (var i = 5; i < inputsThisFrame.length; i++) {
				// Start at 5 because those first 5 are joystick inputs and frame numbers
				// -1 because the first value is actually frames
				var name = funcNames[inputsThisFrame[i] - 1];
				window.joyconJS["on" + name](true);
			}
		}

		// Send joystick inputs
		if (!inputsThisFrame) {
			// Neither are being held
			window.joyconJS.onLeftJoystick(0, 0);
			window.joyconJS.onRightJoystick(0, 0);
		} else {
			var LX = inputsThisFrame[1];
			var LY = inputsThisFrame[2];
			var RX = inputsThisFrame[3];
			var RY = inputsThisFrame[4];
			// Power goes to 100
			var leftJoystickPower = Math.min(Math.abs(Math.hypot(LX, LY)), 100);
			var rightJoystickPower = Math.min(Math.abs(Math.hypot(RX, RY)), 100);
			// Angle is in radians
			var leftJoystickAngle = Math.atan2(LY, LX); // + (Math.PI / 2);
			var rightJoystickAngle = Math.atan2(RY, RX); // + (Math.PI / 2);
			window.joyconJS.onLeftJoystick(leftJoystickPower, leftJoystickAngle);
			window.joyconJS.onRightJoystick(rightJoystickPower, rightJoystickAngle);
		}

		if (currentScriptParser.frame % 180 === 0) {
			// Check if this frame is a multiple of 60
			// This means that this runs every 3 seconds
			// Shows thousands of a percent
			log("TAS is " + currentScriptParser.currentRunPercentage.toFixed(3) + "% done");
		}
		
		if (currentlyRunning && currentScriptParser.done() && SHOULD_LOOP) {
			// The TAS has not been stopped, the last frame has been reached
			// And the user wishes to loop
			// Just start it again
			currentFrame = 0;
			currentScriptParser.reset();
			log("Looping back again");
		}
		
		log(currentlyRunning + " " + currentScriptParser.done() + " " + currentScriptParser.frame)
		
		if (currentlyRunning === false || currentScriptParser.done()) {
			// Time to stop!
			window.joyconJS.unregisterCallback();
			// Clear controller visualizer
			setControllerVisualizer(false);
			// Hard reset for async (for now)
			currentScriptParser.hardStop();
			// Let user know recompiling is needed
			setCompileIconIfNeeded();
			hasCompiledAlready = false; 
			// Stop all currently held inputs
			clearAllInputs();
			currentlyRunning = false;
			log("TAS is stopped or has finished");
		}
		return true;
	} else {
		// Just to keep it in check
		clearAllInputs();
		return false;
	}
}