import { AppEvent } from './fixtures';

class MockEmitter {
  private timeoutIds: ReturnType<typeof setTimeout>[] = [];
  private isRunning = false;

  start(events: AppEvent[], emit: (event: AppEvent) => void) {
    this.stop();
    this.isRunning = true;
    let currentDelay = 0;

    events.forEach((event) => {
      currentDelay += event.delay;
      const timeoutId = setTimeout(() => {
        if (this.isRunning) {
          emit(event);
        }
      }, currentDelay);
      this.timeoutIds.push(timeoutId);
    });
  }

  stop() {
    this.isRunning = false;
    this.timeoutIds.forEach(clearTimeout);
    this.timeoutIds = [];
  }
}

export const mockEmitter = new MockEmitter();
