export class CommonFunctions {
  public static round(value: number, decimals: number): number {
	return +(Math.round( +(value * Math.pow(10, decimals)).toFixed(decimals) ) * Math.pow(10,-decimals)).toFixed(decimals);
  }	
}
