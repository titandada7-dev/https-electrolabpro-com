import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("ohm")!;
const OhmCalculatorPage = () => <CalculatorRoutePage meta={meta} />;
export default OhmCalculatorPage;
