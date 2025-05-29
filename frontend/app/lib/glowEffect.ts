export function handleGlowMouseMove(event: MouseEvent) {
  const card = event.currentTarget as HTMLElement;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const mouseX = event.clientX - rect.left - rect.width / 2;
  const mouseY = event.clientY - rect.top - rect.height / 2;

  let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
  angle = (angle + 360) % 360; // Normalize angle to 0-360

  // The article adds 60 to the angle. This can be adjusted if needed.
  card.style.setProperty("--start-angle", `${angle + 60}deg`);
}

export function addGlowEffect(cardElement: HTMLElement | null) {
  if (cardElement) {
    cardElement.addEventListener("mousemove", handleGlowMouseMove as EventListener);
  }
}

export function removeGlowEffect(cardElement: HTMLElement | null) {
  if (cardElement) {
    cardElement.removeEventListener("mousemove", handleGlowMouseMove as EventListener);
    cardElement.style.removeProperty("--start-angle"); // Reset the angle
  }
} 