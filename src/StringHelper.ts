class StringHelper {
    /**
     * @param text The long text
     * @param endStrings
     */
    static findLongestStringAtTheEnd(text: string, endStrings: string[]): string {
        let longestStringIndex: number | null = null;

        function getLongestEndString(){
            return endStrings[longestStringIndex];
        }

        endStrings.forEach((endString, index) => {
            if (text.endsWith(endString)) {
                if(longestStringIndex == null || getLongestEndString().length < endString.length) {
                    longestStringIndex = index;
                }
            }
        });

        if(longestStringIndex === null){
            throw new Error("End not found");
        }
        return endStrings[longestStringIndex];
    }
}
