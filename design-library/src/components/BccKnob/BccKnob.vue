<template>
  <div
    class="bcc-knob"
    ref="knobContainer"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @mousemove="onDrag"
    @touchmove="onDrag"
    @mouseup="endDrag"
    @touchend="endDrag"
    @mouseleave="endDrag"
  >
    <canvas ref="canvasEl" :width="size" :height="size"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  solidColor: { type: String, default: "#A9BABA" },
  thumbColor: { type: String, default: "#437571" },
  min: { type: Number, default: -720 }, // in minutes (-12h)
  max: { type: Number, default: 720 }, // in minutes (+12h)
});

// Our model value (in minutes)
const value = defineModel<number>({ required: true });

const size = ref(320);
const arcWidth = ref(20);

// Refs for container and canvas; we'll get the 2D context on mount.
const knobContainer = ref<HTMLDivElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

// Drag state and angles (all in degrees)
const isDragging = ref(false);
const totalAngle = ref(0);
const maxAngleReached = ref(0);
const lastAngle = ref(0);

// Compute center and radius for drawing.
const center = computed(() => size.value / 2);
const radius = computed(() => center.value - arcWidth.value);

// Convert our min/max (in minutes) to degrees.
const minDegrees = computed(() => (props.min / 60) * 360);
const maxDegrees = computed(() => (props.max / 60) * 360);

// Clamp the background arc angle to a full circle.
const backgroundArcAngle = computed(() =>
  Math.max(
    -359.99,
    Math.min(359.99, Math.max(minDegrees.value, Math.min(totalAngle.value, maxDegrees.value)))
  )
);

// Display text (in hours)
const displayValue = computed(() => (totalAngle.value / 360).toFixed(2) + "h");

/**
 * For canvas.arc we need radians with 0 at the top.
 * This helper subtracts 90° so that 0° is at the top.
 */
function toRad(deg: number) {
  return ((deg - 90) * Math.PI) / 180;
}

/**
 * Convert an angle (in our knob degrees) to Cartesian coordinates.
 * (0° is at the top; positive angles rotate clockwise.)
 */
function angleToCartesian(angleDeg: number, r: number = radius.value) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: center.value + r * Math.sin(rad),
    y: center.value - r * Math.cos(rad),
  };
}

/**
 * Main drawing routine.
 */
function drawCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, size.value, size.value);

  // 1. Draw background circle with a subtle drop shadow.
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;
  ctx.beginPath();
  ctx.arc(center.value, center.value, radius.value, 0, 2 * Math.PI);
  ctx.strokeStyle = "#efefef";
  ctx.lineWidth = arcWidth.value;
  ctx.stroke();
  ctx.restore();

  // 2. Draw inner circle.
  ctx.beginPath();
  ctx.arc(center.value, center.value, radius.value * 0.2, 0, 2 * Math.PI);
  ctx.fillStyle = "#fafafa";
  ctx.fill();

  // 3. Draw 12 tick marks.
  ctx.strokeStyle = "#D4D4D4";
  ctx.lineWidth = 4;
  for (let n = 1; n <= 12; n++) {
    const angle = n * 30;
    ctx.save();
    ctx.translate(center.value, center.value);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, -radius.value + arcWidth.value * 0.8);
    ctx.lineTo(0, -radius.value + arcWidth.value * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 4. Draw the solid background arc.
  if (Math.abs(backgroundArcAngle.value) >= 108) {
    ctx.beginPath();
    const anticlockwise = backgroundArcAngle.value < 0;
    ctx.arc(
      center.value,
      center.value,
      radius.value,
      toRad(0),
      toRad(backgroundArcAngle.value),
      anticlockwise
    );
    ctx.strokeStyle = props.solidColor;
    ctx.lineWidth = arcWidth.value;
    ctx.stroke();
  }

  // 5. Draw the gradient “handle” arc using a linear gradient.
  // The handle spans up to 108° (≈30% of a full rotation).
  const bgAngle = totalAngle.value;
  let handleStartDeg: number;
  if (Math.abs(bgAngle) < 108) {
    handleStartDeg = 0;
  } else {
    handleStartDeg = bgAngle - Math.sign(bgAngle) * 108;
  }
  const handleEndDeg = bgAngle;
  const thickness = arcWidth.value / 2;
  ctx.save();
  ctx.beginPath();
  const anticlockwise = handleEndDeg < handleStartDeg;
  // Outer edge of the handle arc.
  ctx.arc(
    center.value,
    center.value,
    radius.value + thickness,
    toRad(handleStartDeg),
    toRad(handleEndDeg),
    anticlockwise
  );
  // Inner edge of the handle arc.
  ctx.arc(
    center.value,
    center.value,
    radius.value - thickness,
    toRad(handleEndDeg),
    toRad(handleStartDeg),
    !anticlockwise
  );
  ctx.closePath();
  // Clip to the handle arc.
  ctx.save();
  ctx.clip();

  // Gradient for following handle
  // Create the conic gradient with stops matching the original design.
  const grad = ctx.createConicGradient(
    ((totalAngle.value - 90) * Math.PI) / 180,
    center.value,
    center.value
  );
  grad.addColorStop(0, props.thumbColor);
  grad.addColorStop(100 / 360, props.solidColor);
  grad.addColorStop(260 / 360, props.solidColor);
  grad.addColorStop(1, props.thumbColor);
  ctx.fillStyle = grad;
  // Fill the entire canvas (only the clipped area is affected).
  ctx.fillRect(0, 0, size.value, size.value);
  ctx.restore();
  ctx.restore();

  // 6. Draw a white circle at the end of the arc (the drag handle).
  // Use totalAngle (instead of the clamped backgroundArcAngle) so that the handle rotates continuously.
  const handlePos = angleToCartesian(totalAngle.value, radius.value);
  const handleCircleRadius = arcWidth.value * 0.8; // a bit larger than the stroke.
  ctx.beginPath();
  ctx.arc(handlePos.x, handlePos.y, handleCircleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ccc";
  ctx.stroke();
}

/**
 * Returns the angle (in degrees) relative to 12 o’clock.
 */
function getMouseAngle(evt: MouseEvent | TouchEvent): number {
  if (!knobContainer.value) return 0;
  const rect = knobContainer.value.getBoundingClientRect();
  const cx = rect.left + center.value;
  const cy = rect.top + center.value;
  let x: number, y: number;
  if ("touches" in evt && evt.touches.length) {
    x = evt.touches[0].clientX - cx;
    y = evt.touches[0].clientY - cy;
  } else if ("clientX" in evt) {
    x = evt.clientX - cx;
    y = evt.clientY - cy;
  } else {
    return 0;
  }
  // Ignore input if too close to the center.
  const distanceFromCenter = Math.sqrt(x * x + y * y);
  if (distanceFromCenter < size.value * 0.1) {
    return lastAngle.value;
  }
  const rad = Math.atan2(x, -y);
  return (rad * 180) / Math.PI;
}

// ----- Interaction Handlers -----
function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true;
  lastAngle.value = getMouseAngle(e);
}

let animationFrame = 0;
function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return;
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(() => {
    const angle = getMouseAngle(e);
    let delta = angle - lastAngle.value;
    // Adjust for crossing the ±180° boundary.
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const newTotalAngle = Math.round(
      Math.max(minDegrees.value, Math.min(maxDegrees.value, totalAngle.value + delta))
    );
    if (newTotalAngle !== totalAngle.value) {
      totalAngle.value = newTotalAngle;
      if (Math.abs(totalAngle.value) > Math.abs(maxAngleReached.value)) {
        maxAngleReached.value = totalAngle.value;
      }
      lastAngle.value = angle;
      const inMinutes = Math.round((totalAngle.value / 360) * 60);
      if (inMinutes !== value.value) {
        value.value = inMinutes;
      }
      drawCanvas();
    }
  });
}

function endDrag() {
  isDragging.value = false;
}

// Initialize the canvas context on mount.
onMounted(() => {
  if (canvasEl.value) {
    ctx = canvasEl.value.getContext("2d");
    drawCanvas();
  }
});
</script>

<style scoped>
.bcc-knob {
  display: inline-block;
  user-select: none;
  touch-action: none;
}
</style>
