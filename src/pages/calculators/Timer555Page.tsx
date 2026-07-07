import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("timer")!;
const Timer555Page = () => <CalculatorRoutePage meta={meta} />;
export default Timer555Page;
