/* vue-onsenui v2.6.2 - 2019-01-06 */

import ons from 'onsenui/esm';

var setup = function (ons$$1) {
  return Object.keys(ons$$1).filter(function (k) {
    return [/^is/, /^disable/, /^enable/, /^mock/, /^open/, /^set/, /animit/, /elements/, /fastClick/, /GestureDetector/, /notification/, /orientation/, /platform/, /ready/].some(function (t) {
      return k.match(t);
    });
  }).reduce(function (r, k) {
    r[k] = ons$$1[k];
    return r;
  }, { _ons: ons$$1 });
};

var $ons = setup(ons);

$ons.install = function (Vue) {
  Vue.prototype.$ons = $ons;
};

export default $ons;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyIsIi4uL3NyYy9pbmRleC5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob25zKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvbnMpXG4gICAgLmZpbHRlcihrID0+IFtcbiAgICAgIC9eaXMvLFxuICAgICAgL15kaXNhYmxlLyxcbiAgICAgIC9eZW5hYmxlLyxcbiAgICAgIC9ebW9jay8sXG4gICAgICAvXm9wZW4vLFxuICAgICAgL15zZXQvLFxuICAgICAgL2FuaW1pdC8sXG4gICAgICAvZWxlbWVudHMvLFxuICAgICAgL2Zhc3RDbGljay8sXG4gICAgICAvR2VzdHVyZURldGVjdG9yLyxcbiAgICAgIC9ub3RpZmljYXRpb24vLFxuICAgICAgL29yaWVudGF0aW9uLyxcbiAgICAgIC9wbGF0Zm9ybS8sXG4gICAgICAvcmVhZHkvLFxuICAgIF0uc29tZSh0ID0+IGsubWF0Y2godCkpKVxuICAgIC5yZWR1Y2UoKHIsIGspID0+IHtcbiAgICAgIHJba10gPSBvbnNba107XG4gICAgICByZXR1cm4gcjtcbiAgICB9LCB7IF9vbnM6IG9ucyB9KTtcbn1cbiIsImltcG9ydCBvbnMgZnJvbSAnb25zZW51aS9lc20nO1xuaW1wb3J0IHNldHVwIGZyb20gJy4vc2V0dXAnO1xuXG5jb25zdCAkb25zID0gc2V0dXAob25zKTtcblxuJG9ucy5pbnN0YWxsID0gKFZ1ZSwgcGFyYW1zID0ge30pID0+IHtcbiAgLyoqXG4gICAqIEV4cG9zZSBvbnMgb2JqZWN0LlxuICAgKi9cbiAgVnVlLnByb3RvdHlwZS4kb25zID0gJG9ucztcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICRvbnM7XG4iXSwibmFtZXMiOlsib25zIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsInNvbWUiLCJrIiwibWF0Y2giLCJ0IiwicmVkdWNlIiwiciIsIl9vbnMiLCIkb25zIiwic2V0dXAiLCJpbnN0YWxsIiwiVnVlIiwicHJvdG90eXBlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsWUFBZSxVQUFTQSxNQUFULEVBQWM7U0FDcEJDLE9BQU9DLElBQVAsQ0FBWUYsTUFBWixFQUNKRyxNQURJLENBQ0c7V0FBSyxDQUNYLEtBRFcsRUFFWCxVQUZXLEVBR1gsU0FIVyxFQUlYLE9BSlcsRUFLWCxPQUxXLEVBTVgsTUFOVyxFQU9YLFFBUFcsRUFRWCxVQVJXLEVBU1gsV0FUVyxFQVVYLGlCQVZXLEVBV1gsY0FYVyxFQVlYLGFBWlcsRUFhWCxVQWJXLEVBY1gsT0FkVyxFQWVYQyxJQWZXLENBZU47YUFBS0MsRUFBRUMsS0FBRixDQUFRQyxDQUFSLENBQUw7S0FmTSxDQUFMO0dBREgsRUFpQkpDLE1BakJJLENBaUJHLFVBQUNDLENBQUQsRUFBSUosQ0FBSixFQUFVO01BQ2RBLENBQUYsSUFBT0wsT0FBSUssQ0FBSixDQUFQO1dBQ09JLENBQVA7R0FuQkcsRUFvQkYsRUFBRUMsTUFBTVYsTUFBUixFQXBCRSxDQUFQOzs7QUNFRixJQUFNVyxPQUFPQyxNQUFNWixHQUFOLENBQWI7O0FBRUFXLEtBQUtFLE9BQUwsR0FBZSxVQUFDQyxHQUFELEVBQXNCO01BSS9CQyxTQUFKLENBQWNKLElBQWQsR0FBcUJBLElBQXJCO0NBSkY7Ozs7In0=
