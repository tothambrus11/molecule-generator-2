class ArrayHelper {
    /**
     * Returns true if the given array contains the thing.
     * @param array
     * @param thing
     */
    public static contains(array: any[], thing: any): boolean {
        return array.indexOf(thing) >= 0;
    }
}
