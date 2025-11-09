import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');
    const fakeFunc = jest.fn();

    doStuffByTimeout(fakeFunc, 500);
    expect(timer).toHaveBeenCalledWith(fakeFunc, 500);
    timer.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const fakeFunc = jest.fn();
    doStuffByTimeout(fakeFunc, 500);
    expect(fakeFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(fakeFunc).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setInterval');
    const fakeFunc = jest.fn();

    doStuffByInterval(fakeFunc, 500);
    expect(timer).toHaveBeenCalledWith(fakeFunc, 500);
    timer.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timer = jest.spyOn(global, 'setInterval');
    const intervalsCount = 4;
    const fakeFunc = jest.fn();

    doStuffByInterval(fakeFunc, 500);
    expect(fakeFunc).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500 * intervalsCount);

    expect(fakeFunc).toHaveBeenCalledTimes(intervalsCount);
    timer.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const file = 'somefile.txt';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('somefile.txt');
    expect(joinSpy).toHaveBeenCalledWith(__dirname, file);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const file = 'somefile.txt';
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(file);

    expect(result).toBeNull();
    existsSpy.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const content = 'some content';
    const file = 'somefile.txt';
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');
    readFileSpy.mockResolvedValue(Buffer.from(content));

    const result = await readFileAsynchronously(file);
    expect(result).toBe(content);

    existsSpy.mockRestore();
    readFileSpy.mockRestore();
  });
});
