import { createGuid } from './utils';

describe('createGuid', () => {
  it('returns truthy guid value', () => {
    expect(createGuid()).toBeTruthy();
  });

  it('returns 36 character guid value', () => {
    expect(createGuid().length).toEqual(36);
  });
});
