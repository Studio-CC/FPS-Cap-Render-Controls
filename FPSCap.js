export function renderLoop(func, setfps) {

   /**
    * Wraps an animation loop function so it can be executed at a specific frame-rate
    * loop {Function}  = The function you want to execute each frames
    * fps {Number}     = The desired frame rate
    */
   function createFpsCap(loop, fps = 60) {

      let targetFps = 0, fpsInterval = 0;
      let lastTime = 0, lastOverTime = 0, prevOverTime = 0, deltaTime = 0;

      function updateFps(value) {
         targetFps = value;
         fpsInterval = 1000 / targetFps;
      }

      updateFps(fps);

      return {
         // the targeted frame rate
         get fps() {
            return targetFps;
         },
         set fps(value) {
            updateFps(value);
         },

         // the frame-capped loop function
         loop: function (time) {
            deltaTime = time - lastTime;

            if (deltaTime < fpsInterval) {
               return;
            }

            prevOverTime = lastOverTime;
            lastOverTime = deltaTime % fpsInterval;
            lastTime = time - lastOverTime;

            deltaTime -= prevOverTime;

            return loop(deltaTime);
         },
      };
   }

   //

   const fpsCap = createFpsCap(func, setfps);

   let animationFrameId = null;

   function onAnimationFrame(time) {

      fpsCap.loop(time);
      animationFrameId = requestAnimationFrame(onAnimationFrame);

   }


   //

   function start() {

      // start code here
      if (!animationFrameId)
         animationFrameId = requestAnimationFrame(onAnimationFrame);

   }

   function stop() {

      // stop code here
      if (animationFrameId) {

         cancelAnimationFrame(animationFrameId);
         animationFrameId = null;

      }

   }

   return {
      start,
      stop,
   }

} // renderLoop