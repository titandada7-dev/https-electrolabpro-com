import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("units")!;
const UnitConverterPage = () => <CalculatorRoutePage meta={meta} />;
export default UnitConverterPage;
