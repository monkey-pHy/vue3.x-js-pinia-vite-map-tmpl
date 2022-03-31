import * as urlGlobal from "../urlGlobal.js";
import { request } from "../axios.js";
function requestTest(params) {
  return request(
    "post",
    urlGlobal.getHourlyIndexCompare,
    JSON.stringify(params)
  );
}
export { requestTest };
