/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { Select, util } from '@tensorflow/tfjs-core';
let wasmSelect;
function setup(backend) {
    wasmSelect = backend.wasm.cwrap('SelectV2', null, [
        'number',
        'number',
        'number',
        'number',
        'number', // outId
    ]);
}
function select(args) {
    const { inputs, backend } = args;
    const { condition, t, e } = inputs;
    const conditionId = backend.dataIdMap.get(condition.dataId).id;
    const tId = backend.dataIdMap.get(t.dataId).id;
    const eId = backend.dataIdMap.get(e.dataId).id;
    const out = backend.makeOutput(t.shape, t.dtype);
    const outId = backend.dataIdMap.get(out.dataId).id;
    const cRank = condition.shape.length;
    const tRank = t.shape.length;
    const offset = cRank === 0 || cRank > 1 || tRank === 1 ?
        1 :
        util.sizeFromShape(t.shape.slice(1));
    wasmSelect(conditionId, tId, eId, offset, outId);
    return out;
}
export const selectConfig = {
    kernelName: Select,
    backendName: 'wasm',
    kernelFunc: select,
    setupFunc: setup
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdhc20vc3JjL2tlcm5lbHMvU2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBMkIsTUFBTSxFQUFnQixJQUFJLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUkzRixJQUFJLFVBRXNCLENBQUM7QUFFM0IsU0FBUyxLQUFLLENBQUMsT0FBb0I7SUFDakMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUU7UUFDaEQsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVEsRUFBRyxRQUFRO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxJQUFrRDtJQUNoRSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQztJQUMvQixNQUFNLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFFakMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQy9DLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDL0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRW5ELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3JDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBRTdCLE1BQU0sTUFBTSxHQUFHLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekMsVUFBVSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWlCO0lBQ3hDLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFVBQVUsRUFBRSxNQUErQjtJQUMzQyxTQUFTLEVBQUUsS0FBSztDQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0tlcm5lbENvbmZpZywgS2VybmVsRnVuYywgU2VsZWN0LCBTZWxlY3RJbnB1dHMsIHV0aWx9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7QmFja2VuZFdhc219IGZyb20gJy4uL2JhY2tlbmRfd2FzbSc7XG5cbmxldCB3YXNtU2VsZWN0OiAoXG4gICAgY29uZGl0aW9uSWQ6IG51bWJlciwgdElkOiBudW1iZXIsIGVJZDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcixcbiAgICBvdXRJZDogbnVtYmVyKSA9PiB2b2lkO1xuXG5mdW5jdGlvbiBzZXR1cChiYWNrZW5kOiBCYWNrZW5kV2FzbSkge1xuICB3YXNtU2VsZWN0ID0gYmFja2VuZC53YXNtLmN3cmFwKCdTZWxlY3RWMicsIG51bGwsIFtcbiAgICAnbnVtYmVyJywgIC8vIGNvbmRpdGlvbklkXG4gICAgJ251bWJlcicsICAvLyB0SWRcbiAgICAnbnVtYmVyJywgIC8vIGVJZFxuICAgICdudW1iZXInLCAgLy8gb2Zmc2V0XG4gICAgJ251bWJlcicsICAvLyBvdXRJZFxuICBdKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KGFyZ3M6IHtpbnB1dHM6IFNlbGVjdElucHV0cywgYmFja2VuZDogQmFja2VuZFdhc219KSB7XG4gIGNvbnN0IHtpbnB1dHMsIGJhY2tlbmR9ID0gYXJncztcbiAgY29uc3Qge2NvbmRpdGlvbiwgdCwgZX0gPSBpbnB1dHM7XG5cbiAgY29uc3QgY29uZGl0aW9uSWQgPSBiYWNrZW5kLmRhdGFJZE1hcC5nZXQoY29uZGl0aW9uLmRhdGFJZCkuaWQ7XG4gIGNvbnN0IHRJZCA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldCh0LmRhdGFJZCkuaWQ7XG4gIGNvbnN0IGVJZCA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldChlLmRhdGFJZCkuaWQ7XG4gIGNvbnN0IG91dCA9IGJhY2tlbmQubWFrZU91dHB1dCh0LnNoYXBlLCB0LmR0eXBlKTtcbiAgY29uc3Qgb3V0SWQgPSBiYWNrZW5kLmRhdGFJZE1hcC5nZXQob3V0LmRhdGFJZCkuaWQ7XG5cbiAgY29uc3QgY1JhbmsgPSBjb25kaXRpb24uc2hhcGUubGVuZ3RoO1xuICBjb25zdCB0UmFuayA9IHQuc2hhcGUubGVuZ3RoO1xuXG4gIGNvbnN0IG9mZnNldCA9IGNSYW5rID09PSAwIHx8IGNSYW5rID4gMSB8fCB0UmFuayA9PT0gMSA/XG4gICAgICAxIDpcbiAgICAgIHV0aWwuc2l6ZUZyb21TaGFwZSh0LnNoYXBlLnNsaWNlKDEpKTtcblxuICB3YXNtU2VsZWN0KGNvbmRpdGlvbklkLCB0SWQsIGVJZCwgb2Zmc2V0LCBvdXRJZCk7XG4gIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogU2VsZWN0LFxuICBiYWNrZW5kTmFtZTogJ3dhc20nLFxuICBrZXJuZWxGdW5jOiBzZWxlY3QgYXMgdW5rbm93biBhcyBLZXJuZWxGdW5jLFxuICBzZXR1cEZ1bmM6IHNldHVwXG59O1xuIl19