import { useState, useEffect, useRef, useCallback } from 'react';

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface GestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinchIn?: () => void;
  onPinchOut?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
}

interface UseTouchGesturesOptions {
  threshold?: number;
  minSwipeDistance?: number;
  maxSwipeTime?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
}

export const useTouchGestures = (
  handlers: GestureHandlers,
  options: UseTouchGesturesOptions = {}
) => {
  const {
    threshold = 10,
    minSwipeDistance = 50,
    maxSwipeTime = 300,
    longPressDelay = 500,
    doubleTapDelay = 300,
  } = options;

  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState<TouchPoint | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPoint | null>(null);
  const [lastTap, setLastTap] = useState<number>(0);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [initialDistance, setInitialDistance] = useState<number>(0);
  const [currentDistance, setCurrentDistance] = useState<number>(0);

  const elementRef = useRef<HTMLElement>(null);

  // Calculate distance between two touch points
  const getDistance = useCallback((touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Calculate angle between two points
  const getAngle = useCallback((start: TouchPoint, end: TouchPoint): number => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const point: TouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };

    setIsTouching(true);
    setTouchStart(point);
    setTouchEnd(null);

    // Start long press timer
    const timer = setTimeout(() => {
      handlers.onLongPress?.();
    }, longPressDelay);
    setLongPressTimer(timer);

    // Handle pinch gestures
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setCurrentDistance(distance);
    }
  }, [handlers, longPressDelay, getDistance]);

  // Handle touch move
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isTouching) return;

    const touch = e.touches[0];
    const point: TouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };

    setTouchEnd(point);

    // Update pinch distance
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setCurrentDistance(distance);
    }

    // Cancel long press if moved
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [isTouching, longPressTimer, getDistance]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isTouching || !touchStart) return;

    // Clear long press timer
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    const touch = e.changedTouches[0];
    const endPoint: TouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };

    setTouchEnd(endPoint);
    setIsTouching(false);

    // Calculate swipe
    const timeDiff = endPoint.timestamp - touchStart.timestamp;
    const distance = Math.sqrt(
      Math.pow(endPoint.x - touchStart.x, 2) + Math.pow(endPoint.y - touchStart.y, 2)
    );

    if (timeDiff < maxSwipeTime && distance > minSwipeDistance) {
      const angle = getAngle(touchStart, endPoint);

      // Determine swipe direction
      if (angle > -45 && angle < 45) {
        handlers.onSwipeRight?.();
      } else if (angle > 135 || angle < -135) {
        handlers.onSwipeLeft?.();
      } else if (angle > 45 && angle < 135) {
        handlers.onSwipeDown?.();
      } else {
        handlers.onSwipeUp?.();
      }
    }

    // Handle pinch gestures
    if (initialDistance > 0 && currentDistance > 0) {
      const pinchDiff = currentDistance - initialDistance;
      if (Math.abs(pinchDiff) > threshold) {
        if (pinchDiff > 0) {
          handlers.onPinchOut?.();
        } else {
          handlers.onPinchIn?.();
        }
      }
      setInitialDistance(0);
      setCurrentDistance(0);
    }

    // Handle double tap
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;
    if (timeSinceLastTap < doubleTapDelay && timeSinceLastTap > 0) {
      handlers.onDoubleTap?.();
      setLastTap(0);
    } else {
      setLastTap(now);
    }
  }, [
    isTouching,
    touchStart,
    longPressTimer,
    maxSwipeTime,
    minSwipeDistance,
    getAngle,
    handlers,
    threshold,
    initialDistance,
    currentDistance,
    lastTap,
    doubleTapDelay,
  ]);

  // Add event listeners
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    elementRef,
    isTouching,
    touchStart,
    touchEnd,
  };
};
