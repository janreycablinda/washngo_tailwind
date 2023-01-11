import { ChartEffects } from "app/modules/admin/dashboard/store/chart/chart.effects";
import { DiscountsEffects } from "app/modules/admin/transactions/sales/store/discounts/discounts.effects";
import { SalesEffects } from "app/modules/admin/transactions/sales/store/sales/sales.effects";
import { CategoryEffects } from "./category/category.effects";
import { ServicesEffects } from "./services/services.effects";
import { VehiclesEffects } from "./vehicles/vehicles.effects";

export const AppEffects = [
  ChartEffects,
  VehiclesEffects,
  CategoryEffects,
  ServicesEffects,
  DiscountsEffects,
  SalesEffects
];