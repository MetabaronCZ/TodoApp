import { describe, expect, it } from '@jest/globals';

import { Folder } from 'models/Folder';
import { sortFolders } from 'models/Folders';

const testArray: Folder[] = [
  { id: '1', title: 'Item 1' },
  { id: '3', title: 'Item 3' },
  { id: '2', title: 'Item 2' },
  { id: '4', title: 'Item 4' },
];

describe('models/Folders', () => {
  describe('sortFolders()', () => {
    it('should return new array', () => {
      const data = [...testArray];

      // new array created
      const result = sortFolders(data, 'TITLE_DESC');
      expect(result).not.toEqual(data);

      // "data" array has been not changed
      testArray.forEach((item, i) => {
        expect(item).toEqual(data[i]);
      });
    });

    it('should return array with same length', () => {
      let data = [...testArray];
      let result = sortFolders(data, 'TITLE_ASC');
      expect(result.length).toEqual(data.length);

      data = [];
      result = sortFolders(data, 'TITLE_ASC');
      expect(result.length).toEqual(0);
    });

    it('should sort by title', () => {
      const data = [...testArray];

      let result = sortFolders(data, 'TITLE_ASC');
      expect(result[0].title).toEqual('Item 1');
      expect(result[1].title).toEqual('Item 2');
      expect(result[2].title).toEqual('Item 3');
      expect(result[3].title).toEqual('Item 4');

      result = sortFolders(data, 'TITLE_DESC');
      expect(result[0].title).toEqual('Item 4');
      expect(result[1].title).toEqual('Item 3');
      expect(result[2].title).toEqual('Item 2');
      expect(result[3].title).toEqual('Item 1');
    });

    it('should put empty titles to correct position within the array', () => {
      const data: Folder[] = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: '' },
        { id: '3', title: 'Item 3' },
      ];

      let result = sortFolders(data, 'TITLE_ASC');
      expect(result[0].title).toEqual('');
      expect(result[1].title).toEqual('Item 1');
      expect(result[2].title).toEqual('Item 3');

      result = sortFolders(data, 'TITLE_DESC');
      expect(result[0].title).toEqual('Item 3');
      expect(result[1].title).toEqual('Item 1');
      expect(result[2].title).toEqual('');
    });
  });
});
