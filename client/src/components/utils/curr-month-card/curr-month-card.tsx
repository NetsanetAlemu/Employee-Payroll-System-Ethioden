import { useEffect, useState } from "react";
// import { BoldText } from "../titles/text";
import { LargeText } from "../titles/titles";
// import Piechart from "./bar";
import Chart from "react-apexcharts"; // Import the Chart component from react-apexcharts

import { MonthCardBody, MonthCardContainer } from "./curr-month-card.style";
import { useStatistics } from "../../../hooks/statistics-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getStatRequest } from "../../../store/statistics/statistics-slice";
import {
  AllowanceResponse,
  DeductionResponse,
  OvertimeResponse,
} from "../../../typo/statistics/response";
import { ThreeDots } from "../loading/dots";
import CountUp from "react-countup";

interface Props {
  statType: string;
}
interface ChartData {
  series: number[];
  labels: string[];
}
export const MonthCard = ({ statType }: Props) => {
  const { stat, loading } = useStatistics();
  const dispatcher = useAppDispatch();
  const [allowanceData, setAllowanceData] = useState<ChartData>({
    series: [],
    labels: [],
  });
  const [deductiontData, setDeductionData] = useState<ChartData>({
    series: [],
    labels: [],
  });
  const [overtimetData, setOvertimeData] = useState<ChartData>({
    series: [],
    labels: [],
  });

  const colors = [
    "#c24949",
    "#00df7f",
    "#faee03",
    "#3b8ad9",
    "#f7a35c",
    "#9567e2",
    "#49a9c2",
    "#f15c80",
  ];

  useEffect(() => {
    if (stat.curr_month_allowance) {
      const series = stat.curr_month_allowance.map(
        (allowance: AllowanceResponse) => allowance.amount || 0
      );
      const labels = stat.curr_month_allowance.map(
        (allowance: AllowanceResponse) => allowance.allowance_type
      );

      setAllowanceData({
        series: series,
        labels: labels,
      });
    }
  }, [stat.curr_month_allowance]);
  useEffect(() => {
    if (stat.curr_month_deduction) {
      const series = stat.curr_month_deduction.map(
        (deduction: DeductionResponse) => deduction.amount || 0
      );
      const labels = stat.curr_month_deduction.map(
        (deduction: DeductionResponse) => deduction.deduction_type
      );

      setDeductionData({
        series: series,
        labels: labels,
      });
    }
  }, [stat.curr_month_deduction]);

  useEffect(() => {
    if (stat.curr_month_overtime) {
      const series = stat.curr_month_overtime.map(
        (overtime: OvertimeResponse) => overtime.amount || 0
      );
      const labels = stat.curr_month_overtime.map(
        (overtime: OvertimeResponse) => overtime.overtime_type
      );

      setOvertimeData({
        series: series,
        labels: labels,
      });
    }
  }, [stat.curr_month_overtime]);
  useEffect(() => {
    dispatcher(getStatRequest());
  }, [dispatcher]);
  if (statType === "allowance") {
    return (
      <MonthCardContainer>
        {loading ? (
          <ThreeDots size={1} />
        ) : (
          <>
            <MonthCardBody>
              <>
                <div className="container-fluid m-3">
                  <Chart
                    type="pie"
                    width={350}
                    height={350}
                    series={allowanceData.series}
                    options={{
                      title: { text: "Allowances" },
                      noData: { text: "Empty Data" },
                      colors: colors.slice(0, allowanceData.series.length),
                      labels: allowanceData.labels,
                    }}
                  />
                </div>
              </>{" "}
            </MonthCardBody>
            <LargeText>
              <CountUp
                start={0}
                delay={2}
                duration={5}
                end={stat.curr_month_allowances}
                suffix="+ ETB"
                prefix="Total: "
                decimals={2}
              />
            </LargeText>
          </>
        )}
      </MonthCardContainer>
    );
  } else if (statType === "deduction") {
    return (
      <MonthCardContainer>
        {loading ? (
          <ThreeDots size={1} />
        ) : (
          <>
            <MonthCardBody>
              <>
                <div className=" m-3">
                  <Chart
                    type="pie"
                    width={375}
                    height={375}
                    series={deductiontData.series}
                    options={{
                      title: { text: "Deductions" },
                      noData: { text: "Empty Data" },
                      colors: colors.slice(0, deductiontData.series.length),
                      labels: deductiontData.labels,
                    }}
                  />
                </div>
              </>{" "}
            </MonthCardBody>
            <LargeText>
              <CountUp
                start={0}
                delay={2}
                duration={5}
                end={stat.curr_month_deductions}
                suffix="+ ETB"
                prefix="Total: "
                decimals={2}
              />
            </LargeText>
          </>
        )}
      </MonthCardContainer>
    );
  } else if (statType === "overtime") {
    return (
      <MonthCardContainer>
        {loading ? (
          <ThreeDots size={1} />
        ) : (
          <>
            <MonthCardBody>
              <>
                <div className="container-fluid m-3">
                  <Chart
                    type="pie"
                    width={350}
                    height={350}
                    series={overtimetData.series}
                    options={{
                      title: { text: "Overtime PieChart" },
                      noData: { text: "Empty Data" },
                      colors: colors.slice(0, overtimetData.series.length),
                      labels: overtimetData.labels,
                    }}
                  ></Chart>
                </div>
              </>{" "}
            </MonthCardBody>
            <LargeText>
              <CountUp
                start={0}
                delay={2}
                duration={5}
                end={stat.curr_month_overtimes}
                suffix="+ ETB"
                prefix="Total: "
                decimals={2}
              />
            </LargeText>
          </>
        )}
      </MonthCardContainer>
    );
  }
};
