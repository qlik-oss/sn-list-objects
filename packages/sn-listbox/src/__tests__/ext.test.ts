import ext from '../ext';

describe('ext', () => {
  it('should return correct definition', () => {
    expect(ext).toEqual({
      support: {
        snapshot: false,
        export: true,
        sharing: false,
        exportData: true,
        viewData: true,
      },
    });
  });
});
