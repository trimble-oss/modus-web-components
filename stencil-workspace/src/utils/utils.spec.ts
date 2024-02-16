import { createGuid, generateElementId } from './utils';

describe('createGuid', () => {
  it('returns truthy guid value', () => {
    expect(createGuid()).toBeTruthy();
  });

  it('returns 36 character guid value', () => {
    expect(createGuid().length).toEqual(36);
  });
});

describe('generateElementId', () => {
  it('first run return 0 at the end', () => {
    expect(generateElementId()).toEqual('mwc_id_0');
  });

  it('second run return 1 at the end', () => {
    expect(generateElementId()).toEqual('mwc_id_1');
  });
});
