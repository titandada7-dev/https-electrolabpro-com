import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("rc")!;
const RCFilterPage = () => <CalculatorRoutePage meta={meta} />;
export default RCFilterPage;
