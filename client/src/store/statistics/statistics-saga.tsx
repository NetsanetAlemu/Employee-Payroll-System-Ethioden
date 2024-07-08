import { StatResponse } from "../../typo/statistics/response";
import { call, put, takeEvery } from "redux-saga/effects";
import StatisticsAPI from "../../services/statistics-api";
import { getStatDone } from "./statistics-slice";
import { setFlashMessage } from "../notification/flash-messsage-slice";

function* getStatistics() {
  try {
    const response: StatResponse = yield call(StatisticsAPI.getStatistics);
    if (response.code === 200) {
      yield put(getStatDone(response.stat));
    } else if (response.code === 401) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Unauthorized",
          desc: "Please check your credentials",
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchStatisticsRequest() {
  yield takeEvery("statistics/getStatRequest", getStatistics);
}
