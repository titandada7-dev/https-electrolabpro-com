import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("divider")!;
const VoltageDividerPage = () => <CalculatorRoutePage meta={meta} />;
export default VoltageDividerPage;
