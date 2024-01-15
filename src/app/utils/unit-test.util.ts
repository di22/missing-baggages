import { DebugElement } from "@angular/core";

export function fetchValue(element: DebugElement, value: string): void {
    element.nativeElement.dispatchEvent(new Event('focusin'));
    element.nativeElement.value = value;
    element.nativeElement.dispatchEvent(new Event('input'));
    element.nativeElement.dispatchEvent(new Event('click'));
}