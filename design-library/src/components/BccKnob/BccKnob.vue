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
    <canvas ref="canvasEl" class="object-fit w-full"></canvas>
    <div class="bcc-knob-top-left">
      <slot name="left" />
    </div>
    <div class="bcc-knob-top-right">
      <slot name="right" />
    </div>
    <div class="bcc-knob-label">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  size: { type: Number, default: 400 },
  arcWidth: { type: Number, default: 20 },
  min: { type: Number, default: -720 }, // in minutes (-12h)
  max: { type: Number, default: 720 }, // in minutes (+12h)
  steps: { type: Number, default: 1 },
  colored: { type: Boolean, default: false, description: "Use CSS variables for colors" },
  showHandle: { type: Boolean, default: false },
  hideArrows: { type: Boolean, default: false },
});
const emit = defineEmits<{
  (e: "drag:start"): void;
  (e: "drag:update"): void;
  (e: "drag:end"): void;
}>();

const colors = {
  arc: "#EFEFEF",
  head: "#437571",
  tail: "#A9BABA",
  leftHead: "#9B4F44",
  leftTail: "#DBBEAC",
  rightHead: "#3E8E75",
  rightTail: "#B1DECC",
};

// Our model value (in minutes)
const minutes = defineModel<number>({ required: true });

// Refs for container and canvas; we'll get the 2D context on mount.
const knobContainer = ref<Pick<Element, "getBoundingClientRect"> | null>(null);
const canvasEl = ref<Pick<HTMLCanvasElement, "height" | "width" | "getContext"> | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrame = 0;

// Drag state and angles (all in degrees)
const isDragging = ref(false);
const totalAngle = ref(0);
const maxAngleReached = ref(0);
const lastAngle = ref(0);

// Compute center and radius for drawing.
const center = computed(() => props.size / 2);
const radius = computed(() => center.value - props.arcWidth);

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

watch(
  minutes,
  (mins) => {
    if (isDragging.value) return;
    console.log("minutes", mins);
    const newAngle = (mins / props.steps / 60) * 360;
    totalAngle.value = newAngle;
    drawCanvas();
  },
  { immediate: true }
);

// Initialize the canvas context on mount.
onMounted(() => {
  loadCssColors();
  const canvas = canvasEl.value;
  if (canvas) {
    const ratio = Math.ceil(window.devicePixelRatio);
    canvas.width = props.size * ratio;
    canvas.height = props.size * ratio;
    ctx = canvas.getContext("2d");
    ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawCanvas();
  }
});

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

  const angle = totalAngle.value;

  ctx.clearRect(0, 0, props.size, props.size);

  // 1. Draw background circle with a subtle drop shadow.
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.arc(center.value, center.value, radius.value, 0, 2 * Math.PI);
  ctx.strokeStyle = colors.arc;
  ctx.lineWidth = props.arcWidth;
  ctx.stroke();
  ctx.restore();

  // 2. Draw direction arrows
  if (!props.hideArrows) {
    ctx.save();
    ctx.strokeStyle = colors.arc;
    ctx.lineWidth = 3;

    // Left arrow (anticlockwise)
    ctx.beginPath();
    ctx.arc(
      center.value,
      center.value,
      radius.value + 30,
      toRad(-30), // Start from around 11 o'clock
      toRad(-60), // End at top
      true // Draw anticlockwise
    );
    // Arrow head at end of arc
    const leftEnd = angleToCartesian(-60, radius.value + 30);
    ctx.moveTo(leftEnd.x - 4, leftEnd.y - 16);
    ctx.lineTo(leftEnd.x - 1, leftEnd.y + 2);
    ctx.lineTo(leftEnd.x + 16, leftEnd.y - 4);
    ctx.stroke();

    // Right arrow (clockwise)
    ctx.beginPath();
    ctx.arc(
      center.value,
      center.value,
      radius.value + 30,
      toRad(30), // Start from around 1 o'clock
      toRad(60), // End at top
      false // Draw clockwise
    );
    // Arrow head at end of arc
    const rightEnd = angleToCartesian(60, radius.value + 30);
    ctx.moveTo(rightEnd.x - 16, rightEnd.y - 4);
    ctx.lineTo(rightEnd.x + 1, rightEnd.y + 2);
    ctx.lineTo(rightEnd.x + 4, rightEnd.y - 16);
    ctx.stroke();

    ctx.restore();
  }

  // 3. Draw 12 tick marks.
  ctx.strokeStyle = colors.arc;
  ctx.lineWidth = 4;
  for (let n = 1; n <= 12; n++) {
    const angle = n * 30;
    ctx.save();
    ctx.translate(center.value, center.value);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, -radius.value + props.arcWidth * 0.8);
    ctx.lineTo(0, -radius.value + props.arcWidth * 2);
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
    if (props.colored) {
      ctx.strokeStyle = anticlockwise ? colors.leftTail : colors.rightTail;
    } else {
      ctx.strokeStyle = colors.tail;
    }
    ctx.lineWidth = props.arcWidth;
    ctx.stroke();
  }

  // 5. Draw the gradient “handle” arc using a linear gradient.
  // The handle spans up to 108° (≈30% of a full rotation).
  let handleStartDeg: number;
  if (Math.abs(angle) < 108) {
    handleStartDeg = 0;
  } else {
    handleStartDeg = angle - Math.sign(angle) * 108;
  }
  const handleEndDeg = angle;
  const thickness = props.arcWidth / 2;
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
  const grad = ctx.createConicGradient(((angle - 90) * Math.PI) / 180, center.value, center.value);
  if (props.colored) {
    grad.addColorStop(0, colors.leftHead);
    grad.addColorStop(100 / 360, colors.leftTail);
    grad.addColorStop(260 / 360, colors.rightTail);
    grad.addColorStop(1, colors.rightHead);
  } else {
    grad.addColorStop(0, colors.head);
    grad.addColorStop(100 / 360, colors.tail);
    grad.addColorStop(260 / 360, colors.tail);
    grad.addColorStop(1, colors.head);
  }
  ctx.fillStyle = grad;
  // Fill the entire canvas (only the clipped area is affected).
  ctx.fillRect(0, 0, props.size, props.size);
  ctx.restore();
  ctx.restore();

  // 6. Draw a white circle at the end of the arc (the drag handle).
  // Use totalAngle (instead of the clamped backgroundArcAngle) so that the handle rotates continuously.
  const handlePos = angleToCartesian(angle, radius.value);
  const handleCircleRadius = props.arcWidth * (props.showHandle ? 0.8 : 0.5);
  ctx.beginPath();
  ctx.arc(handlePos.x, handlePos.y, handleCircleRadius, 0, 2 * Math.PI);
  if (props.showHandle || !!minutes.value) {
    ctx.fillStyle = !minutes.value
      ? "#000"
      : props.colored
      ? anticlockwise
        ? colors.leftHead
        : colors.rightHead
      : colors.head;

    ctx.fill();
  }

  if (props.showHandle) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }
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
  /*const distanceFromCenter = Math.sqrt(x * x + y * y);
  if (distanceFromCenter < props.size * 0.01) {
    return lastAngle.value;
  }*/
  const rad = Math.atan2(x, -y);
  return (rad * 180) / Math.PI;
}

// ----- Interaction Handlers -----
function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true;
  emit("drag:start");
  lastAngle.value = getMouseAngle(e);
}

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
      const inMinutes = Math.round((totalAngle.value / 360) * (60 / props.steps));
      if (inMinutes !== minutes.value) {
        minutes.value = inMinutes * props.steps;
        emit("drag:update");
      }
      drawCanvas();
    }
  });
}

function endDrag() {
  isDragging.value = false;
  emit("drag:end");
}

function loadCssColors() {
  if (knobContainer.value) {
    const computedColors = getComputedStyle(knobContainer.value as Element);
    colors.arc = computedColors.getPropertyValue("--bcc-knob-arc-bg") || colors.arc;
    colors.head = computedColors.getPropertyValue("--bcc-knob-head") || colors.head;
    colors.tail = computedColors.getPropertyValue("--bcc-knob-tail") || colors.tail;
    colors.leftHead = computedColors.getPropertyValue("--bcc-knob-left-head") || colors.leftHead;
    colors.leftTail = computedColors.getPropertyValue("--bcc-knob-left-tail") || colors.leftTail;
    colors.rightHead = computedColors.getPropertyValue("--bcc-knob-right-head") || colors.rightHead;
    colors.rightTail = computedColors.getPropertyValue("--bcc-knob-right-tail") || colors.rightTail;
  }
}
</script>
