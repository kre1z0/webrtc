function isTouchEvent(event) {
  return !!event.touches;
}

export function getPosition(event: any): any {
  return isTouchEvent(event)
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
    : { x: event.clientX, y: event.clientY };
}
