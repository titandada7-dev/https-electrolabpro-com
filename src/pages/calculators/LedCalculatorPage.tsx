import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("led")!;
const LedCalculatorPage = () => <CalculatorRoutePage meta={meta} />;
export default LedCalculatorPage;
