export function handleEmeraldGlowMouseMove(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const mouseX = event.clientX - rect.left - rect.width / 2;
  const mouseY = event.clientY - rect.top - rect.height / 2;

  let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
  angle = (angle + 360) % 360; // Normalize angle to 0-360

  card.style.setProperty("--glow-angle", `${angle}deg`);
}

export function addEmeraldGlowEffect(cardElement: HTMLElement | null) {
  if (cardElement) {
    cardElement.addEventListener("mousemove", handleEmeraldGlowMouseMove as EventListener);
  }
}

export function removeEmeraldGlowEffect(cardElement: HTMLElement | null) {
  if (cardElement) {
    cardElement.removeEventListener("mousemove", handleEmeraldGlowMouseMove as EventListener);
    cardElement.style.removeProperty("--glow-angle");
  }
} 