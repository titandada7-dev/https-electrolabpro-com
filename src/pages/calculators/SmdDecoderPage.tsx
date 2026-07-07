import CalculatorRoutePage from "./CalculatorRoutePage";
import { findCalculatorMeta } from "@/data/calculatorRoutes";

const meta = findCalculatorMeta("smd")!;
const SmdDecoderPage = () => <CalculatorRoutePage meta={meta} />;
export default SmdDecoderPage;
