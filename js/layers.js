addLayer("p", {
    name: "Silicone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#454747",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Silicone Chunks", // Name of prestige currency
    baseResource: "Silicone", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 15)) mult = mult.times(upgradeEffect('p', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Silicone Chunks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Buy yourself a pickaxe for the Silicone Chunks.",
            description: "Double your Silicone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Dual Wielding",
            description: "Double it again!",
            cost: new Decimal(3),
        },
        13: {
            title: "Pay your 'friend' to help you.",
            description: "Increase Silicone gain by 50%.",
            cost: new Decimal(5),
        },
        14: {
            title: "i dont know how this works ¯\_(ツ)_/¯",
            description: "Chunks boosts Silicone.",
            cost: new Decimal(8),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "100% magic at this point",
            description: "Silicone Boosts Chunks",
            cost: new Decimal(15),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        }
    }
})
