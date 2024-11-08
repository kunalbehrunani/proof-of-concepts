const Inspector = require('inspector-api');

const config = require('config');

const sleep = require('util').promisify(setTimeout);
const EventEmitter = require('events');

const profilingEmitter = new EventEmitter();

const inspector = new Inspector({
    storage: {
        type: 's3',
        bucket: config.profiler.s3_bucket,
        dir: config.profiler.directory,
    }
});

/**
 * Start CPU profiling session
 * @param duration
 * @returns {Promise<boolean>}
 */
export const startCpuProfiling = async (duration) => {
    try {
        await inspector.profiler.enable();
        await inspector.profiler.start();
        logger.info('.....emitting event CPUProfiling');
        return profilingEmitter.emit('CPUProfiling', {
            inspector: inspector, duration: duration
        });
    } catch (ex) {
        throw ex;
    }
};

profilingEmitter.on('CPUProfiling',
    async ({ inspector, duration }) => {
        try {
            await sleep(duration * 1000);
            await inspector.profiler.stop();
        } catch (ex) {
            console.log('error in CPUProfiling: ', ex);
            throw ex;
        }
    });

/**
 * End CPU profiling session
 * @returns {Promise<void>}
 */
export const stopCpuProfiling = async () => {
    try {
        await inspector.profiler.stop();
    } catch (ex) {
        throw ex;
    }
};

/**
 * Start memory profiling session
 * @returns {Promise<void>}
 */
export const startMemoryProfiling = async () => {
    try {
        await inspector.heap.enable();
        await inspector.heap.startSampling();
    } catch (ex) {
        throw ex;
    }
};

/**
 * End memory profiling session
 * @returns {Promise<void>}
 */
export const stopMemoryProfiling = async () => {
    try {
        await inspector.heap.stopSampling();
    } catch (ex) {
        throw ex;
    }
};

/**
 * Take memory snapshot
 * @returns {Promise<void>}
 */
export const takeMemorySnapshot = async () => {
    try {
        await inspector.heap.enable();
        await inspector.heap.takeSnapshot();
    } catch (ex) {
        throw ex;
    }
};

/**
 * Start code coverage profiling session
 * @returns {Promise<void>}
 */
export const startCodeCoverageProfiling = async () => {
    try {
        await inspector.profiler.enable();
        await inspector.profiler.startPreciseCoverage({ callCount: true, detailed: true });
    } catch (ex) {
        throw ex;
    }
};

/**
 * End code coverage profiling session
 * @returns {Promise<void>}
 */
export const stopCodeCoverageProfiling = async () => {
    try {
        await inspector.profiler.takePreciseCoverage();
        await inspector.profiler.stopPreciseCoverage();
    } catch (ex) {
        throw ex;
    }
};

// module.exports = {
//     stopCodeCoverageProfiling,
//     startCodeCoverageProfiling,
//     takeMemorySnapshot,
//     stopMemoryProfiling,
//     startMemoryProfiling,
//     startCpuProfiling,
//     stopCpuProfiling
// };
