import { Budget } from "./budget";
import { Order } from "./order";

export function Report({ data }) {
  if (!data) {
    return null;
  }

  if (data.type === "order") {
    return <Order order={data} />;
  }

  if (data.type === "budget") {
    return <Budget budget={data} />;
  }

  return null;
}
