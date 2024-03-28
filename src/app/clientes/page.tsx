import { LPage } from "@/components/lp";
import { Button } from "@/components/ui/button";

export default function Clients() {
  return (
    <LPage title="Clientes">
      <h3 className="text-2xl font-bold tracking-tight">
        You have no products
      </h3>
      <p className="text-sm text-muted-foreground">
        You can start selling as soon as you add a product.
      </p>
      <Button className="mt-4">Add Product</Button>
    </LPage>
  );
}
