/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
import { scatter_util, ScatterNd, util } from '@tensorflow/tfjs-core';
import { CppDType } from './types';
let wasmScatterNd;
function setup(backend) {
    wasmScatterNd = backend.wasm.cwrap(ScatterNd, null /*void*/, [
        'number',
        'number',
        'number',
        'number',
        'number',
        'number',
        'array',
        'number',
        'number' // outId
    ]);
}
function scatterNd(args) {
    const { backend, inputs, attrs } = args;
    const { indices, updates } = inputs;
    const { shape } = attrs;
    const out = backend.makeOutput(shape, updates.dtype);
    if (util.sizeFromShape(shape) === 0) {
        return out;
    }
    const { sliceRank, numUpdates, sliceSize, strides, outputSize } = scatter_util.calculateShapes(updates, indices, shape);
    const indicesData = backend.dataIdMap.get(indices.dataId);
    const indicesId = indicesData.id;
    const updatesData = backend.dataIdMap.get(updates.dataId);
    const updatesId = updatesData.id;
    const stridesBytes = new Uint8Array(new Int32Array(strides).buffer);
    const outId = backend.dataIdMap.get(out.dataId).id;
    wasmScatterNd(indicesId, updatesId, CppDType[updates.dtype], sliceRank, numUpdates, sliceSize, stridesBytes, outputSize, outId);
    return out;
}
export const scatterNdConfig = {
    kernelName: ScatterNd,
    backendName: 'wasm',
    setupFunc: setup,
    kernelFunc: scatterNd
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NhdHRlck5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdhc20vc3JjL2tlcm5lbHMvU2NhdHRlck5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBMkIsWUFBWSxFQUFFLFNBQVMsRUFBK0MsSUFBSSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJM0ksT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUVqQyxJQUFJLGFBRzBDLENBQUM7QUFFL0MsU0FBUyxLQUFLLENBQUMsT0FBb0I7SUFDakMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzNELFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLE9BQU87UUFDUCxRQUFRO1FBQ1IsUUFBUSxDQUFHLFFBQVE7S0FDcEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUNkLElBQzBFO0lBRTVFLE1BQU0sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxHQUFHLE1BQU0sQ0FBQztJQUNsQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsS0FBSyxDQUFDO0lBRXRCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxNQUFNLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBQyxHQUN6RCxZQUFZLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFMUQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFFakMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFFakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNuRCxhQUFhLENBQ1QsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQ3BFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWhELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBaUI7SUFDM0MsVUFBVSxFQUFFLFNBQVM7SUFDckIsV0FBVyxFQUFFLE1BQU07SUFDbkIsU0FBUyxFQUFFLEtBQUs7SUFDaEIsVUFBVSxFQUFFLFNBQWtDO0NBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7S2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBzY2F0dGVyX3V0aWwsIFNjYXR0ZXJOZCwgU2NhdHRlck5kQXR0cnMsIFNjYXR0ZXJOZElucHV0cywgVGVuc29ySW5mbywgdXRpbH0gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlJztcblxuaW1wb3J0IHtCYWNrZW5kV2FzbX0gZnJvbSAnLi4vYmFja2VuZF93YXNtJztcblxuaW1wb3J0IHtDcHBEVHlwZX0gZnJvbSAnLi90eXBlcyc7XG5cbmxldCB3YXNtU2NhdHRlck5kOiAoXG4gICAgaW5kaWNlc0lkOiBudW1iZXIsIHVwZGF0ZXNJZDogbnVtYmVyLCBkdHlwZTogQ3BwRFR5cGUsIHNsaWNlUmFuazogbnVtYmVyLFxuICAgIG51bVVwZGF0ZXM6IG51bWJlciwgc2xpY2VTaXplOiBudW1iZXIsIHN0cmlkZXM6IFVpbnQ4QXJyYXksXG4gICAgb3V0cHV0U2l6ZTogbnVtYmVyLCBvdXRJZDogbnVtYmVyKSA9PiB2b2lkO1xuXG5mdW5jdGlvbiBzZXR1cChiYWNrZW5kOiBCYWNrZW5kV2FzbSk6IHZvaWQge1xuICB3YXNtU2NhdHRlck5kID0gYmFja2VuZC53YXNtLmN3cmFwKFNjYXR0ZXJOZCwgbnVsbCAvKnZvaWQqLywgW1xuICAgICdudW1iZXInLCAgLy8gaW5kaWNlc0lkXG4gICAgJ251bWJlcicsICAvLyB1cGRhdGVzSWRcbiAgICAnbnVtYmVyJywgIC8vIGR0eXBlXG4gICAgJ251bWJlcicsICAvLyBzbGljZVJhbmtcbiAgICAnbnVtYmVyJywgIC8vIG51bVVwZGF0ZXNcbiAgICAnbnVtYmVyJywgIC8vIHNsaWNlU2l6ZVxuICAgICdhcnJheScsICAgLy8gc3RyaWRlc1xuICAgICdudW1iZXInLCAgLy8gb3V0cHV0U2l6ZVxuICAgICdudW1iZXInICAgLy8gb3V0SWRcbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHNjYXR0ZXJOZChcbiAgICBhcmdzOlxuICAgICAgICB7YmFja2VuZDogQmFja2VuZFdhc20sIGlucHV0czogU2NhdHRlck5kSW5wdXRzLCBhdHRyczogU2NhdHRlck5kQXR0cnN9KTpcbiAgICBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2JhY2tlbmQsIGlucHV0cywgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge2luZGljZXMsIHVwZGF0ZXN9ID0gaW5wdXRzO1xuICBjb25zdCB7c2hhcGV9ID0gYXR0cnM7XG5cbiAgY29uc3Qgb3V0ID0gYmFja2VuZC5tYWtlT3V0cHV0KHNoYXBlLCB1cGRhdGVzLmR0eXBlKTtcbiAgaWYgKHV0aWwuc2l6ZUZyb21TaGFwZShzaGFwZSkgPT09IDApIHtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgY29uc3Qge3NsaWNlUmFuaywgbnVtVXBkYXRlcywgc2xpY2VTaXplLCBzdHJpZGVzLCBvdXRwdXRTaXplfSA9XG4gICAgICBzY2F0dGVyX3V0aWwuY2FsY3VsYXRlU2hhcGVzKHVwZGF0ZXMsIGluZGljZXMsIHNoYXBlKTtcblxuICBjb25zdCBpbmRpY2VzRGF0YSA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldChpbmRpY2VzLmRhdGFJZCk7XG4gIGNvbnN0IGluZGljZXNJZCA9IGluZGljZXNEYXRhLmlkO1xuXG4gIGNvbnN0IHVwZGF0ZXNEYXRhID0gYmFja2VuZC5kYXRhSWRNYXAuZ2V0KHVwZGF0ZXMuZGF0YUlkKTtcbiAgY29uc3QgdXBkYXRlc0lkID0gdXBkYXRlc0RhdGEuaWQ7XG5cbiAgY29uc3Qgc3RyaWRlc0J5dGVzID0gbmV3IFVpbnQ4QXJyYXkobmV3IEludDMyQXJyYXkoc3RyaWRlcykuYnVmZmVyKTtcblxuICBjb25zdCBvdXRJZCA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldChvdXQuZGF0YUlkKS5pZDtcbiAgd2FzbVNjYXR0ZXJOZChcbiAgICAgIGluZGljZXNJZCwgdXBkYXRlc0lkLCBDcHBEVHlwZVt1cGRhdGVzLmR0eXBlXSwgc2xpY2VSYW5rLCBudW1VcGRhdGVzLFxuICAgICAgc2xpY2VTaXplLCBzdHJpZGVzQnl0ZXMsIG91dHB1dFNpemUsIG91dElkKTtcblxuICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgY29uc3Qgc2NhdHRlck5kQ29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IFNjYXR0ZXJOZCxcbiAgYmFja2VuZE5hbWU6ICd3YXNtJyxcbiAgc2V0dXBGdW5jOiBzZXR1cCxcbiAga2VybmVsRnVuYzogc2NhdHRlck5kIGFzIHVua25vd24gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==