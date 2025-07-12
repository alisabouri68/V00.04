export default {
    "plugins": [
        ["module-resolver", {
            "root": ["./src"],
            "alias": {
                "COMPs": "./src/COMPs",
                "MWDGs": "./src/MWDGs"
                // Add more aliases as needed
            }
        }]
    ]
}