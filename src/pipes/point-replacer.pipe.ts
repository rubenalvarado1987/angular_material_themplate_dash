import { Pipe } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Pipe({
    name: 'pointReplacer'
})
export class PointReplacerPipe extends DecimalPipe {

    transform(value: any, digits?: string): string {
        if (value !== undefined && value !== null && !Number.isNaN(value)) {
            var str = super.transform(value, digits).replace(/\./gi, '|');
            str = str.replace(/,/gi, '.');
            str = str.replace(/\|/gi, ',');
            
            return str;
        }
        return '0';



    }
}