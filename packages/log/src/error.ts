/**
 * Error for when logs fail to write to stdout/stderr.
 */
export class WriteError extends Error {
  /**
   * Creates a new error for stream writes.
   * @param streamName The name of the stream.
   */
  constructor(streamName: string) {
    super(`Could not write to \`${streamName}\`.`);
  }
}
