export class WriteError extends Error {
  constructor(streamName: string) {
    super(`Could not write to \`${streamName}\`.`);
  }
}
