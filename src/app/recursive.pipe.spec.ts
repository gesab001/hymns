import { RecursivePipe } from './recursive.pipe';

describe('RecursivePipe', () => {
  it('create an instance', () => {
    const pipe = new RecursivePipe();
    expect(pipe).toBeTruthy();
  });
});
