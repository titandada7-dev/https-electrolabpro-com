import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("resistor")!;
const ResistorCalculatorPage = () => <CalculatorRoutePage meta={meta} />;
export default ResistorCalculatorPage;
