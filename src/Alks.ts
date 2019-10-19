class Alks {
    static prefixes = [
        "met",
        "et",
        "prop",
        "but",
        "pent",
        "hex",
        "hept",
        "okt",
        "non",
        "dek",
        "undek",
        "dodek"
    ];

    static numberPrefixes = [
        "",
        "di",
        "tri",
        "tetra",
        "penta",
        "hexa",
        "hepta",
        "okta",
        "nona",
        "deka",
        "undeka",
        "dodeka"
    ];

    static getCNumber(name: string) {
        let index = Alks.prefixes.indexOf(name);
        if (index === -1) {
            throw new Error("Alk prefix name not found");
        }
        return index + 1;
    }
}
