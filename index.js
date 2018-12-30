import easings from "./easing";

export function animatedScroll(element, targetScrollPosition, duration) {
    animatedScrollWithEasing(element, targetScrollPosition, duration, 'easeOutCirc');
}

export function animatedScrollWithEasing(element, targetScrollPosition, duration, easingName) {
    const totalIterations = calculateRequiredFrames(duration);
    const initialScrollPosition = element === window ? document.documentElement.scrollTop || document.body.scrollTop : element.scrollTop;
    animatedScrollByIteration(element, 0, initialScrollPosition, targetScrollPosition, totalIterations, easingName);
}

function animatedScrollByIteration(element, currentIteration, initialScrollPosition, targetScrollPosition, totalIterations, easingName) {
    const nextValue = easings[easingName](currentIteration, initialScrollPosition, targetScrollPosition - initialScrollPosition, totalIterations);

    typeof(window) !== 'undefined' && element === window ? window.scrollTo(0, nextValue) : element.scrollTop = nextValue;

    if (currentIteration < totalIterations) {
        requestAnimationFrame(() => animatedScrollByIteration(element, currentIteration + 1, initialScrollPosition, targetScrollPosition, totalIterations, easingName));
    }
}

function calculateRequiredFrames(duration) {
    // at almost always 60fps
    return Math.max(1, duration / 1000 * 60);
}
