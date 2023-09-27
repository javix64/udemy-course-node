const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4tickets = [];
    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4tickets: this.last4tickets,
    };
  }
  init() {
    const { today, tickets, last4tickets, last } = require("../db/data.json");
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.last4tickets = last4tickets;
    } else {
      this.saveDB();
    }
  }
  saveDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }
  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveDB();
    return `Ticket: ${ticket.number}`;
  }
  respondTicket(desktop) {
    // we do not have tickets
    if (this.length === 0) {
      return null;
    }
    const ticket = this.tickets.shift(); // get the first ticket
    ticket.desktop = desktop;
    this.last4tickets.unshift(ticket); // add ticket to the first
    if (this.last4tickets > 4) this.last4tickets.pop();
    this.saveDB();
    return ticket;
  }
}

module.exports = TicketControl;
