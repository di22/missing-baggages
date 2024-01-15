import { FormControl } from "@angular/forms";

export interface BaggageContentGroupItem {
    contentName: FormControl<string | null>;
    price: FormControl<number | null>;
    quantity: FormControl<number | null>;
  }

  export interface LostBaggageFormValue {
    date: Date;
    origin: string;
    destination: string;
    code: string;
    baggagesCount: number;
    bagsContents?: Array<{
      contentName?: string;
      price?: number;
      quantity?: number;
    }>;
}