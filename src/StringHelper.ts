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

    /**
     * @param text The long text
     * @param startStrings
     */
    static findLongestStringAtTheBeginning(text: string, startStrings: string[]): string {
        let longestStringIndex: number | null = null;

        function getLongestStartString(){
            return startStrings[longestStringIndex];
        }

        startStrings.forEach((startString, index) => {
            if (text.startsWith(startString)) {
                if(longestStringIndex == null || getLongestStartString().length < startString.length) {
                    longestStringIndex = index;
                }
            }
        });

        if(longestStringIndex === null){
            throw new Error("Start not found");
        }
        return startStrings[longestStringIndex];
    }


}
