import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("reactance")!;
const CapacitiveReactancePage = () => <CalculatorRoutePage meta={meta} />;
export default CapacitiveReactancePage;
