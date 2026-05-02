import { useEffect } from "react";
import { startMockRun } from "../mocks/emitter";

export default function useMockEmitter(handler) {
  useEffect(() => {
    startMockRun(handler);
  }, []);
}