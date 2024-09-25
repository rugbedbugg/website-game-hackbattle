import { createElement, useState, useEffect } from 'react';

class BlackJack {
    constructor() {
        this.deck = [];
        this.random = Math.random; // shuffle deck

        // dealer
        this.hiddenCard = null;
        this.dealerHand = [];
        this.dealerSum = 0;
        this.dealerAceCount = 0;

        // player
        this.playerHand = [];
        this.playerSum = 0;
        this.playerAceCount = 0;

        // window dimensions
        this.boardWidth = 600;
        this.boardHeight = this.boardWidth;

        this.cardWidth = 110; // ratio should be 1/1.4
        this.cardHeight = 154;

        this.startGame();
    }

    Card(value, type) {
        this.value = value;
        this.type = type;
    }

    Card.prototype.toString = function() {
        return `${this.value}-${this.type}`;
    };

    Card.prototype.getValue = function() {
        if ("AJQK".includes(this.value)) { // A J Q K
            if (this.value === "A") {
                return 11;
            }
            return 10;
        }
        return parseInt(this.value); // 2-10
    };

    Card.prototype.isAce = function() {
        return this.value === "A";
    };

    Card.prototype.getImagePath = function() {
        return `./cards/${this.toString()}.png`;
    };

    startGame() {
        this.buildDeck();
        this.shuffleDeck();

        // dealer
        this.dealerHand = [];
        this.dealerSum = 0;
        this.dealerAceCount = 0;

        this.hiddenCard = this.deck.pop(); // remove card at last index
        this.dealerSum += this.hiddenCard.getValue();
        this.dealerAceCount += this.hiddenCard.isAce() ? 1 : 0;

        let card = this.deck.pop();
        this.dealerSum += card.getValue();
        this.dealerAceCount += card.isAce() ? 1 : 0;
        this.dealerHand.push(card);

        console.log("DEALER:");
        console.log(this.hiddenCard);
        console.log(this.dealerHand);
        console.log(this.dealerSum);
        console.log(this.dealerAceCount);

        // player
        this.playerHand = [];
        this.playerSum = 0;
        this.playerAceCount = 0;

        for (let i = 0; i < 2; i++) {
            card = this.deck.pop();
            this.playerSum += card.getValue();
            this.playerAceCount += card.isAce() ? 1 : 0;
            this.playerHand.push(card);
        }

        console.log("PLAYER: ");
        console.log(this.playerHand);
        console.log(this.playerSum);
        console.log(this.playerAceCount);
    }

    buildDeck() {
        this.deck = [];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const types = ["C", "D", "H", "S"];

        for (let type of types) {
            for (let value of values) {
                const card = new this.Card(value, type);
                this.deck.push(card);
            }
        }

        console.log("BUILD DECK:");
        console.log(this.deck);
    }

    shuffleDeck() {
        for (let i = 0; i < this.deck.length; i++) {
            const j = Math.floor(this.random() * this.deck.length);
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }

        console.log("AFTER SHUFFLE");
        console.log(this.deck);
    }

    reducePlayerAce() {
        while (this.playerSum > 21 && this.playerAceCount > 0) {
            this.playerSum -= 10;
            this.playerAceCount -= 1;
        }
        return this.playerSum;
    }

    reduceDealerAce() {
        while (this.dealerSum > 21 && this.dealerAceCount > 0) {
            this.dealerSum -= 10;
            this.dealerAceCount -= 1;
        }
        return this.dealerSum;
    }
}

